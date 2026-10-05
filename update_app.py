import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

fake_data_js = """
document.getElementById('fillFakeDataButton')?.addEventListener('click', () => {
  document.getElementById('propName').value = 'Fazenda Demonstração';
  document.getElementById('propArea').value = '150';
  document.getElementById('fieldName').value = 'Talhão Alpha';
  document.getElementById('fieldArea').value = '45';
  document.getElementById('fieldCrop').value = 'Soja';
  document.getElementById('fieldVariety').value = 'Pioneer 30F53';
});

onboardingForm?.addEventListener('submit', (e) => {"""

content = content.replace("onboardingForm?.addEventListener('submit', (e) => {", fake_data_js)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
