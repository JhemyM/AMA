window.AgraCarbon = {
  container: null,

  init(container) {
    this.container = container;
    this.bindEvents();
    this.calculateOverview();
  },

  bindEvents() {
    const form = this.container.querySelector('#carbonForm');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const area = parseFloat(this.container.querySelector('#carbonArea').value);
      const factor = parseFloat(this.container.querySelector('#carbonBiome').value);
      
      const total = area * factor;
      const resultBox = this.container.querySelector('#carbonResultBox');
      const resultText = this.container.querySelector('#carbonResultText');
      
      resultText.innerHTML = `Sequestro estimado de <strong>${total.toLocaleString('pt-BR')} tCO2e</strong> por ano. <br><br>Ganhos potenciais de <strong style="color:var(--primary);">R$ ${(total * 68).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong> na cotação atual.`;
      resultBox.style.display = 'block';
    });

    const reportBtn = this.container.querySelector('#emitCarbonReportBtn');
    reportBtn?.addEventListener('click', () => {
      // Check if user is premium to emit report
      if (window.AgraStorage) {
        const userStr = localStorage.getItem('agra_current_user');
        const user = userStr ? JSON.parse(userStr) : null;
        if (user && user.plan === 'free') {
          if (window.AgraMonetization && window.AgraMonetization.showPaywall) {
            window.AgraMonetization.showPaywall('Relatórios verificados de carbono são exclusivos para contas Premium.');
          } else {
            alert('Relatórios verificados de carbono são exclusivos para contas Premium.');
          }
          return;
        }
      }
      alert('Relatório de Sustentabilidade (Rascunho) enviado para o seu e-mail!');
    });
  },

  calculateOverview() {
    // Attempt to calculate based on real farm data from AgraStorage
    let totalArea = 0;
    if (window.AgraStorage) {
      const state = window.AgraStorage.getState();
      if (state.fields && state.fields.length > 0) {
        totalArea = state.fields.reduce((sum, f) => sum + (parseFloat(f.area) || 0), 0);
      }
    }
    
    // If no real fields, provide a realistic demo estimation based on a 50ha farm
    if (totalArea === 0) totalArea = 50; 

    // Assume average 4t/ha/year for a mixed farm
    const estimatedCarbon = totalArea * 4; 
    const carEquivalent = Math.floor(estimatedCarbon * 0.217); // 1 tCO2 is about 0.217 cars driven for a year
    const revenue = estimatedCarbon * 68; // R$ 68 per tCO2

    const capturedEl = this.container.querySelector('#carbonTotalCaptured');
    const carsEl = this.container.querySelector('#carbonCarEquivalent');
    const revEl = this.container.querySelector('#carbonRevenue');

    if (capturedEl) capturedEl.textContent = estimatedCarbon.toLocaleString('pt-BR');
    if (carsEl) carsEl.textContent = carEquivalent.toLocaleString('pt-BR');
    if (revEl) revEl.textContent = `R$ ${revenue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
  },

  openEmbrapaReference(topic) {
    if (window.showSection) {
      window.showSection('embrapa');
      // A slightly hacky but effective way to filter or scroll to the Embrapa topic
      setTimeout(() => {
        const searchInput = document.querySelector('#module-container-embrapa input[type="search"]');
        if (searchInput) {
          searchInput.value = topic;
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, 100);
    }
  }
};
