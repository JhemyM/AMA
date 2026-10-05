import re

with open('login.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Make demo login wipe previous data
demo_logic_old = r"document\.getElementById\('demoLoginBtn'\)\.addEventListener\('click', \(\) => \{"
demo_logic_new = """document.getElementById('demoLoginBtn').addEventListener('click', () => {
    localStorage.clear();"""
content = re.sub(demo_logic_old, demo_logic_new, content)

with open('login.js', 'w', encoding='utf-8') as f:
    f.write(content)

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Make logout wipe data if user is demo
logout_old = r"document\.getElementById\('logoutButton'\)\?\.addEventListener\('click', \(\) => \{\s*localStorage\.removeItem\('agra_current_user'\);\s*window\.location\.href = 'login\.html';\s*\}\);"
logout_new = """document.getElementById('logoutButton')?.addEventListener('click', () => {
  const user = JSON.parse(localStorage.getItem('agra_current_user') || '{}');
  if (user.role === 'demo') {
    localStorage.clear();
  } else {
    localStorage.removeItem('agra_current_user');
  }
  window.location.href = 'login.html';
});"""

content = re.sub(logout_old, logout_new, content)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
