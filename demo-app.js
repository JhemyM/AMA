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

// --- DEMO MODE TIMER (Self-Contained, No Supabase) ---
const DEMO_DURATION_MS = 15 * 60 * 1000; // 15 minutes
let demoStartTime = localStorage.getItem('agra_demo_start');
if (!demoStartTime) {
  demoStartTime = Date.now().toString();
  localStorage.setItem('agra_demo_start', demoStartTime);
}

function updateDemoTimer() {
  const elapsed = Date.now() - parseInt(demoStartTime, 10);
  const remaining = Math.max(0, DEMO_DURATION_MS - elapsed);
  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);
  const timerEl = document.getElementById('demoTimer');
  if (timerEl) timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  if (remaining <= 0) {
    alert("Seu tempo de demonstração inicial expirou, mas o tempo foi reiniciado para que você possa continuar testando!");
    demoStartTime = Date.now().toString();
    localStorage.setItem('agra_demo_start', demoStartTime);
  }
}
setInterval(updateDemoTimer, 1000);
updateDemoTimer();

// --- DYNAMIC USER LOAD ---
const currentUserStr = localStorage.getItem('agra_current_user');
if (currentUserStr) {
  const currentUser = JSON.parse(currentUserStr);
  const nameParts = currentUser.name.split(' ');
  const firstName = nameParts[0];
  const initials = nameParts.length > 1 
    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    : firstName.substring(0, 2).toUpperCase();

  const greetingEl = document.getElementById('greetingName');
  if (greetingEl) greetingEl.textContent = firstName;
  
  const sidebarNameEl = document.getElementById('sidebarName');
  if (sidebarNameEl) sidebarNameEl.textContent = currentUser.name;
  
  const sidebarAvatarEl = document.getElementById('sidebarAvatar');
  if (sidebarAvatarEl) sidebarAvatarEl.textContent = initials;
  
  const topAvatarEl = document.getElementById('topAvatar');
  if (topAvatarEl) topAvatarEl.textContent = initials;
  
  // Populate profile dialog
  const modalAvatar = document.getElementById('modalAvatar');
  const modalName = document.getElementById('modalName');
  const modalEmail = document.getElementById('modalEmail');
  const modalPlan = document.getElementById('modalPlan');
  
  if (modalAvatar) modalAvatar.textContent = initials;
  if (modalName) modalName.textContent = currentUser.name;
  if (modalEmail) modalEmail.textContent = currentUser.email;
  if (modalPlan) modalPlan.textContent = 'Plano: ' + (currentUser.plan ? currentUser.plan.toUpperCase() : 'Gratuito');
}

const currentDateElement = document.getElementById('currentDateString');
if (currentDateElement) {
  const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
  currentDateElement.textContent = new Date().toLocaleDateString('pt-BR', options);
}

document.getElementById('logoutButton')?.addEventListener('click', () => {
  localStorage.removeItem('agra_current_user');
  localStorage.removeItem('agra_demo_start');
  window.location.href = 'login.html';
});

document.getElementById('topAvatar')?.addEventListener('click', () => {
  const dialog = document.getElementById('profileDialog');
  if (dialog) dialog.showModal();
});

document.getElementById('themeToggleButtonProfile')?.addEventListener('click', () => {
  document.getElementById('themeToggle')?.click();
});

document.getElementById('logoutButtonProfile')?.addEventListener('click', async () => {
  if (window.supabaseClient) {
    await window.supabaseClient.auth.signOut();
  }
  localStorage.removeItem('agra_current_user');
  localStorage.removeItem('agra_demo_start');
  window.location.href = 'login.html';
});


// -------------------------

// --- ONBOARDING & PROPERTY DATA ---
const onboardingDialog = document.getElementById('onboardingDialog');
const onboardingForm = document.getElementById('onboardingForm');

let dashboardMap = null;

// --- DARK MODE TOGGLE & FLUIDITY ---
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('agra_theme');
if (savedTheme === 'dark') {
  htmlEl.setAttribute('data-theme', 'dark');
}

themeToggle?.addEventListener('click', () => {
  const isDark = htmlEl.getAttribute('data-theme') === 'dark';
  if (isDark) {
    htmlEl.removeAttribute('data-theme');
    localStorage.setItem('agra_theme', 'light');
  } else {
    htmlEl.setAttribute('data-theme', 'dark');
    localStorage.setItem('agra_theme', 'dark');
  }
});

