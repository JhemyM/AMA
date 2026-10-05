import re

files = ['login.html', 'index.html', 'clear_cache.html', 'login.js', 'app.js', 'package.json']
for file in files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        content = re.sub(r'(?<=v=0\.7\.)14', '15', content)
        content = re.sub(r'"version": "0\.7\.14"', '"version": "0.7.15"', content)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception:
        pass

with open('sw.js', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('0.7.14', '0.7.15')
with open('sw.js', 'w', encoding='utf-8') as f:
    f.write(content)
