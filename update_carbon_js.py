import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add carbon update to renderPropertyData
carbon_logic = """
  // Update Carbon estimates
  const carbonCard = document.querySelector('.metric-card h2:contains("Carbono")')?.closest('.metric-card') || 
                     Array.from(document.querySelectorAll('.metric-card h2')).find(el => el.textContent.includes('Carbono'))?.closest('.metric-card');
  if (carbonCard) {
    const totalArea = Number(data.totalArea) || 0;
    const carbonSeq = (totalArea * 1.5).toFixed(0); // 1.5 t/ha
    const carbonRev = (carbonSeq * 75).toLocaleString('pt-BR'); // R$ 75 per ton
    
    const values = carbonCard.querySelectorAll('strong');
    if (values.length >= 2) {
      values[0].textContent = carbonSeq + ' tCO₂e/ano';
      values[1].textContent = 'R$ ' + carbonRev + '/ano';
    }
  }
"""

content = content.replace("document.getElementById('dynamicFarmStatusDesc').textContent", f"{carbon_logic}\n    document.getElementById('dynamicFarmStatusDesc').textContent")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
