window.AgraTasks = {
  init: function(container) {
  // Initialize default tasks if empty
  let tasksStr = localStorage.getItem('agra_tasks_data');
  if (!tasksStr) {
    const defaultTasks = [
      { title: 'Aplicação preventiva', assignee: 'João Lima', date: new Date().toISOString().split('T')[0], field: 'Talhão Inicial' }
    ];
    localStorage.setItem('agra_tasks_data', JSON.stringify(defaultTasks));
    tasksStr = JSON.stringify(defaultTasks);
  }

  function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem('agra_tasks_data') || '[]');
    const moduleList = container.querySelector('#tasksModuleList');
    if (!moduleList) return;
    
    moduleList.innerHTML = '';
    
    if (tasks.length === 0) {
      moduleList.innerHTML = '<p class="muted">Nenhuma atividade agendada.</p>';
      return;
    }

    // Sort by date
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

    tasks.forEach((task, index) => {
      const taskDate = new Date(task.date + 'T12:00:00');
      const day = taskDate.getDate().toString().padStart(2, '0');
      const month = taskDate.toLocaleString('pt-BR', { month: 'short' }).toUpperCase();
      
      const isToday = task.date === new Date().toISOString().split('T')[0];
      const tagClass = isToday ? 'urgent' : 'planned';
      const tagLabel = isToday ? 'Hoje' : 'Agendado';
      
      moduleList.innerHTML += `
        <div class="task-row" style="padding: 1rem 0; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 1rem;">
          <span class="task-date ${isToday ? 'today' : ''}" style="min-width: 48px; text-align: center;">
            <b style="display: block; font-size: 1.25rem;">${day}</b>
            <small style="font-size: 0.75rem; text-transform: uppercase;">${month}</small>
          </span>
          <div style="flex: 1; min-width:0;">
            <strong style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">${task.title}</strong>
            <small class="muted" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">${task.field} · ${task.assignee}</small>
          </div>
          <div style="display:flex; align-items:center; gap: 0.25rem; flex-shrink: 0;">
            <span class="tag ${tagClass}">${tagLabel}</span>
            <button class="text-button delete-task-btn" data-index="${index}" style="color: var(--red-600); padding: 0 0.25rem; font-size: 1.5rem; line-height: 1;" title="Excluir Atividade">×</button>
          </div>
        </div>
      `;
    });

    moduleList.querySelectorAll('.delete-task-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if(confirm('Tem certeza que deseja excluir esta atividade?')) {
          tasks.splice(index, 1);
          localStorage.setItem('agra_tasks_data', JSON.stringify(tasks));
          renderTasks();
          window.dispatchEvent(new Event('agra_tasks_updated'));
        }
      });
    });
  }

  renderTasks();

  const newTaskDialog = container.querySelector('#newTaskDialog');
  const fieldSelect = container.querySelector('#newTaskField');
  
  container.querySelector('#openNewTaskButton')?.addEventListener('click', () => {
    // Populate fields dropdown
    if (fieldSelect) {
      fieldSelect.innerHTML = '';
      const propertyDataStr = localStorage.getItem('agra_property_data');
      if (propertyDataStr) {
        const propData = JSON.parse(propertyDataStr);
        propData.fields.forEach(field => {
          fieldSelect.innerHTML += `<option value="${field.name}">${field.name}</option>`;
        });
      } else {
        fieldSelect.innerHTML = '<option value="Geral">Geral</option>';
      }
    }
    
    // Set default date to today
    const dateInput = container.querySelector('#newTaskDate');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    newTaskDialog?.showModal();
  });

  container.querySelector('#newTaskForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const tasks = JSON.parse(localStorage.getItem('agra_tasks_data') || '[]');
    
    const newTask = {
      title: container.querySelector('#newTaskTitleInput').value,
      assignee: container.querySelector('#newTaskAssignee').value,
      date: container.querySelector('#newTaskDate').value,
      field: container.querySelector('#newTaskField').value
    };
    
    tasks.push(newTask);
    localStorage.setItem('agra_tasks_data', JSON.stringify(tasks));
    
    newTaskDialog.close();
    e.target.reset();
    
    renderTasks();
    
    const toast = document.querySelector('#toast');
    if (toast) {
      toast.textContent = 'Atividade agendada com sucesso!';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2600);
    }
  });
}
};
