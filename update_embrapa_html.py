import re

html_content = """
<div class="page-heading" style="margin-bottom: 1.5rem;">
  <div>
    <p class="eyebrow" style="color: var(--green-500); font-weight: bold; font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase;">Trilha do Conhecimento 📚</p>
    <h1 style="font-size: 2rem; margin: 0.5rem 0;">Universidade AGRA</h1>
    <p class="muted">Aprenda, evolua sua fazenda e ganhe pontos lendo os Manuais Oficiais da Embrapa.</p>
  </div>
</div>

<!-- Gamification Banner -->
<div style="background: linear-gradient(135deg, var(--forest), var(--green-800)); border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem; color: white; display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.1);">
  <div style="background: rgba(255,255,255,0.1); border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; font-size: 2rem;">🌱</div>
  <div style="flex: 1; min-width: 200px;">
    <h3 style="margin: 0 0 0.5rem 0;">Nível: Produtor Aprendiz</h3>
    <div style="background: rgba(0,0,0,0.3); height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 0.5rem;">
      <div id="embrapaProgressBar" style="background: var(--green-400); height: 100%; width: 20%; border-radius: 4px; transition: width 0.5s ease;"></div>
    </div>
    <small style="color: rgba(255,255,255,0.7);"><span id="embrapaReadCount">1</span>/5 Manuais lidos para o próximo nível</small>
  </div>
  <button class="primary-button" id="embrapaPrefsBtn" style="background: var(--green-500); border: none; color: white;">🎯 Configurar Trilha</button>
</div>

<!-- Search and Filters (Responsive) -->
<div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
  <div style="display: flex; gap: 0.5rem; width: 100%;">
    <input type="search" id="embrapaSearch" placeholder="Qual desafio você quer resolver hoje?" style="flex: 1; padding: 1rem; border: 2px solid var(--border); border-radius: 12px; background: var(--surface); font-size: 1rem; font-family: 'Outfit', sans-serif;">
    <button class="secondary-button" id="embrapaToggleSaved" style="border-radius: 12px; padding: 0 1.5rem; font-size: 1.2rem;" title="Meus Manuais Salvos">⭐</button>
  </div>
  
  <div class="embrapa-filters" id="embrapaFilters" style="display: flex; gap: 0.75rem; overflow-x: auto; padding-bottom: 0.5rem; scrollbar-width: none; -webkit-overflow-scrolling: touch;">
    <button class="secondary-button active" data-category="all" style="border-radius: 20px; white-space: nowrap;">🌍 Todos</button>
    <button class="secondary-button" data-category="recommended" style="border-radius: 20px; border-color: var(--primary); color: var(--primary); white-space: nowrap;">🎯 Missões Recomendadas</button>
    <button class="secondary-button" data-category="solo" style="border-radius: 20px; white-space: nowrap;">🪨 Solo Vivo</button>
    <button class="secondary-button" data-category="soja" style="border-radius: 20px; white-space: nowrap;">🌾 Grandes Culturas</button>
    <button class="secondary-button" data-category="gado" style="border-radius: 20px; white-space: nowrap;">🐄 Pecuária de Ouro</button>
    <button class="secondary-button" data-category="clima" style="border-radius: 20px; white-space: nowrap;">🌤️ Guardião do Clima</button>
  </div>
</div>

<div class="embrapa-list" id="embrapaModuleList" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
  <!-- Manuals will be dynamically injected here -->
</div>

<dialog class="feedback-dialog" id="manualDialog" aria-labelledby="manualTitle" style="padding: 0; border-radius: 16px; border: 1px solid var(--border); max-width: 600px; overflow: hidden;">
  <form method="dialog" style="display: flex; flex-direction: column; height: 100%; max-height: 85vh;">
    <!-- Dialog Header -->
    <div style="background: var(--surface-hover); padding: 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border);">
      <div>
        <span style="display: inline-block; background: rgba(108, 161, 123, 0.2); color: var(--green-600); padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: bold; margin-bottom: 0.5rem; text-transform: uppercase;">Leitura Rápida · 5 min</span>
        <h2 id="manualTitle" style="line-height: 1.3; font-size: 1.5rem; margin: 0;">Título do Manual</h2>
      </div>
      <button class="dialog-close" value="cancel" type="button" onclick="document.getElementById('manualDialog').close()" aria-label="Fechar" style="background: rgba(0,0,0,0.05); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">×</button>
    </div>
    
    <!-- Dialog Body -->
    <div style="padding: 1.5rem; overflow-y: auto; flex: 1;">
      <p class="muted" style="margin-bottom: 1rem;"><strong id="manualYear">2026</strong> · <span id="manualAuthors">Embrapa</span></p>
      
      <div style="background: rgba(255,200,0,0.1); border-left: 4px solid #ffc107; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
        <strong style="color: #b38600; display: block; margin-bottom: 0.25rem;">Por que ler isso?</strong>
        <span id="manualAbstract" style="line-height: 1.5; color: var(--text);">Resumo do manual...</span>
      </div>

      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;" id="manualKeywords"></div>
      
      <div id="manualFullText" style="line-height: 1.8; color: var(--text); display: none; padding-top: 1rem;"></div>
    </div>
    
    <!-- Dialog Footer -->
    <div class="feedback-actions" style="padding: 1.5rem; background: var(--surface); border-top: 1px solid var(--border); display:flex; justify-content:space-between; gap: 1rem; align-items:center; flex-wrap: wrap;">
      <button class="secondary-button" id="manualSaveBtn" type="button" style="border-radius: 8px;">⭐ Guardar na Mochila</button>
      <button class="primary-button" id="manualReadBtn" type="button" style="border-radius: 8px; flex: 1; text-align: center;">Começar Leitura 📖 <span style="font-size: 0.8rem; opacity: 0.8; margin-left: 0.5rem;">+50 XP</span></button>
    </div>
  </form>
</dialog>

<dialog class="feedback-dialog" id="embrapaPrefsDialog" style="padding: 2rem; border-radius: 16px; border: 1px solid var(--border); max-width: 400px; width: 90%;">
  <form id="embrapaPrefsForm" method="dialog">
    <div class="dialog-heading" style="margin-bottom: 1.5rem; text-align: center;">
      <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">🎯</span>
      <h2 style="line-height: 1.3;">Ajustar sua Trilha</h2>
      <p class="muted">Para te recomendarmos os melhores desafios.</p>
    </div>
    
    <div style="margin-bottom: 2rem; display: flex; flex-direction: column; gap: 1.25rem;">
      <label>
        <span style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Tamanho do seu Reino (Escala)</span>
        <select id="prefScale" style="width: 100%; padding: 1rem; border-radius: 12px; border: 2px solid var(--border); background: var(--surface); color: var(--text); font-family: 'Outfit', sans-serif;">
          <option value="todas">Qualquer Escala</option>
          <option value="pequena">Pequena (Agricultura Familiar)</option>
          <option value="media">Média (Tecnificada)</option>
          <option value="grande">Grande (Agricultura de Precisão)</option>
        </select>
      </label>
      
      <label>
        <span style="display:block; margin-bottom: 0.5rem; font-weight: 500;">O Clima que você enfrenta</span>
        <select id="prefClimate" style="width: 100%; padding: 1rem; border-radius: 12px; border: 2px solid var(--border); background: var(--surface); color: var(--text); font-family: 'Outfit', sans-serif;">
          <option value="todos">Todos</option>
          <option value="cerrado">Cerrado / Seco</option>
          <option value="sul">Temperado / Sul</option>
          <option value="semiarido">Semiárido</option>
        </select>
      </label>
    </div>
    
    <div class="feedback-actions" style="display:flex; flex-direction: column; gap: 0.5rem;">
      <button class="primary-button" type="submit" style="width: 100%; padding: 1rem; border-radius: 12px; font-size: 1.1rem;">Atualizar Minha Trilha 🚀</button>
      <button class="text-button" type="button" onclick="document.getElementById('embrapaPrefsDialog').close()" style="width: 100%; padding: 1rem;">Agora não</button>
    </div>
  </form>
</dialog>
"""

with open('modules/embrapa.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
