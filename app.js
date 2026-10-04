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

// --- AUTHENTICATION LOGIC ---
const authContainer = document.querySelector('#authContainer');
const mainApp = document.querySelector('#mainApp');
const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');
const showRegisterBtn = document.querySelector('#showRegisterBtn');
const showLoginBtn = document.querySelector('#showLoginBtn');

// Toggle between Login and Register forms
showRegisterBtn?.addEventListener('click', () => {
  loginForm.hidden = true;
  registerForm.hidden = false;
});

showLoginBtn?.addEventListener('click', () => {
  registerForm.hidden = true;
  loginForm.hidden = false;
});

// Mock authentication flow
loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  // Simulate successful login
  authContainer.hidden = true;
  mainApp.hidden = false;
  showToast('Login realizado com sucesso!');
});

registerForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  // Simulate successful registration
  authContainer.hidden = true;
  mainApp.hidden = false;
  showToast('Conta criada com sucesso!');
});
// ----------------------------

const dashboard = document.querySelector('#dashboardSection');
const placeholder = document.querySelector('#placeholderSection');
const pageTitle = document.querySelector('#pageTitle');
const placeholderTitle = document.querySelector('#placeholderTitle');
const toast = document.querySelector('#toast');
const networkStatus = document.querySelector('#networkStatus');
const feedbackDialog = document.querySelector('#feedbackDialog');
const feedbackEmail = window.AGRA_CONFIG?.feedbackEmail ?? '';

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

document.querySelector('#exportDataButton').addEventListener('click', () => {
  const backup = AgraStorage.exportBackup();
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `agra-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
  showToast('Backup local exportado.');
});

document.querySelector('#importDataInput').addEventListener('change', async (event) => {
  const input = event.currentTarget;
  const file = input.files?.[0];
  if (!file) return;
  try {
    AgraStorage.importBackup(JSON.parse(await file.text()));
    showToast('Backup importado. Recarregue a tela para atualizar os dados.');
  } catch (error) {
    showToast(error instanceof Error ? error.message : 'Não foi possível importar o backup.');
  }
  input.value = '';
});

document.querySelector('#feedbackButton').addEventListener('click', () => feedbackDialog.showModal());
document.querySelector('#emailFeedbackButton').addEventListener('click', () => {
  const message = document.querySelector('#feedbackMessage').value.trim();
  if (!message) {
    showToast('Escreva o feedback antes de preparar o e-mail.');
    return;
  }
  if (!feedbackEmail) {
    showToast('Configure o e-mail do proprietário em feedback-config.js.');
    return;
  }
  const type = document.querySelector('#feedbackType').value;
  const rating = document.querySelector('#feedbackRating').value;
  const subject = encodeURIComponent(`[AGRA] Feedback do piloto - ${type}`);
  const body = encodeURIComponent(`Avaliação: ${rating}/5\nCategoria: ${type}\nVersão: 0.1.0-alpha.1\n\n${message}`);
  window.location.href = `mailto:${feedbackEmail}?subject=${subject}&body=${body}`;
});
document.querySelector('#feedbackForm').addEventListener('submit', (event) => {
  event.preventDefault();
  AgraStorage.enqueue({
    type: 'feedback.created',
    payload: {
      category: document.querySelector('#feedbackType').value,
      rating: Number(document.querySelector('#feedbackRating').value),
      message: document.querySelector('#feedbackMessage').value.trim(),
      allowContact: document.querySelector('#feedbackContact').checked,
      appVersion: '0.1.0-alpha.1'
    }
  });
  feedbackDialog.close();
  event.currentTarget.reset();
  showToast('Feedback salvo offline. Obrigado por ajudar.');
});

window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);
updateNetworkStatus();

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('./sw.js').catch(() => showToast('Cache offline indisponível nesta sessão.'));
}
