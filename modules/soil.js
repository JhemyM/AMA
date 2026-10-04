window.AgraSoil = {
  init: function(container) {
    let soilData = JSON.parse(localStorage.getItem('agra_soil_data') || '[]');

    function renderSoilData() {
      const list = container.querySelector('#soilTestsList');
      if (!list) return;

      list.innerHTML = '';
      if (soilData.length === 0) {
        list.innerHTML = '<p class="muted">Nenhuma análise registrada.</p>';
      } else {
        let totalPh = 0;
        let totalMo = 0;

        soilData.forEach(test => {
          totalPh += Number(test.ph);
          totalMo += Number(test.mo);
          
          let phClass = (test.ph >= 6 && test.ph <= 6.5) ? 'health-good' : 'health-warn';
          
          list.innerHTML += `
            <div class="task-row" style="padding: 1rem 0; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;">
              <div>
                <strong style="display: block;">Laudo: ${test.field}</strong>
                <small class="muted">${new Date(test.date).toLocaleDateString()}</small>
              </div>
              <div style="display: flex; gap: 2rem;">
                <div><span class="muted" style="display:block; font-size:0.75rem;">pH</span><strong class="${phClass}">${test.ph}</strong></div>
                <div><span class="muted" style="display:block; font-size:0.75rem;">MO</span><strong>${test.mo}%</strong></div>
              </div>
            </div>
          `;
        });

        // Update metrics
        const avgPh = (totalPh / soilData.length).toFixed(1);
        const avgMo = (totalMo / soilData.length).toFixed(1);
        
        container.querySelector('#avgPhMetric').textContent = avgPh;
        container.querySelector('#avgMoMetric').innerHTML = `${avgMo} <small>%</small>`;
      }
    }

    renderSoilData();

    const dialog = container.querySelector('#newSoilDialog');
    const fieldSelect = container.querySelector('#soilFieldSelect');

    container.querySelector('#openNewSoilTestButton')?.addEventListener('click', () => {
      const propData = JSON.parse(localStorage.getItem('agra_property_data') || '{"fields":[]}');
      fieldSelect.innerHTML = '';
      propData.fields.forEach(f => {
        fieldSelect.innerHTML += `<option value="${f.name}">${f.name}</option>`;
      });
      if (propData.fields.length === 0) {
        fieldSelect.innerHTML = '<option value="Geral">Sem talhões</option>';
      }
      dialog?.showModal();
    });

    container.querySelector('#newSoilForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const newTest = {
        field: container.querySelector('#soilFieldSelect').value,
        ph: container.querySelector('#soilPh').value,
        mo: container.querySelector('#soilMo').value,
        date: new Date().toISOString()
      };
      soilData.push(newTest);
      localStorage.setItem('agra_soil_data', JSON.stringify(soilData));
      dialog.close();
      e.target.reset();
      renderSoilData();
      
      const toast = document.querySelector('#toast');
      if (toast) {
        toast.textContent = 'Análise salva com sucesso!';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2600);
      }
    });
  }
};
