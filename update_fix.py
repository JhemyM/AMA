import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove bottom-nav HTML
content = re.sub(r'<!-- Mobile Bottom Navigation -->.*?</nav>', '', content, flags=re.DOTALL)

# Add cache buster to styles.css
content = content.replace('href="styles.css"', 'href="styles.css?v=0.7.12"')
content = content.replace('href="styles-base.css"', 'href="styles-base.css?v=0.7.12"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

with open('login.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('href="styles.css"', 'href="styles.css?v=0.7.12"')
content = content.replace('href="styles-base.css"', 'href="styles-base.css?v=0.7.12"')
with open('login.html', 'w', encoding='utf-8') as f:
    f.write(content)

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove bottom-nav JS
js_to_remove = r'// Handle Bottom Navigation \(Mobile\).*?btn\.getAttribute\(\'data-section\'\) === section\);\s*\};\s*'
content = re.sub(js_to_remove, '', content, flags=re.DOTALL)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
