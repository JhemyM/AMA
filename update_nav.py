import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

nav_inject = """          <span class="nav-label">Sustentabilidade</span>
          <button class="nav-item" data-section="carbon" type="button"><span class="nav-icon">🌿</span>Créditos de Carbono</button>
          <span class="nav-label">Operação</span>"""

text = text.replace('<span class="nav-label">Operação</span>', nav_inject)

if '<span class="nav-label">OperaÃ§Ã£o</span>' in text:
    nav_inject_broken = """          <span class="nav-label">Sustentabilidade</span>
          <button class="nav-item" data-section="carbon" type="button"><span class="nav-icon">🌿</span>Créditos de Carbono</button>
          <span class="nav-label">Operação</span>"""
    text = text.replace('<span class="nav-label">OperaÃ§Ã£o</span>', nav_inject_broken)

# Fix some encoding artifacts if they exist
text = text.replace('VisÃ£o', 'Visão').replace('ProduÃ§Ã£o', 'Produção').replace('TalhÃµes', 'Talhões').replace('anÃ¡lises', 'análises')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("index.html nav updated.")
