// monetization.js - AGRA Plan and Features Manager

const PLAN_FEATURES = {
  free: ['dashboard', 'fields', 'tasks'],
  pro: ['dashboard', 'fields', 'tasks', 'production', 'soil', 'weather', 'inventory', 'embrapa'],
  enterprise: ['dashboard', 'fields', 'tasks', 'production', 'soil', 'weather', 'inventory', 'team', 'embrapa']
};

class MonetizationManager {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('agra_current_user') || '{}');
    // Default to 'free' if no plan is set
    if (!this.currentUser.plan) {
      this.currentUser.plan = 'free';
      localStorage.setItem('agra_current_user', JSON.stringify(this.currentUser));
    }
    this.currentPlan = this.currentUser.plan;
  }

  isFeatureAllowed(sectionId) {
    const allowedFeatures = PLAN_FEATURES[this.currentPlan] || PLAN_FEATURES.free;
    return allowedFeatures.includes(sectionId);
  }

  init() {
    this.injectPaywallModal();
    this.lockNavigationItems();
  }

  lockNavigationItems() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const sectionId = item.getAttribute('data-section');
      if (!this.isFeatureAllowed(sectionId)) {
        item.classList.add('locked-feature');
        item.innerHTML += ' <span class="lock-badge">âœ’ PRO</span>';
        
        // Intercept clicks on locked items
        item.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.showPaywall(sectionId);
        }, true); // Use capture phase to intercept before app.js navigation
      }
    });
  }

  injectPaywallModal() {
    const modalHtml = \
      <div id="paywallModal" class="modal-overlay" style="display: none; z-index: 9999;">
        <div class="modal-content paywall-content">
          <div class="paywall-header">
            <h2>Recurso Exclusivo</h2>
            <p>FaÃ§a upgrade do seu plano para liberar esta funcionalidade.</p>
          </div>
          <div class="paywall-body">
            <div class="plan-card">
              <h3>AGRA Pro</h3>
              <p class="price">R$ 97<span>/mÃªs</span></p>
              <ul>
                <li>âœ“ GestÃ£o de ProduÃ§Ã£o</li>
                <li>âœ“ Clima e AnÃ¡lise de Solo</li>
                <li>âœ“ Estoque e Manuais Embrapa</li>
              </ul>
              <button id="btnCheckout" class="primary-button">Assinar Agora</button>
            </div>
          </div>
          <button id="closePaywall" class="text-button">Voltar</button>
        </div>
      </div>
    \;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('closePaywall').addEventListener('click', () => {
      document.getElementById('paywallModal').style.display = 'none';
    });

    document.getElementById('btnCheckout').addEventListener('click', () => {
      alert('IntegraÃ§Ã£o com o gateway de pagamento (Stripe/MercadoPago) serÃ¡ inserida aqui!');
    });
  }

  showPaywall(sectionId) {
    document.getElementById('paywallModal').style.display = 'flex';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.Monetization = new MonetizationManager();
  window.Monetization.init();
});