async function updateWeather(lat, lon) {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    
    const codeToIcon = (code) => {
      if (code <= 1) return '☀'; 
      if (code <= 3) return '⛅'; 
      if (code <= 48) return '☁'; 
      if (code <= 67) return '☂'; 
      if (code <= 77) return '❄'; 
      if (code <= 82) return '🌧'; 
      if (code <= 99) return '⛈'; 
      return '☀';
    };
    
    const codeToDesc = (code) => {
      if (code <= 1) return 'Ensolarado';
      if (code <= 3) return 'Parcialmente Nublado';
      if (code <= 48) return 'Neblina';
      if (code <= 67) return 'Chuva';
      if (code <= 77) return 'Neve';
      if (code <= 82) return 'Pancadas de Chuva';
      if (code <= 99) return 'Tempestade';
      return 'Limpo';
    };

    const current = data.current;
    document.getElementById('weatherTempMain').textContent = `${Math.round(current.temperature_2m)}°`;
    document.getElementById('weatherIconMain').textContent = codeToIcon(current.weather_code);
    document.getElementById('weatherDescMain').textContent = codeToDesc(current.weather_code);
    document.getElementById('weatherHumMain').textContent = `${current.relative_humidity_2m}%`;
    document.getElementById('weatherWindMain').textContent = `${current.wind_speed_10m} km/h`;
    document.getElementById('weatherLocation').textContent = `Satélite (${lat.toFixed(2)}, ${lon.toFixed(2)})`;

    const forecastContainer = document.getElementById('weatherForecastMain');
    if (forecastContainer) {
      let html = '';
      const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      for (let i = 0; i < 4; i++) {
        const date = new Date(data.daily.time[i]);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        const dayName = i === 0 ? 'Hoje' : days[date.getDay()];
        const icon = codeToIcon(data.daily.weather_code[i]);
        const max = Math.round(data.daily.temperature_2m_max[i]);
        const min = Math.round(data.daily.temperature_2m_min[i]);
        html += `<div><span>${dayName}</span><b>${icon}</b><strong>${max}°</strong><small>${min}°</small></div>`;
      }
      forecastContainer.innerHTML = html;
    }
  } catch (error) {
    console.warn('Weather fetch failed', error);
  }
}

let currentPropertyIndex = parseInt(localStorage.getItem('agra_active_property_index') || '0');

function getProperties() {
  // In demo mode, use demo-specific storage keys
  const demoDataStr = localStorage.getItem('agra_demo_properties');
  if (demoDataStr) return JSON.parse(demoDataStr);
  const dataStr = localStorage.getItem('agra_properties');
  if (dataStr) return JSON.parse(dataStr);
  const oldDataStr = localStorage.getItem('agra_property_data');
  if (oldDataStr) {
    const arr = [JSON.parse(oldDataStr)];
    localStorage.setItem('agra_properties', JSON.stringify(arr));
    return arr;
  }
  return [];
}

function updateFarmSelect(props) {
  const select = document.getElementById('farmSelect');
  if (!select) return;
  select.innerHTML = '';
  props.forEach((p, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = p.propertyName;
    if (idx === currentPropertyIndex) opt.selected = true;
    select.appendChild(opt);
  });
}

document.getElementById('farmSelect')?.addEventListener('change', (e) => {
  currentPropertyIndex = parseInt(e.target.value);
  localStorage.setItem('agra_active_property_index', currentPropertyIndex);
  const props = getProperties();
  if (props[currentPropertyIndex]) {
    localStorage.setItem('agra_property_data', JSON.stringify(props[currentPropertyIndex]));
    window.dispatchEvent(new Event('agra_property_updated'));
  }
});

document.getElementById('addFarmButton')?.addEventListener('click', () => {
  onboardingDialog.showModal();
});

