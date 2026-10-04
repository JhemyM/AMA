import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

carbon_section = """
      <!-- SUSTAINABILITY / CARBON CREDITS -->
      <section id="carbon" class="section-content" hidden>
        <header class="section-header">
          <h2>Créditos de Carbono</h2>
          <p>Medição, captura e monetização sustentável</p>
        </header>

        <div class="carbon-dashboard" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          <div class="card" style="background: linear-gradient(135deg, rgba(20,40,30,0.8) 0%, rgba(30,60,45,0.9) 100%); border: 1px solid #8fc9a1; box-shadow: 0 8px 32px rgba(143, 201, 161, 0.1);">
            <div class="card-header">
              <h3>Carbono Capturado (Estimativa)</h3>
            </div>
            <div class="card-body" style="text-align: center;">
              <h2 style="font-size: 3rem; color: #8fc9a1; margin: 1rem 0;">1.240 <span style="font-size: 1.2rem; color: #e0e0e0;">tCO2e</span></h2>
              <p style="color: #a0c0b0;">Equivalente a remover 270 carros das ruas por um ano.</p>
            </div>
          </div>
          
          <div class="card">
            <div class="card-header">
              <h3>Potencial de Receita</h3>
            </div>
            <div class="card-body" style="text-align: center;">
              <h2 style="font-size: 3rem; color: #d4af37; margin: 1rem 0;">R$ 84.320</h2>
              <p>Considerando o preço médio de R$ 68,00 por crédito de carbono certificado.</p>
              <button class="primary-button" style="margin-top: 1rem; width: 100%; background: linear-gradient(135deg, #d4af37 0%, #aa8529 100%); border: none;">Emitir Relatório Verificado</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3>Calculadora de Sequestro de Carbono</h3>
          </div>
          <div class="card-body">
            <form id="carbonForm" style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-end;">
              <div class="form-group" style="flex: 1; min-width: 200px;">
                <label>Área de Preservação (Hectares)</label>
                <input type="number" id="carbonArea" value="50" min="0">
              </div>
              <div class="form-group" style="flex: 1; min-width: 200px;">
                <label>Tipo de Bioma/Manejo</label>
                <select id="carbonBiome" style="width: 100%; padding: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 8px;">
                  <option value="12">Floresta Amazônica Conservada</option>
                  <option value="8">Mata Atlântica</option>
                  <option value="4">Cerrado</option>
                  <option value="6">Integração Lavoura-Pecuária-Floresta (ILPF)</option>
                  <option value="2">Plantio Direto na Palha</option>
                </select>
              </div>
              <button type="button" class="primary-button" id="btnCalculateCarbon" style="margin-bottom: 0.5rem;">Calcular Projeção</button>
            </form>
            <div id="carbonResult" style="margin-top: 1.5rem; padding: 1.5rem; background: rgba(143, 201, 161, 0.1); border-left: 4px solid #8fc9a1; border-radius: 4px; display: none;">
              <h4 style="color: #8fc9a1; margin-bottom: 0.5rem;">Projeção Anual</h4>
              <p id="carbonResultText">Sequestro estimado de X toneladas de CO2e por ano.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- END SECTIONS -->
"""

text = text.replace('      <!-- END SECTIONS -->', carbon_section)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("index.html carbon section injected.")
