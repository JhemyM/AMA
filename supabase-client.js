// supabase-client.js
// Insira as credenciais do seu projeto Supabase abaixo. 
// Você encontra isso em Settings > API no painel do Supabase.
const SUPABASE_URL = 'https://mjvsfwebhiqvnrvcwdnj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_2IYhYtQ7_PEAvZiMIZ3-JA_ayfFIQ_9';

// Inicializa o cliente do Supabase e o expõe globalmente
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Listener para mudanças de autenticação
window.supabaseClient.auth.onAuthStateChange((event, session) => {
  if (session) {
    // Busca o plano oficial direto da tabela blindada no backend
    window.supabaseClient.from('user_subscriptions').select('plan').eq('user_id', session.user.id).single()
      .then(({ data }) => {
        const user = {
          email: session.user.email,
          name: session.user.user_metadata?.name || session.user.email.split('@')[0],
          id: session.user.id,
          plan: data ? data.plan : 'base'
        };
        localStorage.setItem('agra_current_user', JSON.stringify(user));
        // Dispara evento para interface se atualizar
        window.dispatchEvent(new Event('agra_auth_updated'));
      });
  } else {
    const localUser = JSON.parse(localStorage.getItem('agra_current_user') || '{}');
    // Prevent wiping demo or admin sessions that bypass Supabase
    if (localUser.role !== 'demo' && localUser.role !== 'admin') {
      localStorage.removeItem('agra_current_user');
    }
  }
});
