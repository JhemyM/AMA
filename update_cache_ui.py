import re

with open('clear_cache.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('localStorage.clear();', '// localStorage mantido para nao perder os dados')

with open('clear_cache.html', 'w', encoding='utf-8') as f:
    f.write(content)

with open('login.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the red button
content = re.sub(r'<button type="button" class="secondary-button auth-btn" onclick="window\.location\.href=\'clear_cache\.html\'".*?</button>\n\s*', '', content)

# Add subtle link at the bottom
subtle_link = '<div style="margin-top: 2rem; text-align: center;"><a href="clear_cache.html" style="color: rgba(255,255,255,0.3); font-size: 0.8rem; text-decoration: underline;">Forçar atualização do aplicativo (Cache)</a></div>'

content = content.replace('</form>', f'</form>\n{subtle_link}')

with open('login.html', 'w', encoding='utf-8') as f:
    f.write(content)
