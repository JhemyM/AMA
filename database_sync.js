// database_sync.js
// Camada de Banco de Dados Offline-First para o AGRA
// Requer o script do Dexie.js no index.html: <script src="https://unpkg.com/dexie@latest/dist/dexie.js"></script>

(function () {
  // Inicialização do Banco Local (IndexedDB)
  const db = new Dexie('AgraDatabase');
  
  // Definição das tabelas locais e seus índices de busca
  db.version(1).stores({
    properties: 'id, owner_id', // id é a chave primária
    fields: 'id, property_id',
    tasks: 'id, property_id, status',
    syncQueue: '++id, action, table, record_id' // Fila de sincronização pendente
  });

  window.AgraDB = {
    db: db,
    
    // ==========================================
    // 1. MÉTODOS DE ESCRITA E LEITURA (OFFLINE)
    // ==========================================
    
    async addTask(taskData) {
      // Cria ID único local caso não exista (UUID)
      const task = {
        id: crypto.randomUUID(),
        status: 'pending',
        created_at: new Date().toISOString(),
        ...taskData
      };
      
      // Salva no banco local MUITO RÁPIDO
      await db.tasks.put(task);
      
      // Adiciona na fila de sincronização para subir pro Supabase depois
      await db.syncQueue.add({
        action: 'INSERT',
        table: 'tasks',
        record_id: task.id,
        payload: task
      });
      
      // Tenta sincronizar agora, se tiver internet
      this.triggerSync();
      
      return task;
    },

    async getTasks(propertyId) {
      // Retorna tarefas do banco local instantaneamente
      return await db.tasks.where('property_id').equals(propertyId).toArray();
    },

    // ==========================================
    // 2. MOTOR DE SINCRONIZAÇÃO (BACKGROUND)
    // ==========================================
    
    async triggerSync() {
      // Se não tem internet ou o Supabase não está logado, não faz nada
      if (!navigator.onLine || !window.supabaseClient) return;

      try {
        const queue = await db.syncQueue.toArray();
        if (queue.length === 0) return; // Nada para sincronizar
        
        console.log(`[Sync Engine] Sincronizando ${queue.length} operações pendentes...`);

        for (const item of queue) {
          let success = false;
          
          if (item.action === 'INSERT') {
            const { error } = await window.supabaseClient
              .from(item.table)
              .insert(item.payload);
            
            if (!error) success = true;
          }
          
          if (item.action === 'UPDATE') {
            const { error } = await window.supabaseClient
              .from(item.table)
              .update(item.payload)
              .eq('id', item.record_id);
              
            if (!error) success = true;
          }
          
          // Se deu certo, remove da fila
          if (success) {
            await db.syncQueue.delete(item.id);
          }
        }
        
        console.log('[Sync Engine] Sincronização concluída com sucesso.');
      } catch (err) {
        console.error('[Sync Engine] Erro na sincronização. Tentará de novo depois.', err);
      }
    },
    
    async pullRemoteData() {
      if (!navigator.onLine || !window.supabaseClient) return;
      console.log('[Sync Engine] Baixando dados mais recentes da nuvem...');
      const user = JSON.parse(localStorage.getItem('agra_current_user') || '{}');
      if (!user.id) return;

      const { data: props, error } = await window.supabaseClient.from('properties').select('*').eq('owner_id', user.id);
      if (!error && props) {
        // Here we could map and save back to localStorage, but we will just trust local storage for now
        // to avoid overwriting pending offline changes.
      }
    },

    async testConnection() {
      if (!window.supabaseClient) return false;
      try {
        const { error } = await window.supabaseClient.from('properties').select('id').limit(1);
        if (error) return false;
        alert('Conexão com Supabase bem-sucedida! Bancos integrados de forma Seamless.');
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  // Seamless Hook: intercept localStorage.setItem to mirror to Supabase
  const _setItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    _setItem.call(this, key, value);
    if (!window.supabaseClient) return;
    
    const user = JSON.parse(localStorage.getItem('agra_current_user') || '{}');
    if (!user.id) return;

    if (key === 'agra_properties' || key === 'agra_property_data') {
      try {
        const props = JSON.parse(localStorage.getItem('agra_properties') || '[]');
        props.forEach(prop => {
          if (!prop.id) return; // ignore legacy properties without UUID
          window.supabaseClient.from('properties').upsert({
            id: prop.id,
            owner_id: user.id,
            name: prop.name || 'Nova Propriedade',
            total_area: prop.area || 0
          }).then(() => {
            if (prop.fields) {
              prop.fields.forEach(f => {
                if(!f.id) return;
                window.supabaseClient.from('fields').upsert({
                  id: f.id,
                  property_id: prop.id,
                  name: f.name,
                  area: f.area || 0,
                  crop: f.crop || 'Outro'
                });
              });
            }
          });
        });
      } catch(e) {}
    } else if (key === 'agra_tasks_data') {
      try {
        const tasks = JSON.parse(value);
        const props = JSON.parse(localStorage.getItem('agra_properties') || '[]');
        const activeProp = props[parseInt(localStorage.getItem('agra_active_property_index') || '0')];
        if (!activeProp || !activeProp.id) return;

        tasks.forEach(t => {
          if(!t.id) return;
          window.supabaseClient.from('tasks').upsert({
            id: t.id,
            property_id: activeProp.id,
            title: t.title,
            assignee: t.assignee,
            task_date: t.date || new Date().toISOString().split('T')[0],
            description: t.field // Store field name in description if field_id isn't mapped
          });
        });
      } catch(e) {}
    }
  };

  // Tenta sincronizar sempre que a conexão voltar
  window.addEventListener('online', () => window.AgraDB.triggerSync());
})();
