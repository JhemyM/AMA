import re

files = ['login.html', 'index.html']
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    content = re.sub(r'\?v=0\.7\.9', '?v=0.7.10', content)
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

with open('clear_cache.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('v=0.7.9', 'v=0.7.10')
with open('clear_cache.html', 'w', encoding='utf-8') as f:
    f.write(content)

with open('login.js', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('v=0.7.9', 'v=0.7.10')
with open('login.js', 'w', encoding='utf-8') as f:
    f.write(content)

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('v=0.7.9', 'v=0.7.10')
with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
