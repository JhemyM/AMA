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
      <dialog class="feedback-dialog" id="paywallModal" aria-labelledby="paywallTitle" style="max-width: 800px; width: 90%;">
        <div class="dialog-heading" style="padding: 24px 24px 0;">
          <div>
            <p class="eyebrow" style="color: #8fc9a1;">Recursos Premium</p>
            <h2 id="paywallTitle" style="color: #fff;">Evolua sua Gestão</h2>
          </div>
          <button class="dialog-close" id="closePaywall" aria-label="Fechar" style="color: #fff; background: transparent; border: none; font-size: 24px; cursor: pointer;">×</button>
        </div>
        
        <div class="paywall-content" style="padding: 0 24px 24px; max-width: 100%; background: transparent; border: none; text-align: left;">
          <p style="color: rgba(255,255,255,0.8); margin-bottom: 24px;">Faça o upgrade para liberar o poder total do AGRA e tome decisões baseadas em dados.</p>
          
          <div class="paywall-body" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            <div class="plan-card" style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
              <h3 style="color: #fff; margin-top: 0;">AGRA Pro</h3>
              <p class="price" style="font-size: 2rem; font-weight: bold; color: #8fc9a1; margin: 1rem 0;">R$ 147<span style="font-size: 1rem; color: rgba(255,255,255,0.6);">/mês</span></p>
              <ul style="list-style: none; padding: 0; margin-bottom: 1.5rem; color: #e0e0e0;">
                <li style="margin-bottom: 0.5rem;">✓ Gestão de Produção</li>
                <li style="margin-bottom: 0.5rem;">✓ Clima e Solo Avançados</li>
                <li style="margin-bottom: 0.5rem;">✓ Estoque e Embrapa</li>
              </ul>
              <button class="primary-button checkout-btn" data-plan="pro" style="width: 100%;">Assinar Mensal</button>
            </div>
            
            <div class="plan-card" style="background: linear-gradient(145deg, rgba(212,175,55,0.1), rgba(0,0,0,0)); padding: 1.5rem; border-radius: 16px; border: 1px solid rgba(212, 175, 55, 0.5); box-shadow: 0 0 30px rgba(212,175,55,0.1);">
              <div style="position: absolute; top: -10px; right: 20px; background: #d4af37; color: #000; font-size: 0.7rem; font-weight: bold; padding: 4px 8px; border-radius: 8px;">MAIS VANTAJOSO</div>
              <h3 style="color: #d4af37; margin-top: 0;">AGRA Vitalício</h3>
              <p class="price" style="font-size: 2rem; font-weight: bold; color: #d4af37; margin: 1rem 0;">R$ 1.497<span style="font-size: 1rem; color: rgba(255,255,255,0.6);">/único</span></p>
              <ul style="list-style: none; padding: 0; margin-bottom: 1.5rem; color: #e0e0e0;">
                <li style="margin-bottom: 0.5rem;">✓ Acesso <b>Para Sempre</b></li>
                <li style="margin-bottom: 0.5rem;">✓ Gestão de Equipes</li>
                <li style="margin-bottom: 0.5rem;">✓ Nenhuma mensalidade</li>
              </ul>
              <button class="primary-button checkout-btn" data-plan="vitalicio" style="width: 100%; background: linear-gradient(135deg, #d4af37 0%, #aa8529 100%); border: none; color: #fff;">Garantir Acesso</button>
            </div>
          </div>
        </div>
      </dialog>
    `;
    
    // Set custom style for this specific dialog background
    const styleHtml = `
      <style>
        #paywallModal { background: rgba(20, 45, 33, 0.95); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(20px); }
        #paywallModal::backdrop { background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); }
        .plan-card { position: relative; }
      </style>
    `;
    
    document.body.insertAdjacentHTML('beforeend', styleHtml + modalHtml);

    const dialog = document.getElementById('paywallModal');

    document.getElementById('closePaywall').addEventListener('click', () => {
      dialog.close();
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
            body: JSON.stringify({ plan: plan, user: this.currentUser })
          });

          if (!response.ok) {
            throw new Error('Falha ao contatar servidor de pagamentos.');
          }

          const data = await response.json();
          window.location.href = data.url;

        } catch (error) {
          console.error(error);
          alert('Este recurso só funcionará quando o backend de pagamentos estiver configurado e ativo!');
          e.target.textContent = originalText;
          e.target.disabled = false;
        }
      });
    });
  }

  showPaywall(sectionId) {
    const dialog = document.getElementById('paywallModal');
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.Monetization = new MonetizationManager();
  window.Monetization.init();
});
