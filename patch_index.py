import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''          <div class="form-group" style="grid-column: span 2;">
            <label for="fieldCrop" style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Cultura</label>
            <select id="fieldCrop" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; background: white;">
              <option value="Milho">Milho</option>
              <option value="Soja">Soja</option>
              <option value="Café">Café</option>
              <option value="Trigo">Trigo</option>
              <option value="Outro">Outra Cultura</option>
            </select>
          </div>'''

replacement = '''          <div class="form-group">
            <label for="fieldCrop" style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Cultura</label>
            <select id="fieldCrop" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; background: white;">
              <option value="Milho">Milho</option>
              <option value="Soja">Soja</option>
              <option value="Café">Café</option>
              <option value="Trigo">Trigo</option>
              <option value="Cana-de-Açúcar">Cana-de-Açúcar</option>
              <option value="Algodão">Algodão</option>
              <option value="Arroz">Arroz</option>
              <option value="Feijão">Feijão</option>
              <option value="Sorgo">Sorgo</option>
              <option value="Hortaliças">Hortaliças</option>
              <option value="Fruticultura">Fruticultura</option>
              <option value="Pecuária (Pasto)">Pecuária (Pasto)</option>
              <option value="Outro">Outra Cultura</option>
            </select>
          </div>
          <div class="form-group">
            <label for="fieldVariety" style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Variedade</label>
            <input type="text" id="fieldVariety" required placeholder="Ex: Pioneer 30F53" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px;">
          </div>'''

if target in content:
    content = content.replace(target, replacement)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully patched index.html")
else:
    print("Could not find target string in index.html. Trying regex...")
    
    # regex fallback
    pattern = re.compile(r'<div class="form-group" style="grid-column: span 2;">.*?<label for="fieldCrop".*?</select>\s*</div>', re.DOTALL)
    if pattern.search(content):
        content = pattern.sub(replacement, content)
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Successfully patched index.html with regex")
    else:
        print("Regex also failed to match.")

