const sectionLabels = {
  dashboard: 'Dashboard',
  production: 'Produção',
  fields: 'Talhões',
  soil: 'Solo e análises',
  weather: 'Clima',
  tasks: 'Atividades',
  inventory: 'Estoque',
  team: 'Equipe',
  embrapa: 'Manuais Embrapa'
};

// Authentication logic has been moved to login.js

// --- DYNAMIC USER LOAD ---
const currentUserStr = localStorage.getItem('agra_current_user');
if (currentUserStr) {
  const currentUser = JSON.parse(currentUserStr);
  const nameParts = currentUser.name.split(' ');
  const firstName = nameParts[0];
  const initials = nameParts.length > 1 
    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    : firstName.substring(0, 2).toUpperCase();

  document.getElementById('greetingName').textContent = firstName;
  document.getElementById('sidebarName').textContent = currentUser.name;
  document.getElementById('sidebarAvatar').textContent = initials;
  document.getElementById('topAvatar').textContent = initials;
}

const currentDateElement = document.getElementById('currentDateString');
if (currentDateElement) {
  const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
  currentDateElement.textContent = new Date().toLocaleDateString('pt-BR', options);
}

document.getElementById('logoutButton')?.addEventListener('click', () => {
  localStorage.removeItem('agra_current_user');
  window.location.href = 'login.html';
});
// -------------------------

// --- ONBOARDING & PROPERTY DATA ---
const onboardingDialog = document.getElementById('onboardingDialog');
const onboardingForm = document.getElementById('onboardingForm');

function renderPropertyData() {
  const dataStr = localStorage.getItem('agra_property_data');
  if (!dataStr) {
    onboardingDialog?.showModal();
    return;
  }
  
  const data = JSON.parse(dataStr);
  
  // Update property names
  document.getElementById('sidebarPropertyName').textContent = data.propertyName;
  document.getElementById('topPropertyName').textContent = data.propertyName;
  
  // Update metrics
  document.getElementById('metricArea').innerHTML = `${data.totalArea} <small>ha</small>`;
  document.getElementById('metricTotalArea').textContent = `de ${data.totalArea} ha totais`;
  document.getElementById('metricFieldsCount').textContent = `${data.fields.length} talhões ativos`;
  
  // Calculate mock production (e.g. 5 tons per ha for demo purposes)
  const estimatedProduction = data.fields.reduce((acc, field) => acc + (field.area * 5), 0);
  document.getElementById('metricProduction').innerHTML = `${estimatedProduction.toFixed(1).replace('.', ',')} <small>t</small>`;
  
  // Ensure fields have persistent health and calculate overall farm metrics
  let totalHealth = 0;
  let hasChanges = false;
  let lowestHealthField = null;

  data.fields.forEach(field => {
    if (!field.health) {
      field.health = Math.floor(Math.random() * 40) + 50;
      hasChanges = true;
    }
    totalHealth += field.health;
    if (!lowestHealthField || field.health < lowestHealthField.health) {
      lowestHealthField = field;
    }
  });

  if (hasChanges) {
    localStorage.setItem('agra_property_data', JSON.stringify(data));
  }

  const avgHealth = data.fields.length > 0 ? Math.round(totalHealth / data.fields.length) : 0;
  
  // Update fields list
  const fieldListContainer = document.getElementById('dynamicFieldList');
  if (fieldListContainer) {
    fieldListContainer.innerHTML = '';
    data.fields.forEach(field => {
      let color = 'green';
      if (field.health < 60) color = 'red';
      else if (field.health < 75) color = 'yellow';
      
      fieldListContainer.innerHTML += `
        <div class="field-row">
          <div class="field-name">
            <span class="field-color ${color}"></span>
            <div><strong>${field.name}</strong><small>${field.crop} · ${field.area} ha</small></div>
          </div>
          <div class="progress"><span class="${color === 'yellow' ? 'yellow-fill' : color === 'red' ? 'red-fill' : ''}" style="width: ${field.health}%"></span></div>
          <strong class="${color === 'green' ? 'health-good' : color === 'yellow' ? 'health-warn' : 'health-alert'}">${field.health}</strong>
        </div>
      `;
    });
  }

  // Update Map
  const mapContainer = document.getElementById('dynamicFarmMap');
  if (mapContainer) {
    mapContainer.innerHTML = '';
    data.fields.forEach((field, i) => {
      let colorClass = 'legend-good';
      if (field.health < 60) colorClass = 'legend-risk';
      else if (field.health < 75) colorClass = 'legend-watch';
      
      const width = Math.max(30, Math.min(80, (field.area / data.totalArea) * 100));
      const left = Math.random() * (100 - width);
      const top = Math.random() * 60;
      
      mapContainer.innerHTML += `
        <button class="map-field" style="position: absolute; width: ${width}%; height: 35%; left: ${left}%; top: ${top}%; background: var(--surface); border: 2px solid ${colorClass === 'legend-good' ? 'var(--green-500)' : colorClass === 'legend-watch' ? 'var(--amber-500)' : 'var(--red-500)'}; color: var(--text);" title="${field.name}">
          <b style="color: var(--text)">${field.name}</b><small>${field.health}</small>
        </button>
      `;
    });
  }

  // Update property summary
  const resourceRing = document.getElementById('dynamicResourceRing');
  if (resourceRing) resourceRing.innerHTML = `<strong>${avgHealth}%</strong><small>saúde geral</small>`;
  const farmStatusDesc = document.getElementById('dynamicFarmStatusDesc');
  const farmStatus = document.getElementById('dynamicFarmStatus');
  if (farmStatus) {
    if (avgHealth >= 75) {
      farmStatus.textContent = "Boa condição geral";
      farmStatusDesc.textContent = "A maioria dos talhões dentro da faixa ideal.";
    } else if (avgHealth >= 60) {
      farmStatus.textContent = "Atenção necessária";
      farmStatusDesc.textContent = "Alguns talhões apresentam queda de rendimento.";
    } else {
      farmStatus.textContent = "Risco na lavoura";
      farmStatusDesc.textContent = "Múltiplos talhões com índices críticos de saúde.";
    }
  }

  // Embrapa Recommendation Logic
  const recText = document.getElementById('dynamicRecommendationText');
  const embrapaBtn = document.getElementById('openEmbrapaRecButton');
  if (recText && lowestHealthField) {
    let recMessage = '';
    let searchTerm = '';
    
    if (lowestHealthField.health < 70) {
      if (lowestHealthField.crop.toLowerCase().includes('soja')) {
        recMessage = `O ${lowestHealthField.name} (Soja) está com saúde baixa (${lowestHealthField.health}). Atenção para o controle de pragas!`;
        searchTerm = 'pragas soja';
      } else if (lowestHealthField.crop.toLowerCase().includes('milho')) {
        recMessage = `O ${lowestHealthField.name} (Milho) está com saúde ${lowestHealthField.health}. Verifique a umidade do solo e adubação.`;
        searchTerm = 'irrigação milho';
      } else {
        recMessage = `O ${lowestHealthField.name} apresenta índice crítico (${lowestHealthField.health}). Revise as práticas de conservação do solo.`;
        searchTerm = 'conservação solo';
      }
    } else {
      recMessage = `Sua lavoura está excelente! Mantenha a sustentabilidade otimizando o aproveitamento de resíduos.`;
      searchTerm = 'resíduos';
    }
    
    recText.textContent = recMessage;
    
    if (embrapaBtn) {
      embrapaBtn.onclick = () => {
        showSection('embrapa');
        setTimeout(() => {
          const searchInput = document.getElementById('embrapaSearch');
          if (searchInput) {
            searchInput.value = searchTerm;
            searchInput.dispatchEvent(new Event('input'));
          }
        }, 100);
      };
    }
  }
}

onboardingForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const propertyName = document.getElementById('propName').value;
  const totalArea = Number(document.getElementById('propArea').value);
  const fieldName = document.getElementById('fieldName').value;
  const fieldArea = Number(document.getElementById('fieldArea').value);
  const fieldCrop = document.getElementById('fieldCrop').value;
  
  const propertyData = {
    propertyName,
    totalArea,
    fields: [
      { name: fieldName, area: fieldArea, crop: fieldCrop, health: Math.floor(Math.random() * 40) + 50 }
    ]
  };
  
  localStorage.setItem('agra_property_data', JSON.stringify(propertyData));
  onboardingDialog.close();
  renderPropertyData();
  showToast('Propriedade configurada com sucesso!');
});

// Run on load
renderPropertyData();
window.addEventListener('agra_property_updated', renderPropertyData);
// ----------------------------------

const dashboard = document.querySelector('#dashboardSection');
const dynamicModuleSection = document.querySelector('#dynamicModuleSection');
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

const loadedModules = new Set();
const implementedModules = ['fields', 'tasks', 'embrapa', 'soil', 'production', 'inventory', 'weather', 'team'];

async function showSection(section) {
  dashboard.hidden = true;
  dynamicModuleSection.hidden = true;
  placeholder.hidden = true;

  if (section === 'dashboard') {
    dashboard.hidden = false;
  } else if (implementedModules.includes(section)) {
    dynamicModuleSection.hidden = false;
    
    if (!loadedModules.has(section)) {
      try {
        const tpl = document.getElementById(`tpl-${section}`);
        if (!tpl) throw new Error(`Template tpl-${section} not found`);
        const tempContainer = document.createElement('div');
        tempContainer.id = `module-container-${section}`;
        tempContainer.appendChild(tpl.content.cloneNode(true));
        dynamicModuleSection.appendChild(tempContainer);
        
        if (section === 'fields') window.AgraFields.init(tempContainer);
        if (section === 'tasks') window.AgraTasks.init(tempContainer);
        if (section === 'embrapa') window.AgraEmbrapa.init(tempContainer);
        if (section === 'soil') window.AgraSoil.init(tempContainer);
        if (section === 'production') window.AgraProduction.init(tempContainer);
        if (section === 'inventory') window.AgraInventory.init(tempContainer);
        if (section === 'weather') window.AgraWeather.init(tempContainer);
        if (section === 'team') window.AgraTeam.init(tempContainer);
        
        loadedModules.add(section);
      } catch (error) {
        console.error('Failed to load module:', error);
        showToast('Erro ao carregar o módulo.');
      }
    }
    
    // Hide other loaded modules, show active one
    Array.from(dynamicModuleSection.children).forEach(child => {
      child.style.display = child.id === `module-container-${section}` ? 'block' : 'none';
    });
  } else {
    placeholder.hidden = false;
  }

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
