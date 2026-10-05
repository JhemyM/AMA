import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

replacement = '''          <div class="form-group">
            <label for="fieldCrop" style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Cultura</label>
            <select id="fieldCrop" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; background: white;">
              <optgroup label="Grãos e Cereais">
                <option value="Soja">Soja</option>
                <option value="Milho">Milho</option>
                <option value="Trigo">Trigo</option>
                <option value="Arroz">Arroz</option>
                <option value="Feijão">Feijão</option>
                <option value="Sorgo">Sorgo</option>
                <option value="Aveia">Aveia</option>
                <option value="Cevada">Cevada</option>
                <option value="Girassol">Girassol</option>
                <option value="Amendoim">Amendoim</option>
              </optgroup>
              <optgroup label="Energéticas e Fibras">
                <option value="Cana-de-Açúcar">Cana-de-Açúcar</option>
                <option value="Algodão">Algodão</option>
                <option value="Mamona">Mamona</option>
                <option value="Sisal">Sisal</option>
              </optgroup>
              <optgroup label="Café e Cacau">
                <option value="Café Arábica">Café Arábica</option>
                <option value="Café Conilon">Café Conilon</option>
                <option value="Cacau">Cacau</option>
              </optgroup>
              <optgroup label="Fruticultura">
                <option value="Laranja">Laranja</option>
                <option value="Limão">Limão</option>
                <option value="Banana">Banana</option>
                <option value="Maçã">Maçã</option>
                <option value="Uva">Uva</option>
                <option value="Manga">Manga</option>
                <option value="Mamão">Mamão</option>
                <option value="Melancia">Melancia</option>
                <option value="Melão">Melão</option>
                <option value="Abacaxi">Abacaxi</option>
                <option value="Maracujá">Maracujá</option>
              </optgroup>
              <optgroup label="Hortaliças e Raízes">
                <option value="Tomate">Tomate</option>
                <option value="Batata">Batata</option>
                <option value="Cebola">Cebola</option>
                <option value="Alho">Alho</option>
                <option value="Cenoura">Cenoura</option>
                <option value="Mandioca (Macaxeira)">Mandioca (Macaxeira)</option>
                <option value="Batata-doce">Batata-doce</option>
                <option value="Pimentão">Pimentão</option>
                <option value="Alface">Alface</option>
                <option value="Repolho">Repolho</option>
              </optgroup>
              <optgroup label="Pastagens e Forrageiras">
                <option value="Brachiaria">Pastagem (Brachiaria)</option>
                <option value="Panicum">Pastagem (Panicum)</option>
                <option value="Cynodon (Tifton)">Pastagem (Cynodon/Tifton)</option>
                <option value="Alfafa">Alfafa</option>
                <option value="Milho Silagem">Milho (Silagem)</option>
                <option value="Aveia Forrageira">Aveia Forrageira</option>
              </optgroup>
              <optgroup label="Silvicultura e Extração">
                <option value="Eucalipto">Eucalipto</option>
                <option value="Seringueira">Seringueira (Borracha)</option>
                <option value="Pinus">Pinus</option>
                <option value="Mogno Africano">Mogno Africano</option>
                <option value="Teca">Teca</option>
              </optgroup>
              <optgroup label="Outros">
                <option value="Outro">Outra Cultura</option>
              </optgroup>
            </select>
          </div>'''

pattern = re.compile(r'<div class="form-group">\s*<label for="fieldCrop".*?</select>\s*</div>', re.DOTALL)
if pattern.search(content):
    content = pattern.sub(replacement, content)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully patched index.html with massive crop list")
else:
    print("Regex failed to match fieldCrop block.")
