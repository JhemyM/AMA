import re

with open('login.html', 'r', encoding='utf-8') as f:
    content = f.read()

subtle_link = '<div style="margin-top: 2rem; text-align: center;"><a href="clear_cache.html" style="color: rgba(255,255,255,0.3); font-size: 0.8rem; text-decoration: underline;">Forçar atualização do aplicativo (Cache)</a></div>'
subtle_link_b = '<div style="margin-top: 2rem; text-align: center;"><a href="clear_cache.html" style="color: rgba(255,255,255,0.3); font-size: 0.8rem; text-decoration: underline;">ForÃ§ar atualizaÃ§Ã£o do aplicativo (Cache)</a></div>'

# Remove all occurrences
content = content.replace(subtle_link + '\n', '')
content = content.replace(subtle_link, '')
content = content.replace(subtle_link_b + '\n', '')
content = content.replace(subtle_link_b, '')

# Add it just once at the very end of auth-glass-panel
# The structure is: <div class="auth-glass-panel"> ... </form> </div> </div>
content = content.replace('    </div>\n    \n    <script src="storage.js', '      ' + subtle_link + '\n    </div>\n    \n    <script src="storage.js')

with open('login.html', 'w', encoding='utf-8') as f:
    f.write(content)
