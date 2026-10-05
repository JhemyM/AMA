import re

with open('login.html', 'r', encoding='utf-8') as f:
    content = f.read()

subtle_link = '\n      <div style="margin-top: 2rem; text-align: center;"><a href="clear_cache.html" style="color: rgba(255,255,255,0.3); font-size: 0.8rem; text-decoration: underline;">Forçar atualização do aplicativo (Cache)</a></div>'

content = content.replace('      </div>\n    </div>', subtle_link + '\n      </div>\n    </div>')

with open('login.html', 'w', encoding='utf-8') as f:
    f.write(content)
