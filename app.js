const sectionLabels = {
  dashboard: 'Dashboard',
  production: 'Produção',
  fields: 'Talhões',
  soil: 'Solo e análises',
  weather: 'Clima',
  tasks: 'Atividades',
  inventory: 'Estoque',
  team: 'Equipe'
};

const dashboard = document.querySelector('#dashboardSection');
const placeholder = document.querySelector('#placeholderSection');
const pageTitle = document.querySelector('#pageTitle');
const placeholderTitle = document.querySelector('#placeholderTitle');
const toast = document.querySelector('#toast');
const networkStatus = document.querySelector('#networkStatus');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function updateNetworkStatus() {
  const isOnline = navigator.onLine;
  networkStatus.textContent = isOnline ? 'Online' : 'Modo offline';
  networkStatus.className = `network-status ${isOnline ? 'online' : 'offline'}`;
}

function showSection(section) {
  const isDashboard = section === 'dashboard';
  dashboard.hidden = !isDashboard;
  placeholder.hidden = isDashboard;
  pageTitle.textContent = sectionLabels[section] || 'Dashboard';
  placeholderTitle.textContent = sectionLabels[section] || 'Módulo';
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.section === section);
  });
}

document.querySelectorAll('[data-section]').forEach((button) => {
  button.addEventListener('click', () => showSection(button.dataset.section));
});

document.querySelector('#backButton').addEventListener('click', () => showSection('dashboard'));
document.querySelector('#farmButton').addEventListener('click', () => {
  showToast('Seletor de propriedades estará disponível em breve.');
});
document.querySelector('#newActivityButton').addEventListener('click', () => {
  const state = AgraStorage.saveState({
    activitiesRegistered: AgraStorage.getState().activitiesRegistered + 1,
    lastOpenedAt: new Date().toISOString()
  });
  const pendingCount = AgraStorage.enqueue({
    type: 'activity.created',
    payload: { source: 'dashboard', sequence: state.activitiesRegistered }
  });
  showToast(navigator.onLine ? 'Atividade registrada e pronta para sincronizar.' : `Atividade salva offline (${pendingCount} pendente).`);
});

window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);
updateNetworkStatus();

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('./sw.js').catch(() => showToast('Cache offline indisponível nesta sessão.'));
}
