// monetization.js - AGRA Plan and Features Manager

const PLAN_FEATURES = {
  free: ['dashboard', 'fields', 'tasks'],
  pro: ['dashboard', 'fields', 'tasks', 'production', 'soil', 'weather', 'inventory', 'embrapa', 'carbon'],
  enterprise: ['dashboard', 'fields', 'tasks', 'production', 'soil', 'weather', 'inventory', 'team', 'embrapa', 'carbon'],
  vitalicio: ['dashboard', 'fields', 'tasks', 'production', 'soil', 'weather', 'inventory', 'team', 'embrapa', 'carbon']
};

class MonetizationManager {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('agra_current_user') || '{}');
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
        item.innerHTML += ' <span class="lock-badge">🔒 PRO</span>';
        
        item.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.showPaywall(sectionId);
        }, true);
      }
    });
  }

  injectPaywallModal() {
    const modalHtml = `
      <div id="paywallModal" class="modal-overlay" style="display: none; z-index: 9999;">
        <div class="modal-content paywall-content" style="max-width: 700px;">
          <div class="paywall-header">
            <h2>Recursos Premium</h2>
            <p>Faça o upgrade para liberar o poder total do AGRA.</p>
          </div>
          <div class="paywall-body" style="display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center;">
            <div class="plan-card">
              <h3>AGRA Pro</h3>
              <p class="price">R$ 97<span>/mês</span></p>
              <ul>
                <li>✓ Gestão de Produção</li>
                <li>✓ Clima e Solo Avançados</li>
                <li>✓ Estoque e Embrapa</li>
              </ul>
              <button class="primary-button checkout-btn" data-plan="pro">Assinar Mensal</button>
            </div>
            <div class="plan-card" style="border-color: #d4af37; box-shadow: 0 0 20px rgba(212,175,55,0.2);">
              <h3>AGRA Vitalício</h3>
              <p class="price">R$ 997<span>/único</span></p>
              <ul>
                <li>✓ Acesso <b>Para Sempre</b></li>
                <li>✓ Gestão de Equipes</li>
                <li>✓ Nenhuma mensalidade</li>
              </ul>
              <button class="primary-button checkout-btn" data-plan="vitalicio" style="background: linear-gradient(135deg, #d4af37 0%, #aa8529 100%);">Garantir Acesso</button>
            </div>
          </div>
          <button id="closePaywall" class="text-button" style="margin-top: 1rem;">Voltar</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('closePaywall').addEventListener('click', () => {
      document.getElementById('paywallModal').style.display = 'none';
    });

    document.querySelectorAll('.checkout-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const plan = e.target.getAttribute('data-plan');
        const originalText = e.target.textContent;
        e.target.textContent = 'Carregando...';
        e.target.disabled = true;

        try {
          const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plan: plan })
          });

          if (!response.ok) {
            throw new Error('Falha ao contatar servidor de pagamentos.');
          }

          const data = await response.json();
          // Redireciona o usuÃ¡rio para o Checkout Seguro gerado pelo Stripe/MercadoPago
          window.location.href = data.url;

        } catch (error) {
          console.error(error);
          alert('Este recurso sÃ³ funcionarÃ¡ quando o AGRA estiver hospedado na Vercel com a Cloud Function ativa!');
          e.target.textContent = originalText;
          e.target.disabled = false;
        }
      });
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
