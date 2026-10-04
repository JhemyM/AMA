window.AgraInventory = {
  init: function(container) {
    let invData = JSON.parse(localStorage.getItem('agra_inventory_data') || '[]');

    function renderInventory() {
      const list = container.querySelector('#inventoryList');
      if (!list) return;

      list.innerHTML = '';
      let counts = { Semente: 0, Fertilizante: 0, Defensivo: 0 };

      if (invData.length === 0) {
        list.innerHTML = '<p class="muted">Nenhum item no estoque.</p>';
      } else {
        invData.forEach(item => {
          if (counts[item.category] !== undefined) counts[item.category]++;
          list.innerHTML += `
            <div class="task-row" style="padding: 1rem 0; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;">
              <div>
                <strong style="display: block;">${item.name}</strong>
                <small class="muted">${item.category}</small>
              </div>
              <strong style="font-size: 1.1rem;">${item.quantity} un</strong>
            </div>
          `;
        });
      }

      container.querySelector('#seedCount').innerHTML = `${counts['Semente']} <small>itens</small>`;
      container.querySelector('#fertCount').innerHTML = `${counts['Fertilizante']} <small>itens</small>`;
      container.querySelector('#chemCount').innerHTML = `${counts['Defensivo']} <small>itens</small>`;
    }

    renderInventory();

    const dialog = container.querySelector('#newItemDialog');

    container.querySelector('#openNewItemButton')?.addEventListener('click', () => {
      dialog?.showModal();
    });

    container.querySelector('#newItemForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const newItem = {
        name: container.querySelector('#itemName').value,
        category: container.querySelector('#itemCategory').value,
        quantity: container.querySelector('#itemQuantity').value
      };
      invData.push(newItem);
      localStorage.setItem('agra_inventory_data', JSON.stringify(invData));
      dialog.close();
      e.target.reset();
      renderInventory();
      
      const toast = document.querySelector('#toast');
      if (toast) {
        toast.textContent = 'Insumo adicionado!';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2600);
      }
    });
  }
};
