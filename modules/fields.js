window.AgraFields = {
  init: function(container) {
  // Render fields grid
  function renderFields() {
    const dataStr = localStorage.getItem('agra_property_data');
    const moduleList = container.querySelector('#fieldsModuleList');
    if (!dataStr || !moduleList) return;
    
    const data = JSON.parse(dataStr);
    moduleList.innerHTML = '';
    
    data.fields.forEach(field => {
      let color = 'green';
      if (field.health < 60) color = 'red';
      else if (field.health < 75) color = 'yellow';
      
      moduleList.innerHTML += `
        <article class="panel" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div class="field-name">
              <span class="field-color ${color}"></span>
              <div>
                <strong>${field.name}</strong>
                <small>${field.crop}${field.gps ? ` · 📍 ${field.gps}` : ''}</small>
              </div>
            </div>
            <strong class="${color === 'green' ? 'health-good' : color === 'yellow' ? 'health-warn' : 'health-alert'}">${field.health}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 1rem; margin-top: auto;">
            <span class="muted">Área</span>
            <strong>${field.area} ha</strong>
          </div>
        </article>
      `;
    });
  }

  renderFields();

  // Dialog events
  const newFieldDialog = container.querySelector('#newFieldDialog');
  
  container.querySelector('#openNewFieldButton')?.addEventListener('click', () => {
    newFieldDialog?.showModal();
  });

  container.querySelector('#captureGpsButton')?.addEventListener('click', () => {
    const input = container.querySelector('#newFieldGps');
    input.value = "Obtendo sinal...";
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        input.value = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
      }, (err) => {
        input.value = "Falha ao capturar GPS (Permissão negada ou Offline)";
      }, { timeout: 10000 });
    } else {
      input.value = "GPS não suportado";
    }
  });

  container.querySelector('#newFieldForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const dataStr = localStorage.getItem('agra_property_data');
    if (!dataStr) return;
    const data = JSON.parse(dataStr);
    
    const newField = {
      name: container.querySelector('#newFieldName').value,
      area: Number(container.querySelector('#newFieldArea').value),
      crop: container.querySelector('#newFieldCrop').value,
      gps: container.querySelector('#newFieldGps')?.value || '',
      health: Math.floor(Math.random() * 40) + 50
    };
    
    data.fields.push(newField);
    data.totalArea += newField.area;
    
    localStorage.setItem('agra_property_data', JSON.stringify(data));
    newFieldDialog.close();
    e.target.reset();
    
    renderFields();
    
    // Trigger a global event to let dashboard update
    window.dispatchEvent(new Event('agra_property_updated'));
    
    // Using global toast
    const toast = document.querySelector('#toast');
    if (toast) {
      toast.textContent = 'Talhão adicionado com sucesso!';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2600);
    }
  });
}
};
