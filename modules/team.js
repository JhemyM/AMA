window.AgraTeam = {
  init: function(container) {
    let teamData = JSON.parse(localStorage.getItem('agra_team_data') || '[]');

    function renderTeam() {
      const list = container.querySelector('#teamList');
      if (!list) return;

      list.innerHTML = '';
      if (teamData.length === 0) {
        list.innerHTML = '<p class="muted">Nenhum membro cadastrado além do administrador.</p>';
      } else {
        teamData.forEach(member => {
          const initials = member.name.substring(0, 2).toUpperCase();
          list.innerHTML += `
            <div class="task-row" style="padding: 1rem 0; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 1rem;">
              <div class="avatar" style="width: 40px; height: 40px; border-radius: 50%; background: var(--surface-hover); display:flex; align-items:center; justify-content:center; font-weight:bold; color:var(--text);">${initials}</div>
              <div>
                <strong style="display: block;">${member.name}</strong>
                <small class="muted">${member.role}</small>
              </div>
            </div>
          `;
        });
      }
    }

    renderTeam();

    const dialog = container.querySelector('#newMemberDialog');

    container.querySelector('#openNewMemberButton')?.addEventListener('click', () => {
      dialog?.showModal();
    });

    container.querySelector('#newMemberForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const newMember = {
        name: container.querySelector('#memberName').value,
        role: container.querySelector('#memberRole').value
      };
      teamData.push(newMember);
      localStorage.setItem('agra_team_data', JSON.stringify(teamData));
      dialog.close();
      e.target.reset();
      renderTeam();
      
      const toast = document.querySelector('#toast');
      if (toast) {
        toast.textContent = 'Membro convidado!';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2600);
      }
    });
  }
};
