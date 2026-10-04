window.AgraProduction = {
  init: function(container) {
    let prodData = JSON.parse(localStorage.getItem('agra_production_data') || '[]');

    function renderProductionData() {
      const list = container.querySelector('#harvestList');
      const totalsDiv = container.querySelector('#productionTotals');
      if (!list || !totalsDiv) return;

      list.innerHTML = '';
      if (prodData.length === 0) {
        list.innerHTML = '<p class="muted">Nenhuma colheita registrada.</p>';
      } else {
        prodData.sort((a, b) => new Date(b.date) - new Date(a.date));
        prodData.forEach(harvest => {
          list.innerHTML += `
            <div class="task-row" style="padding: 1rem 0; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;">
              <div>
                <strong style="display: block;">Talhão: ${harvest.field}</strong>
                <small class="muted">${new Date(harvest.date + 'T12:00:00').toLocaleDateString()}</small>
              </div>
              <div>
                <strong class="health-good" style="font-size: 1.25rem;">${harvest.volume} t</strong>
              </div>
            </div>
          `;
        });
      }

      const propData = JSON.parse(localStorage.getItem('agra_property_data') || '{"fields":[]}');
      const cropTotals = {};
      
      propData.fields.forEach(f => {
        if (!cropTotals[f.crop]) cropTotals[f.crop] = 0;
      });
      
      prodData.forEach(h => {
        const field = propData.fields.find(f => f.name === h.field);
        const crop = field ? field.crop : 'Desconhecida';
        if (!cropTotals[crop]) cropTotals[crop] = 0;
        cropTotals[crop] += Number(h.volume);
      });

      totalsDiv.innerHTML = '';
      Object.keys(cropTotals).forEach(crop => {
        totalsDiv.innerHTML += `
          <div style="background: var(--surface); padding: 1rem; border-radius: 8px; border: 1px solid var(--border); display:flex; flex-direction:column; gap: 0.5rem;">
            <span class="muted" style="font-size: 0.875rem;">Cultura</span>
            <strong style="font-size: 1.1rem;">${crop}</strong>
            <span style="font-size: 1.5rem; color: var(--green-600); font-weight: 600;">${cropTotals[crop].toFixed(1)} t</span>
          </div>
        `;
      });
      if (Object.keys(cropTotals).length === 0) {
        totalsDiv.innerHTML = '<p class="muted">Nenhum talhão cadastrado para estimar totais.</p>';
      }
    }

    renderProductionData();

    const dialog = container.querySelector('#newHarvestDialog');
    const fieldSelect = container.querySelector('#harvestFieldSelect');

    container.querySelector('#openNewHarvestButton')?.addEventListener('click', () => {
      const propData = JSON.parse(localStorage.getItem('agra_property_data') || '{"fields":[]}');
      fieldSelect.innerHTML = '';
      propData.fields.forEach(f => {
        fieldSelect.innerHTML += `<option value="${f.name}">${f.name}</option>`;
      });
      if (propData.fields.length === 0) {
        fieldSelect.innerHTML = '<option value="Geral">Sem talhões</option>';
      }
      container.querySelector('#harvestDate').value = new Date().toISOString().split('T')[0];
      dialog?.showModal();
    });

    container.querySelector('#newHarvestForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const newHarvest = {
        field: container.querySelector('#harvestFieldSelect').value,
        volume: container.querySelector('#harvestVolume').value,
        date: container.querySelector('#harvestDate').value
      };
      prodData.push(newHarvest);
      localStorage.setItem('agra_production_data', JSON.stringify(prodData));
      dialog.close();
      e.target.reset();
      renderProductionData();
      
      const toast = document.querySelector('#toast');
      if (toast) {
        toast.textContent = 'Colheita salva com sucesso!';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2600);
      }
    });
  }
};
