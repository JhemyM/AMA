window.AgraEmbrapa = {
  init: function(container) {
    const defaultCatalog = [
      {
        "id": "man-001",
        "title": "Práticas de Conservação do Solo e Ãgua",
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
      },
      {
        "id": "man-006",
        "title": "Correção de Acidez do Solo no Cerrado",
        "abstract": "Técnicas de calagem, aplicação de gesso e uso de bioinsumos para melhorar o perfil do solo e otimizar o enraizamento das culturas de grãos.",
        "publicationType": "Manual Técnico",
        "publicationYear": 2021,
        "authors": ["Embrapa Cerrados", "Embrapa Solos"],
        "keywords": ["solo", "calagem", "gesso", "cerrado", "acidez"],
        "category": "solo",
        "officialUrl": "https://www.embrapa.br/cerrados"
      },
      {
        "id": "man-007",
        "title": "Monitoramento de Doenças da Soja via Satélite",
        "abstract": "Uso prático do sensoriamento remoto e índices de vegetação (NDVI, EVI) para detecção precoce de ferrugem asiática e outras anomalias.",
        "publicationType": "Circular Técnica",
        "publicationYear": 2024,
        "authors": ["Embrapa Informática Agropecuária"],
        "keywords": ["soja", "doenças", "satélite", "tecnologia"],
        "category": "soja",
        "officialUrl": "https://www.embrapa.br/agricultura-digital"
      },
      {
        "id": "man-008",
        "title": "Captação e Armazenamento de Ãgua da Chuva na Propriedade",
        "abstract": "Projetos práticos e dimensionamento de cisternas e barragens subterrâneas para mitigar os impactos das secas sazonais.",
        "publicationType": "Cartilha",
        "publicationYear": 2020,
        "authors": ["Embrapa Semiárido"],
        "keywords": ["clima", "água", "chuva", "armazenamento", "seca"],
        "category": "clima",
        "officialUrl": "https://www.embrapa.br/semiarido"
      },
      {
        "id": "man-009",
        "title": "Consórcio Milho-Braquiária (Sistema Santa Fé)",
        "abstract": "Como implementar o consórcio de milho com forrageiras para aumento da produção de palhada e viabilização do plantio direto.",
        "publicationType": "Documentos",
        "publicationYear": 2018,
        "authors": ["Embrapa Arroz e Feijão"],
        "keywords": ["milho", "consórcio", "pastagem", "palhada"],
        "category": "milho",
        "officialUrl": "https://www.embrapa.br/arroz-e-feijao"
      },
      {
        "id": "man-010",
        "title": "Inoculação e Co-inoculação da Soja",
        "abstract": "Benefícios econômicos e ambientais do uso de bactérias fixadoras de nitrogênio (Bradyrhizobium) associadas ao Azospirillum.",
        "publicationType": "Folder Técnico",
        "publicationYear": 2023,
        "authors": ["Embrapa Agrobiologia"],
        "keywords": ["soja", "inoculante", "nitrogênio", "bactérias"],
        "category": "soja",
        "officialUrl": "https://www.embrapa.br/agrobiologia"
      },
      {
        "id": "man-011",
        "title": "Previsão Climática Trimestral e Tomada de Decisão",
        "abstract": "Como interpretar os boletins do El Niño e La Niña para planejar a janela ideal de plantio e a compra antecipada de insumos.",
        "publicationType": "Boletim Informativo",
        "publicationYear": 2025,
        "authors": ["Embrapa Clima Temperado"],
        "keywords": ["clima", "previsão", "el niño", "la niña", "plantio"],
        "category": "clima",
        "officialUrl": "https://www.embrapa.br/clima-temperado"
      },
      {
        "id": "man-012",
        "title": "Rotação de Culturas e Controle de Nematoides",
        "abstract": "As melhores sequências de culturas para diminuir as populações de nematoides formadores de galhas e das lesões radiculares.",
        "publicationType": "Manual",
        "publicationYear": 2022,
        "authors": ["Embrapa Agropecuária Oeste"],
        "keywords": ["solo", "nematoides", "rotação", "sanidade"],
        "category": "solo",
        "officialUrl": "https://www.embrapa.br/agropecuaria-oeste"
      },
      {
        "id": "man-013",
        "title": "Colheita Mecanizada de Milho: Redução de Perdas",
        "abstract": "Ajuste fino de colhedoras, controle de umidade do grão e velocidade ideal de operação para maximizar a rentabilidade da colheita.",
        "publicationType": "Documento Técnico",
        "publicationYear": 2019,
        "authors": ["Embrapa Milho e Sorgo"],
        "keywords": ["milho", "colheita", "maquinário", "perdas"],
        "category": "milho",
        "officialUrl": "https://www.embrapa.br/milho"
      },
      {
        "id": "man-014",
        "title": "Adubação Foliar na Cultura da Soja",
        "abstract": "Recomendações técnicas sobre a viabilidade, doses e momentos exatos de aplicação de micronutrientes como Cobalto e Molibdênio via folha.",
        "publicationType": "Artigo Técnico",
        "publicationYear": 2021,
        "authors": ["Embrapa Soja"],
        "keywords": ["soja", "adubação foliar", "nutrição", "micronutrientes"],
        "category": "soja",
        "officialUrl": "https://www.embrapa.br/soja"
      },
      {
        "id": "man-015",
        "title": "Mapeamento da Variabilidade Espacial do Solo",
        "abstract": "Uso de amostragem em grade e condutividade elétrica aparente para criação de mapas de aplicação de corretivos em taxa variável.",
        "publicationType": "Manual Técnico",
        "publicationYear": 2023,
        "authors": ["Embrapa Instrumentação", "Embrapa Solos"],
        "keywords": ["solo", "precisão", "mapeamento", "taxa variável"],
        "category": "solo",
        "officialUrl": "https://www.embrapa.br/instrumentacao"
      },
      {
        "id": "man-016",
        "title": "Evapotranspiração: Cálculo Baseado no Clima",
        "abstract": "Modelos simplificados para calcular o consumo diário de água da lavoura utilizando os dados básicos da estação meteorológica.",
        "publicationType": "Comunicado Técnico",
        "publicationYear": 2017,
        "authors": ["Embrapa Agricultura Digital"],
        "keywords": ["clima", "água", "evapotranspiração", "cálculo"],
        "category": "clima",
        "officialUrl": "https://www.embrapa.br/agricultura-digital"
      },
      {
        "id": "man-017",
        "title": "Cultivo do Algodão: Boas Práticas",
        "abstract": "Manejo nutricional e fitossanitário do algodoeiro no cerrado.",
        "publicationType": "Manual Técnico",
        "publicationYear": 2023,
        "authors": ["Embrapa Algodão"],
        "keywords": ["algodão", "cerrado", "manejo"],
        "category": "algodão",
        "officialUrl": "https://www.embrapa.br/algodao"
      },
      {
        "id": "man-018",
        "title": "Doenças do Feijoeiro",
        "abstract": "Guia de identificação e controle das principais doenças do feijão comum.",
        "publicationType": "Comunicado Técnico",
        "publicationYear": 2022,
        "authors": ["Embrapa Arroz e Feijão"],
        "keywords": ["feijão", "doenças", "controle"],
        "category": "feijão",
        "officialUrl": "https://www.embrapa.br/arroz-e-feijao"
      },
      {
        "id": "man-019",
        "title": "Cana-de-Açúcar: Eficiência Energética",
        "abstract": "Como melhorar a produtividade da cana-de-açúcar visando sustentabilidade.",
        "publicationType": "Documento",
        "publicationYear": 2024,
        "authors": ["Embrapa Agroenergia"],
        "keywords": ["cana", "energia", "produtividade"],
        "category": "cana",
        "officialUrl": "https://www.embrapa.br/agroenergia"
      },
      {
        "id": "man-020",
        "title": "Manejo de Pastagens Intensivas",
        "abstract": "Estratégias de pastejo rotacionado e adubação para pecuária de corte e leite.",
        "publicationType": "Manual Técnico",
        "publicationYear": 2023,
        "authors": ["Embrapa Gado de Corte"],
        "keywords": ["pastagem", "gado", "rotação"],
        "category": "pastagem",
        "officialUrl": "https://www.embrapa.br/gado-de-corte"
      },
      {
        "id": "man-021",
        "title": "Piscicultura: Manejo da Ãgua e Alimentação",
        "abstract": "Guias práticos para manutenção de viveiros, parâmetros de água e nutrição de peixes.",
        "publicationType": "Guia Prático",
        "publicationYear": 2021,
        "authors": ["Embrapa Pesca e Aquicultura"],
        "keywords": ["peixes", "água", "piscicultura", "aquicultura"],
        "category": "piscicultura",
        "officialUrl": "https://www.embrapa.br/pesca-e-aquicultura"
      },
      {
        "id": "man-022",
        "title": "Sanidade Bovina: Gado de Corte e Leite",
        "abstract": "Protocolos sanitários e de vacinação para prevenir doenças em bovinos de corte e de leite.",
        "publicationType": "Comunicado Técnico",
        "publicationYear": 2022,
        "authors": ["Embrapa Gado de Corte", "Embrapa Gado de Leite"],
        "keywords": ["gado", "bovinos", "leite", "corte", "sanidade"],
        "category": "gado",
        "officialUrl": "https://www.embrapa.br/gado-de-corte"
      },
      {
        "id": "man-023",
        "title": "Avicultura Caipira: Instalações e Biosseguridade",
        "abstract": "Estruturas, manejo de ambiência e prevenção de doenças para galinhas poedeiras e frangos de corte.",
        "publicationType": "Manual",
        "publicationYear": 2020,
        "authors": ["Embrapa Suínos e Aves"],
        "keywords": ["aves", "frango", "galinha", "biosseguridade"],
        "category": "aves",
        "officialUrl": "https://www.embrapa.br/suinos-e-aves"
      },
      {
        "id": "man-024",
        "title": "Suinocultura: Manejo de Dejetos e Sustentabilidade",
        "abstract": "Práticas para o uso de dejetos suínos como biofertilizantes e biogás na propriedade.",
        "publicationType": "Boletim Técnico",
        "publicationYear": 2023,
        "authors": ["Embrapa Suínos e Aves"],
        "keywords": ["suínos", "dejetos", "porcos", "biogás"],
        "category": "suínos",
        "officialUrl": "https://www.embrapa.br/suinos-e-aves"
      }
    ];

    let currentCategory = 'all';
    let showingSaved = false;
    let currentSearch = '';
    
    function getSavedManuals() {
      let saved = JSON.parse(localStorage.getItem('agra_embrapa_saved') || '[]');
      return Array.isArray(saved) ? saved : [];
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

    
    // XP Gamification
    let xp = parseInt(localStorage.getItem('agra_embrapa_xp') || '0');
    let readManuals = JSON.parse(localStorage.getItem('agra_embrapa_read') || '[]');
    if (!Array.isArray(readManuals)) readManuals = [];
    
    function updateLevelBanner() {
      const readCount = readManuals.length;
      const totalNeeded = 5;
      const progress = Math.min((readCount / totalNeeded) * 100, 100); // Wait, typo totalNeeded
      
      const countEl = container.querySelector('#embrapaReadCount');
      if (countEl) countEl.textContent = readCount;
      
      const barEl = container.querySelector('#embrapaProgressBar');
      if (barEl) barEl.style.width = Math.min((readCount / totalNeeded) * 100, 100) + '%';
      
      const titleEl = Array.from(container.querySelectorAll('h3')).find(el => el.textContent.includes('Nível'));
      if (titleEl) {
        if (readCount >= 15) titleEl.textContent = 'Nível: Especialista Supremo ðŸ†';
        else if (readCount >= 10) titleEl.textContent = 'Nível: Produtor Avançado â­';
        else if (readCount >= 5) titleEl.textContent = 'Nível: Estudante Focado 📚';
        else titleEl.textContent = 'Nível: Produtor Aprendiz 🌱';
      }
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
                              
        const livestockCategories = ['gado', 'aves', 'suínos', 'piscicultura', 'pastagem'];
        let matchesCategory = currentCategory === 'all' || doc.category === currentCategory ||
          (currentCategory === 'gado' && livestockCategories.includes(doc.category)) ||
          (currentCategory === 'soja' && (doc.category === 'soja' || doc.category === 'milho'));
        
        // On-Demand Logic
        if (currentCategory === 'recommended') {
          let propData = JSON.parse(localStorage.getItem('agra_property_data') || '{"fields":[]}');
          if (!propData || !Array.isArray(propData.fields)) propData = { fields: [] };
          const plantedCrops = propData.fields.map(f => normalizeStr(f.crop || ''));
          let prefs = JSON.parse(localStorage.getItem('agra_embrapa_prefs') || '{"scale":"todas","climate":"todos"}');
          if (!prefs) prefs = { scale: "todas", climate: "todos" };
          
          let matchesCrop = false;
          let matchesClimate = false;
          
          if (plantedCrops.length > 0) {
            matchesCrop = plantedCrops.some(crop => 
              normalizeStr(doc.title).includes(crop) || 
              doc.keywords.some(k => normalizeStr(k).includes(crop)) || 
              doc.category === crop
            );
          }
          
          if (prefs.climate !== 'todos') {
            matchesClimate = doc.keywords.some(k => normalizeStr(k).includes(prefs.climate)) || doc.category === prefs.climate;
          }
          
          // Show if it matches planted crops OR user's specific climate preference
          matchesCategory = matchesCrop || (prefs.climate !== 'todos' && matchesClimate);
          
          // If no fields and no prefs, just show everything as fallback or show none
          if (plantedCrops.length === 0 && prefs.climate === 'todos') {
            matchesCategory = true;
          }
        }

        const matchesSaved = !showingSaved || savedIds.includes(doc.id);
        return matchesSearch && matchesCategory && matchesSaved;
      });

      if (filtered.length === 0) {
        moduleList.innerHTML = '<p class="muted" style="grid-column: 1/-1; text-align: center; padding: 2rem;">Nenhum manual encontrado.</p>';
        return;
      }

      filtered.forEach((doc, index) => {
        const isSaved = savedIds.includes(doc.id);
        
        // Define color based on category
        let badgeColor = 'var(--blue)';
        let badgeBg = 'rgba(44, 114, 133, 0.15)';
        if(doc.category === 'soja' || doc.category === 'milho') { badgeColor = 'var(--amber)'; badgeBg = 'rgba(204, 160, 82, 0.15)'; }
        if(doc.category === 'gado' || doc.category === 'pastagem') { badgeColor = 'var(--orange)'; badgeBg = 'rgba(206, 111, 78, 0.15)'; }
        if(doc.category === 'solo' || doc.category === 'clima') { badgeColor = 'var(--forest-2)'; badgeBg = 'rgba(30, 65, 45, 0.15)'; }
        
        // Tags
        const tags = doc.keywords.slice(0, 2).map(k => `<span style="font-size: 0.65rem; background: var(--surface-hover); color: var(--muted); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--line);">${k}</span>`).join('');
        
        moduleList.innerHTML += `
          <article class="panel" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; position: relative; overflow: hidden;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 32px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='none'; this.style.boxShadow=''" data-id="${doc.id}" data-index="${index}">
            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: ${badgeColor};"></div>
            
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="width: 40px; height: 40px; border-radius: 8px; background: ${badgeBg}; color: ${badgeColor}; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
                  📚
                </div>
                <div>
                  <strong style="display: block; line-height: 1.3; margin-bottom: 0.25rem; font-size: 1.05rem; color: var(--text);">${doc.title}</strong>
                  <small class="muted" style="display: block; margin-bottom: 0.5rem;">${doc.publicationType} · ${doc.publicationYear}</small>
                  <div style="display: flex; gap: 0.25rem; flex-wrap: wrap;">${tags}</div>
                </div>
              </div>
              ${isSaved ? '<div style="background: rgba(255,193,7,0.15); color: #ffc107; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;" title="Salvo">⭐</div>' : ''}
            </div>
            
            <p style="font-size: 0.875rem; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; margin-top: auto; padding-top: 0.5rem; border-top: 1px dashed var(--line);">
              ${doc.abstract}
            </p>
            
            <div style="display: flex; justify-content: flex-end; margin-top: 0.5rem;">
              <span style="color: var(--blue); font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px;">Ler Manual →</span>
            </div>
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
      
      const fullTextContainer = container.querySelector('#manualFullText');
      if (fullTextContainer) fullTextContainer.style.display = 'none';
      const readBtn = container.querySelector('#manualReadBtn');
      if (readBtn) readBtn.style.display = 'inline-flex';
      
      const saveBtn = container.querySelector('#manualSaveBtn');
      const isSaved = getSavedManuals().includes(doc.id);
      saveBtn.textContent = isSaved ? 'â­ Salvo' : '☆ Salvar';
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
      container.querySelector('#manualSaveBtn').textContent = isSaved ? 'â­ Salvo' : '☆ Salvar';
      showToast(isSaved ? 'Manual salvo offline!' : 'Manual removido dos salvos.');
      renderCatalog();
    });

    container.querySelector('#manualReadBtn')?.addEventListener('click', () => {
      if (!activeDocId) return;
      if (!readManuals.includes(activeDocId)) {
        readManuals.push(activeDocId);
        xp += 50;
        localStorage.setItem('agra_embrapa_read', JSON.stringify(readManuals));
        localStorage.setItem('agra_embrapa_xp', xp);
        showToast('🎉 +50 XP! Leitura Iniciada.');
        updateLevelBanner();
      }

      if (!activeDocId) return;
      const doc = defaultCatalog.find(d => d.id === activeDocId);
      const fullTextContainer = container.querySelector('#manualFullText');
      const readBtn = container.querySelector('#manualReadBtn');
      
      if (fullTextContainer && doc) {
        // Generate mock full content for beta
        let mockContent = `
          <h3 style="margin-bottom: 1rem; color: var(--text);">Introdução</h3>
          <p style="margin-bottom: 1rem;">Esta publicação aborda os principais aspectos relacionados a <strong>${doc.title}</strong>, um tema vital para o aumento da eficiência no campo. A pesquisa desenvolvida pela ${doc.authors.join(', ')} visa trazer as melhores práticas validadas na região de testes para a sua propriedade.</p>
          
          <h3 style="margin-bottom: 1rem; margin-top: 1.5rem; color: var(--text);">Metodologia e Aplicação Prática</h3>
          <p style="margin-bottom: 1rem;">Recomenda-se iniciar o processo através de uma avaliação prévia das condições atuais da lavoura. As práticas apresentadas devem ser inseridas de maneira gradativa, respeitando as condições climáticas locais.</p>
          
          <div style="background: var(--surface); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--primary); margin: 1.5rem 0;">
            <strong>Dica Técnica:</strong> Sempre mantenha o registro atualizado no módulo de Atividades do AGRA para cruzar os resultados destas recomendações com a sua produtividade final.
          </div>
          
          <h3 style="margin-bottom: 1rem; margin-top: 1.5rem; color: var(--text);">Resultados Esperados</h3>
          <p style="margin-bottom: 1rem;">A adoção destas práticas tem demonstrado um aumento de até 15% na retenção de recursos na propriedade, ao mesmo tempo que reduz o impacto das variações ambientais nas últimas safras de testes.</p>
        `;
        
        fullTextContainer.innerHTML = doc.content || mockContent;
        fullTextContainer.style.display = 'block';
        if (readBtn) readBtn.style.display = 'none';
        showToast('Artigo carregado offline.');
      }
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

    const prefsBtn = container.querySelector('#embrapaPrefsBtn');
    const prefsDialog = container.querySelector('#embrapaPrefsDialog');
    const prefsForm = container.querySelector('#embrapaPrefsForm');

    if (prefsBtn && prefsDialog) {
      prefsBtn.addEventListener('click', () => {
        let prefs = JSON.parse(localStorage.getItem('agra_embrapa_prefs') || '{"scale":"todas","climate":"todos"}');
        if (!prefs) prefs = { scale: "todas", climate: "todos" };
        container.querySelector('#prefScale').value = prefs.scale || "todas";
        container.querySelector('#prefClimate').value = prefs.climate || "todos";
        prefsDialog.showModal();
      });

      prefsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const prefs = {
          scale: container.querySelector('#prefScale').value,
          climate: container.querySelector('#prefClimate').value
        };
        localStorage.setItem('agra_embrapa_prefs', JSON.stringify(prefs));
        prefsDialog.close();
        
        // Auto-switch to recommended tab
        const recBtn = container.querySelector('[data-category="recommended"]');
        if (recBtn) recBtn.click();
        
        showToast('Filtros Inteligentes aplicados!');
      });
    }

    updateLevelBanner();
    renderCatalog();
  }
};

