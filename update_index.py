import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Make Variety not required
content = content.replace('id="fieldVariety" required placeholder=', 'id="fieldVariety" placeholder=')
content = content.replace('Variedade</label>', 'Variedade <small style="color: #666; font-weight: normal;">(Opcional)</small></label>')

# Add new options
new_options = """                </optgroup>
                <optgroup label="Silvicultura">
                  <option value="Eucalipto">Eucalipto</option>
                  <option value="Pinus">Pinus</option>
                  <option value="Seringueira">Seringueira</option>
                  <option value="Mogno Africano">Mogno Africano</option>
                </optgroup>
                <optgroup label="Pastagem e Pecuária">
                  <option value="Pastagem (Braquiária)">Pastagem (Braquiária)</option>
                  <option value="Pastagem (Mombaça)">Pastagem (Mombaça)</option>
                  <option value="Gado de Corte">Gado de Corte</option>
                  <option value="Gado de Leite">Gado de Leite</option>
                  <option value="Suínos">Suínos</option>
                  <option value="Aves">Aves</option>
                  <option value="Ovinos/Caprinos">Ovinos/Caprinos</option>
                </optgroup>
              </select>"""
content = re.sub(r'</optgroup>\s*</select>', new_options, content)

# Add Fake Data Button
content = content.replace('<div class="feedback-actions" style="display:flex; justify-content:flex-end;">', '<div class="feedback-actions" style="display:flex; justify-content:space-between;">\n          <button class="secondary-button" id="fillFakeDataButton" type="button" style="border: 1px solid #193b2d;">Preencher p/ Teste</button>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
