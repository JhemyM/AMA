window.AgraEmbrapa = {
  init: function(container) {
    const defaultCatalog = [
      {
        "id": "man-001",
        "title": "Práticas de Conservação do Solo e Água",
        "abstract": "Um guia abrangente sobre as melhores práticas para evitar erosão, melhorar a retenção de água no solo e garantir a sustentabilidade das áreas de plantio a longo prazo.",
        "publicationType": "Manual Técnico",
        "publicationYear": 2023,
        "authors": ["Embrapa Solos"],
        "keywords": ["solo", "água", "conservação", "sustentabilidade"],
        "category": "solo",
        "officialUrl": "https://www.embrapa.br/solos"
      },
      {
        "id": "man-002",
        "title": "Manejo Integrado de Pragas na Cultura da Soja",
        "abstract": "Instruções detalhadas para identificação e controle biológico e químico das principais pragas que afetam as lavouras de soja no Brasil.",
        "publicationType": "Comunicado Técnico",
        "publicationYear": 2024,
        "authors": ["Embrapa Soja"],
        "keywords": ["soja", "pragas", "manejo integrado", "defensivos"],
        "category": "soja",
        "officialUrl": "https://www.embrapa.br/soja"
      },
      {
        "id": "man-003",
        "title": "Irrigação de Precisão: Quando e Quanto Irrigar",
        "abstract": "Metodologias baseadas em sensores de umidade e dados climáticos para otimizar o uso da água nas propriedades rurais, reduzindo custos energéticos.",
        "publicationType": "Documento de Referência",
        "publicationYear": 2025,
        "authors": ["Embrapa Milho e Sorgo", "Embrapa Instrumentação"],
        "keywords": ["irrigação", "tecnologia", "clima", "precisão"],
        "category": "clima",
        "officialUrl": "https://www.embrapa.br/instrumentacao"
      },
      {
        "id": "man-004",
        "title": "Aproveitamento de Resíduos na Adubação",
        "abstract": "Como transformar restos de cultura e resíduos orgânicos da fazenda em compostos ricos em nutrientes para reduzir a dependência de fertilizantes químicos.",
        "publicationType": "Manual Técnico",
        "publicationYear": 2022,
        "authors": ["Embrapa Meio Ambiente"],
        "keywords": ["adubação", "resíduos", "fertilizantes", "orgânico"],
        "category": "solo",
        "officialUrl": "https://www.embrapa.br/meio-ambiente"
      },
      {
        "id": "man-005",
        "title": "Cultivares de Milho Resistentes ao Estresse Hídrico",
        "abstract": "Avaliação de genótipos de milho em condições de déficit hídrico e recomendações para o plantio na safrinha.",
        "publicationType": "Boletim Técnico",
        "publicationYear": 2026,
        "authors": ["Embrapa Milho e Sorgo"],
        "keywords": ["milho", "safrinha", "seca", "genética"],
        "category": "milho",
        "officialUrl": "https://www.embrapa.br/milho"
      }
    ];

    let currentCategory = 'all';
    let showingSaved = false;
    let currentSearch = '';
    
    function getSavedManuals() {
      return JSON.parse(localStorage.getItem('agra_embrapa_saved') || '[]');
    }

    function toggleSaveManual(id) {
      let saved = getSavedManuals();
      if (saved.includes(id)) {
        saved = saved.filter(s => s !== id);
      } else {
        saved.push(id);
      }
      localStorage.setItem('agra_embrapa_saved', JSON.stringify(saved));
    }

    function renderCatalog() {
      const moduleList = container.querySelector('#embrapaModuleList');
      if (!moduleList) return;
      
      moduleList.innerHTML = '';
      const savedIds = getSavedManuals();
      
      const normalizeStr = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const normalizedSearch = normalizeStr(currentSearch);

      const filtered = defaultCatalog.filter(doc => {
        const matchesSearch = normalizeStr(doc.title).includes(normalizedSearch) || 
                              doc.keywords.some(k => normalizeStr(k).includes(normalizedSearch)) ||
                              normalizeStr(doc.abstract).includes(normalizedSearch);
        const matchesCategory = currentCategory === 'all' || doc.category === currentCategory;
        const matchesSaved = !showingSaved || savedIds.includes(doc.id);
        return matchesSearch && matchesCategory && matchesSaved;
      });

      if (filtered.length === 0) {
        moduleList.innerHTML = '<p class="muted" style="grid-column: 1/-1; text-align: center; padding: 2rem;">Nenhum manual encontrado.</p>';
        return;
      }

      filtered.forEach((doc, index) => {
        const isSaved = savedIds.includes(doc.id);
        moduleList.innerHTML += `
          <article class="panel" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'" data-index="${index}">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div class="field-name" style="align-items: flex-start;">
                <span class="field-color accent-blue" style="border-radius: 4px; padding: 4px; display:flex; align-items:center; justify-content:center; color:white;">📚</span>
                <div>
                  <strong style="display: block; line-height: 1.3; margin-bottom: 0.25rem;">${doc.title}</strong>
                  <small class="muted">${doc.publicationType} · ${doc.publicationYear}</small>
                </div>
              </div>
              ${isSaved ? '<span title="Salvo">⭐</span>' : ''}
            </div>
            <p style="font-size: 0.875rem; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; margin-top: auto;">
              ${doc.abstract}
            </p>
          </article>
        `;
      });

      moduleList.querySelectorAll('article').forEach(article => {
        article.addEventListener('click', () => {
          openDialog(filtered[article.dataset.index]);
        });
      });
    }

    let activeDocId = null;

    function openDialog(doc) {
      activeDocId = doc.id;
      const dialog = container.querySelector('#manualDialog');
      container.querySelector('#manualTitle').textContent = doc.title;
      container.querySelector('#manualYear').textContent = doc.publicationYear;
      container.querySelector('#manualAuthors').textContent = doc.authors.join(', ');
      container.querySelector('#manualAbstract').textContent = doc.abstract;
      
      const saveBtn = container.querySelector('#manualSaveBtn');
      const isSaved = getSavedManuals().includes(doc.id);
      saveBtn.textContent = isSaved ? '⭐ Salvo' : '☆ Salvar';
      saveBtn.classList.toggle('active', isSaved);
      
      const kwContainer = container.querySelector('#manualKeywords');
      kwContainer.innerHTML = '';
      doc.keywords.forEach(kw => {
        kwContainer.innerHTML += `<span style="background: var(--surface-hover); padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; color: var(--text);">${kw}</span>`;
      });
      
      dialog?.showModal();
    }

    container.querySelector('#manualSaveBtn')?.addEventListener('click', () => {
      if (!activeDocId) return;
      toggleSaveManual(activeDocId);
      const isSaved = getSavedManuals().includes(activeDocId);
      container.querySelector('#manualSaveBtn').textContent = isSaved ? '⭐ Salvo' : '☆ Salvar';
      showToast(isSaved ? 'Manual salvo offline!' : 'Manual removido dos salvos.');
      renderCatalog();
    });

    container.querySelector('#manualDownloadBtn')?.addEventListener('click', () => {
      showToast('Baixando PDF criptografado para acesso offline...');
      setTimeout(() => {
        showToast('Download concluído com sucesso!');
        container.querySelector('#manualDialog').close();
      }, 1500);
    });

    const searchInput = container.querySelector('#embrapaSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderCatalog();
      });
    }

    const savedBtn = container.querySelector('#embrapaToggleSaved');
    if (savedBtn) {
      savedBtn.addEventListener('click', () => {
        showingSaved = !showingSaved;
        savedBtn.style.background = showingSaved ? 'var(--primary)' : '';
        savedBtn.style.color = showingSaved ? 'var(--primary-fg)' : '';
        renderCatalog();
      });
    }

    const filters = container.querySelectorAll('#embrapaFilters button');
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        renderCatalog();
      });
    });

    renderCatalog();
  }
};
