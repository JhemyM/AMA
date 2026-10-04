import re

with open('login.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(r'<div class="brand-mark auth-logo">VC</div>', '<div class="auth-logo"><img src="icons/icon-192.png" alt="AGRA Logo"></div>', text)
text = text.replace('GestÃ£o', 'Gestão')

with open('login.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("login.html updated.")
