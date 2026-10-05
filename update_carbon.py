import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove Carbon button from sidebar
content = re.sub(r'<span class="nav-label">Sustentabilidade</span>.*?data-section="carbon".*?</button>', '', content, flags=re.DOTALL)

# Add a Carbon summary card to the Dashboard
carbon_card = """
          <article class="panel metric-card" style="margin-top: 1rem; border-left: 4px solid var(--green-500);">
            <div class="panel-heading" style="padding-bottom: 0.5rem;">
              <div>
                <h2>Créditos de Carbono e Captação</h2>
                <p>Estimativa de sequestro e potencial de receita</p>
              </div>
            </div>
            <div style="padding: 1rem; display: flex; gap: 2rem; align-items: center;">
              <div style="flex: 1;">
                <span class="muted" style="display: block; font-size: 0.85rem;">Sequestro Estimado</span>
                <strong style="font-size: 1.5rem; color: var(--green-600);">240 tCO₂e/ano</strong>
              </div>
              <div style="flex: 1;">
                <span class="muted" style="display: block; font-size: 0.85rem;">Potencial de Captação</span>
                <strong style="font-size: 1.5rem; color: var(--green-600);">R$ 18.500/ano</strong>
              </div>
            </div>
          </article>
"""

# Inject after task-panel in dashboard
content = content.replace('</article>\n        <section class="bottom-strip">', f'</article>\n{carbon_card}\n        <section class="bottom-strip">')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

# Update app.js implementedModules
with open('app.js', 'r', encoding='utf-8') as f:
    app_content = f.read()

app_content = app_content.replace("'weather', 'team', 'carbon']", "'weather', 'team']")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_content)
