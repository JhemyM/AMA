window.AgraEmbrapa = {
  init: function(container) {
    const defaultCatalog = [
      {
        "title": "Práticas de Conservação do Solo e Água",
        "abstract": "Um guia abrangente sobre as melhores práticas para evitar erosão, melhorar a retenção de água no solo e garantir a sustentabilidade das áreas de plantio a longo prazo.",
        "publicationType": "Manual Técnico",
        "publicationYear": 2023,
        "authors": ["Embrapa Solos"],
        "keywords": ["solo", "água", "conservação", "sustentabilidade"],
        "officialUrl": "https://www.embrapa.br/solos"
      },
      {
        "title": "Manejo Integrado de Pragas na Cultura da Soja",
        "abstract": "Instruções detalhadas para identificação e controle biológico e químico das principais pragas que afetam as lavouras de soja no Brasil.",
        "publicationType": "Comunicado Técnico",
        "publicationYear": 2024,
        "authors": ["Embrapa Soja"],
        "keywords": ["soja", "pragas", "manejo integrado", "defensivos"],
        "officialUrl": "https://www.embrapa.br/soja"
      },
      {
        "title": "Irrigação de Precisão: Quando e Quanto Irrigar",
        "abstract": "Metodologias baseadas em sensores de umidade e dados climáticos para otimizar o uso da água nas propriedades rurais, reduzindo custos energéticos.",
        "publicationType": "Documento de Referência",
        "publicationYear": 2025,
        "authors": ["Embrapa Milho e Sorgo", "Embrapa Instrumentação"],
        "keywords": ["irrigação", "tecnologia", "clima", "precisão"],
        "officialUrl": "https://www.embrapa.br/instrumentacao"
      },
      {
        "title": "Aproveitamento de Resíduos na Adubação",
        "abstract": "Como transformar restos de cultura e resíduos orgânicos da fazenda em compostos ricos em nutrientes para reduzir a dependência de fertilizantes químicos.",
        "publicationType": "Manual Técnico",
        "publicationYear": 2022,
        "authors": ["Embrapa Meio Ambiente"],
        "keywords": ["adubação", "resíduos", "fertilizantes", "orgânico"],
        "officialUrl": "https://www.embrapa.br/meio-ambiente"
      }
    ];

    function renderCatalog(filterText = '') {
      const moduleList = container.querySelector('#embrapaModuleList');
      if (!moduleList) return;
      
      moduleList.innerHTML = '';
      
      const filtered = defaultCatalog.filter(doc => 
        doc.title.toLowerCase().includes(filterText.toLowerCase()) || 
        doc.keywords.some(k => k.toLowerCase().includes(filterText.toLowerCase()))
      );

      if (filtered.length === 0) {
        moduleList.innerHTML = '<p class="muted">Nenhum manual encontrado para sua busca.</p>';
        return;
      }

      filtered.forEach((doc, index) => {
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
            </div>
            <p style="font-size: 0.875rem; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; margin-top: auto;">
              ${doc.abstract}
            </p>
          </article>
        `;
      });

      // Add click listeners to open dialog
      moduleList.querySelectorAll('article').forEach(article => {
        article.addEventListener('click', () => {
          const doc = filtered[article.dataset.index];
          openDialog(doc);
        });
      });
    }

    function openDialog(doc) {
      const dialog = container.querySelector('#manualDialog');
      container.querySelector('#manualTitle').textContent = doc.title;
      container.querySelector('#manualYear').textContent = doc.publicationYear;
      container.querySelector('#manualAuthors').textContent = doc.authors.join(', ');
      container.querySelector('#manualAbstract').textContent = doc.abstract;
      container.querySelector('#manualOfficialLink').href = doc.officialUrl;
      
      const kwContainer = container.querySelector('#manualKeywords');
      kwContainer.innerHTML = '';
      doc.keywords.forEach(kw => {
        kwContainer.innerHTML += `<span style="background: var(--surface-hover); padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; color: var(--text);">${kw}</span>`;
      });
      
      dialog?.showModal();
    }

    const searchInput = container.querySelector('#embrapaSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderCatalog(e.target.value);
      });
    }

    renderCatalog();
  }
};
