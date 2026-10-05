import re

with open('modules/embrapa.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add logic for XP and level up
level_logic = """
    // XP Gamification
    let xp = parseInt(localStorage.getItem('agra_embrapa_xp') || '0');
    let readManuals = JSON.parse(localStorage.getItem('agra_embrapa_read') || '[]');
    
    function updateLevelBanner() {
      const readCount = readManuals.length;
      const totalNeeded = 5;
      const progress = Math.min((readCount / totalAreaNeeded) * 100, 100); // Wait, typo totalNeeded
      
      const countEl = container.querySelector('#embrapaReadCount');
      if (countEl) countEl.textContent = readCount;
      
      const barEl = container.querySelector('#embrapaProgressBar');
      if (barEl) barEl.style.width = Math.min((readCount / totalNeeded) * 100, 100) + '%';
      
      const titleEl = container.querySelector('h3:contains("Nível")');
      if (titleEl) {
        if (readCount >= 15) titleEl.textContent = 'Nível: Especialista Supremo 🏆';
        else if (readCount >= 10) titleEl.textContent = 'Nível: Produtor Avançado ⭐';
        else if (readCount >= 5) titleEl.textContent = 'Nível: Estudante Focado 📚';
        else titleEl.textContent = 'Nível: Produtor Aprendiz 🌱';
      }
    }
"""

content = content.replace('function renderCatalog() {', level_logic.replace('totalAreaNeeded', 'totalNeeded') + '\n    function renderCatalog() {')

read_btn_old = r"container\.querySelector\('#manualReadBtn'\)\?\.addEventListener\('click', \(\) => \{"
read_btn_new = """container.querySelector('#manualReadBtn')?.addEventListener('click', () => {
      if (!activeDocId) return;
      if (!readManuals.includes(activeDocId)) {
        readManuals.push(activeDocId);
        xp += 50;
        localStorage.setItem('agra_embrapa_read', JSON.stringify(readManuals));
        localStorage.setItem('agra_embrapa_xp', xp);
        showToast('🎉 +50 XP! Leitura Iniciada.');
        updateLevelBanner();
      }
"""
content = re.sub(read_btn_old, read_btn_new, content)

content = content.replace('renderCatalog();\n  }\n};', 'updateLevelBanner();\n    renderCatalog();\n  }\n};')

with open('modules/embrapa.js', 'w', encoding='utf-8') as f:
    f.write(content)
