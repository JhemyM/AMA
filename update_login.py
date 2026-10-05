import re

with open('login.html', 'r', encoding='utf-8') as f:
    content = f.read()

btn_html = """<button type="button" class="secondary-button auth-btn" onclick="window.location.href='clear_cache.html'" style="margin-top: 10px; background: rgba(255, 100, 100, 0.1); border: 1px solid rgba(255, 100, 100, 0.3); color: #ffbbbb;">Resolver Travamento (Limpar App)</button>"""

content = content.replace('<button type="button" class="text-button switch-auth" id="showRegisterBtn">', btn_html + '\n        <button type="button" class="text-button switch-auth" id="showRegisterBtn">')

with open('login.html', 'w', encoding='utf-8') as f:
    f.write(content)