document.getElementById('deleteFarmButton')?.addEventListener('click', () => {
  const props = getProperties();
  if (props.length <= 1) {
    const toast = document.querySelector('#toast');
    if (toast) { toast.textContent = 'Você não pode excluir a única fazenda.'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2600); }
    return;
  }
  if(confirm('Tem certeza que deseja excluir esta fazenda? Todos os dados serão perdidos.')) {
    props.splice(currentPropertyIndex, 1);
    localStorage.setItem('agra_properties', JSON.stringify(props));
    currentPropertyIndex = 0;
    localStorage.setItem('agra_active_property_index', 0);
    localStorage.setItem('agra_property_data', JSON.stringify(props[0]));
    window.location.reload();
  }
});

function renderPropertyData() {
  const props = getProperties();
  
  if (props.length === 0) {
    onboardingDialog?.showModal();
    return;
  }

  const activeDataStr = localStorage.getItem('agra_property_data');
  if (activeDataStr) {
    const activeData = JSON.parse(activeDataStr);
    if (!props[currentPropertyIndex] || JSON.stringify(props[currentPropertyIndex]) !== activeDataStr) {
       props[currentPropertyIndex] = activeData;
       localStorage.setItem('agra_properties', JSON.stringify(props));
    }
  } else {
    localStorage.setItem('agra_property_data', JSON.stringify(props[currentPropertyIndex]));
  }

  const dataStr = localStorage.getItem('agra_property_data');
  if (!dataStr) return;
  const data = JSON.parse(dataStr);
  
  updateFarmSelect(props);
  
  // Update property names
  const sidebarPropName = document.getElementById('sidebarPropertyName');
  if (sidebarPropName) sidebarPropName.textContent = data.propertyName;
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
            <div><strong>${field.name}</strong><small>${field.crop}${field.variety ? ' (' + field.variety + ')' : ''} · ${field.area} ha</small></div>
          </div>
          <div class="progress"><span class="${color === 'yellow' ? 'yellow-fill' : color === 'red' ? 'red-fill' : ''}" style="width: ${field.health}%"></span></div>
          <strong class="${color === 'green' ? 'health-good' : color === 'yellow' ? 'health-warn' : 'health-alert'}">${field.health}</strong>
      `;
    });
  }

  // Render Dynamic Chart
  const prodData = JSON.parse(localStorage.getItem('agra_production_data') || '[]');
  const cropTotals = {};
  data.fields.forEach(f => {
    if (!cropTotals[f.crop]) cropTotals[f.crop] = 0;
  });
  prodData.forEach(h => {
    const field = data.fields.find(f => f.name === h.field);
    const crop = field ? field.crop : 'Desconhecida';
    if (!cropTotals[crop]) cropTotals[crop] = 0;
    cropTotals[crop] += Number(h.volume);
  });

  const chartWrap = document.querySelector('.chart-wrap');
  if (chartWrap) {
    let maxVol = Math.max(...Object.values(cropTotals), 10);
    maxVol = Math.ceil(maxVol / 10) * 10;
    let html = `<div class="chart-y"><span>${maxVol} t</span><span>${maxVol*0.75} t</span><span>${maxVol*0.5} t</span><span>${maxVol*0.25} t</span><span>0</span></div>`;
    html += `<div class="bar-chart"><div class="grid-line one"></div><div class="grid-line two"></div><div class="grid-line three"></div><div class="grid-line four"></div>`;
    
    Object.keys(cropTotals).forEach(crop => {
      const vol = cropTotals[crop];
      const pct = Math.max(2, (vol / maxVol) * 100);
      let colorClass = 'soy';
      const cLower = crop.toLowerCase();
      if (cLower === 'milho' || cLower.includes('cana') || cLower.includes('hortali') || cLower.includes('equino') || cLower.includes('ovino')) colorClass = 'corn';
      else if (cLower.includes('caf') || cLower.includes('feij') || cLower.includes('fruti') || cLower.includes('gado')) colorClass = 'coffee';
      else if (cLower === 'trigo' || cLower.includes('algod') || cLower.includes('arroz') || cLower.includes('aves') || cLower.includes('suíno')) colorClass = 'wheat';
      
      html += `<div class="bar-group"><div class="bar ${colorClass}" style="height: ${pct}%"><span>${vol} t</span></div><small>${crop}</small></div>`;
    });
    
    html += `</div>`;
    chartWrap.innerHTML = html;
  }
  
  // Update metric production total
  const metricProd = document.getElementById('metricProduction');
  if (metricProd) {
    const totalProd = Object.values(cropTotals).reduce((sum, v) => sum + v, 0);
    metricProd.innerHTML = `${totalProd} <small>t</small>`;
  }

  // Update Map
  const mapContainer = document.getElementById('dynamicFarmMap');
  if (mapContainer) {
    if (window.L) {
      if (!dashboardMap) {
        dashboardMap = L.map('dynamicFarmMap', {zoomControl: false}).setView([-14.235, -51.925], 4);
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri'
        }).addTo(dashboardMap);
      }
      
      dashboardMap.eachLayer((layer) => {
        if (layer instanceof L.Circle || layer instanceof L.Marker) dashboardMap.removeLayer(layer);
      });

      let bounds = [];
      data.fields.forEach((field) => {
        if (field.gps) {
          const coords = field.gps.split(',').map(n => parseFloat(n.trim()));
          if (coords.length === 2 && !isNaN(coords[0])) {
            let color = field.health >= 75 ? '#22c55e' : field.health >= 60 ? '#f59e0b' : '#ef4444';
            L.circle(coords, {
              color: color, fillColor: color, fillOpacity: 0.6, radius: Math.sqrt(field.area) * 200
            }).bindPopup(`<b>${field.name}</b><br>Cultura: ${field.crop}${field.variety ? ' (' + field.variety + ')' : ''}<br>Saúde: ${field.health}%`).addTo(dashboardMap);
            bounds.push(coords);
          }
        }
      });
      
      if (bounds.length > 0) {
        dashboardMap.fitBounds(bounds);
        updateWeather(bounds[0][0], bounds[0][1]);
      } else {
        navigator.geolocation.getCurrentPosition(
          pos => {
            dashboardMap.setView([pos.coords.latitude, pos.coords.longitude], 12);
            updateWeather(pos.coords.latitude, pos.coords.longitude);
          },
          err => {
            updateWeather(-14.235, -51.925);
          }
        );
      }
    } else {
      setTimeout(renderPropertyData, 500); 
    }
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

  // Update Tasks Metric & List
  const tasks = JSON.parse(localStorage.getItem('agra_tasks_data') || '[]');
  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.date === todayStr);
  
  const metricTasks = document.getElementById('metricTasks');
  const metricTasksToday = document.getElementById('metricTasksToday');
  if (metricTasks) metricTasks.textContent = tasks.length.toString().padStart(2, '0');
  if (metricTasksToday) metricTasksToday.textContent = `${todayTasks.length} vencem hoje`;

  const dashboardTaskList = document.getElementById('dashboardTaskList');
  if (dashboardTaskList) {
    if (tasks.length === 0) {
      dashboardTaskList.innerHTML = '<p class="muted" style="padding:1rem;">Nenhuma atividade agendada.</p>';
    } else {
      let tasksHtml = '';
      const sortedTasks = [...tasks].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 3);
      sortedTasks.forEach(task => {
        const taskDate = new Date(task.date + 'T12:00:00');
        const day = taskDate.getDate().toString().padStart(2, '0');
        const month = taskDate.toLocaleString('pt-BR', { month: 'short' }).toUpperCase();
        const isToday = task.date === todayStr;
        
        tasksHtml += `
          <div class="task-row">
            <span class="task-date ${isToday ? 'today' : ''}"><b>${day}</b><small>${month}</small></span>
            <div style="flex:1; min-width:0;">
              <strong style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">${task.title}</strong>
              <small style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">${task.field} · ${task.assignee}</small>
            </div>
            <div style="display:flex; align-items:center; gap:0.25rem; flex-shrink: 0;">
              <span class="tag ${isToday ? 'urgent' : 'planned'}">${isToday ? 'Hoje' : 'Agendado'}</span>
              <button class="text-button delete-task-btn" data-title="${task.title}" style="color: var(--red-600); padding: 0 0.25rem; font-size: 1.25rem; line-height: 1;" title="Excluir Atividade">×</button>
            </div>
          </div>
        `;
      });
      dashboardTaskList.innerHTML = tasksHtml;

      // Add delete listeners
      dashboardTaskList.querySelectorAll('.delete-task-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          if(confirm('Tem certeza que deseja excluir esta atividade?')) {
            const tTitle = e.currentTarget.dataset.title;
            const updatedTasks = tasks.filter(t => t.title !== tTitle);
            localStorage.setItem('agra_tasks_data', JSON.stringify(updatedTasks));
            window.dispatchEvent(new Event('agra_tasks_updated'));
          }
        });
      });
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
  const fieldVariety = document.getElementById('fieldVariety').value;
  
  const propertyData = {
    propertyName,
    totalArea,
    fields: [
      { name: fieldName, area: fieldArea, crop: fieldCrop, variety: fieldVariety, health: Math.floor(Math.random() * 40) + 50 }
    ]
  };
  
  const props = getProperties();
  props.push(propertyData);
  localStorage.setItem('agra_properties', JSON.stringify(props));
  
  currentPropertyIndex = props.length - 1;
  localStorage.setItem('agra_active_property_index', currentPropertyIndex);
  localStorage.setItem('agra_property_data', JSON.stringify(propertyData));
  
  onboardingDialog.close();
  e.target.reset();
  
  window.dispatchEvent(new Event('agra_property_updated'));
  showToast('Propriedade adicionada com sucesso!');
});

// Run on load
renderPropertyData();
window.addEventListener('agra_property_updated', renderPropertyData);
// ----------------------------------

const dashboard = document.querySelector('#dashboardSection');
const dynamicModuleSection = document.querySelector('#dynamicModuleSection');
const pageTitle = document.querySelector('#pageTitle');
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
const implementedModules = ['fields', 'tasks', 'embrapa', 'soil', 'production', 'inventory', 'weather', 'team', 'carbon'];

async function showSection(section) {
  dashboard.hidden = true;
  dynamicModuleSection.hidden = true;

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
        if (section === 'carbon') window.AgraCarbon.init(tempContainer);
        
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
  }

  pageTitle.textContent = sectionLabels[section] || 'Dashboard';
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.section === section);
  });
}

document.querySelectorAll('[data-section]').forEach((button) => {
  button.addEventListener('click', () => showSection(button.dataset.section));
});

document.querySelector('#newActivityButton')?.addEventListener('click', () => {
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
  navigator.serviceWorker.register('./sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          showToast('Atualização aplicada. Recarregando...');
          setTimeout(() => window.location.reload(), 1500);
        }
      });
    });
  }).catch(() => showToast('Cache offline indisponível nesta sessão.'));
}

window.addEventListener('agra_tasks_updated', () => {
  renderPropertyData();
});

// --- CARBON CALCULATOR LOGIC ---
const btnCalculateCarbon = document.getElementById('btnCalculateCarbon');
if (btnCalculateCarbon) {
  btnCalculateCarbon.addEventListener('click', () => {
    const area = parseFloat(document.getElementById('carbonArea').value) || 0;
    const factor = parseFloat(document.getElementById('carbonBiome').value) || 0;
    
    const co2e = area * factor;
    const revenue = co2e * 68.00;
    
    const resultBox = document.getElementById('carbonResult');
    const resultText = document.getElementById('carbonResultText');
    
    resultText.innerHTML = `Sequestro estimado de <strong>${co2e.toLocaleString('pt-BR')} toneladas</strong> de CO2e por ano.<br>Potencial financeiro: <strong style="color:#d4af37;">R$ ${revenue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong> por ano no mercado voluntário.`;
    resultBox.style.display = 'block';
  });
}


// Handle Bottom Navigation (Mobile)
document.querySelectorAll('.bottom-nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all
    document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));
    // Add to clicked
    btn.classList.add('active');
    // Navigate
    const section = btn.getAttribute('data-section');
    if (section) {
      // Sync sidebar if it exists
      const sidebarBtn = document.querySelector(`.sidebar .nav-item[data-section="${section}"]`);
      if (sidebarBtn) {
        document.querySelectorAll('.sidebar .nav-item').forEach(b => b.classList.remove('active'));
        sidebarBtn.classList.add('active');
      }
      showSection(section);
    }
  });
});

// Update bottom nav when sidebar changes
const originalShowSection = showSection;
showSection = async function(section) {
  await originalShowSection(section);
  document.querySelectorAll('.bottom-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-section') === section);
  });
};
