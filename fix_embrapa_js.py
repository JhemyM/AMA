import re

with open('modules/embrapa.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("container.querySelector('h3:contains(\"Nível\")');", "Array.from(container.querySelectorAll('h3')).find(el => el.textContent.includes('Nível'));")

with open('modules/embrapa.js', 'w', encoding='utf-8') as f:
    f.write(content)
