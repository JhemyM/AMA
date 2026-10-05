window.AgraEmbrapa = {
  init: function(container) {
    const defaultCatalog = [
      {
        "id": "man-001",
        "title": "PrÃ¡ticas de ConservaÃ§Ã£o do Solo e Ãgua",
        "abstract": "Um guia abrangente sobre as melhores prÃ¡ticas para evitar erosÃ£o, melhorar a retenÃ§Ã£o de Ã¡gua no solo e garantir a sustentabilidade das Ã¡reas de plantio a longo prazo.",
        "publicationType": "Manual TÃ©cnico",
        "publicationYear": 2023,
        "authors": ["Embrapa Solos"],
        "keywords": ["solo", "Ã¡gua", "conservaÃ§Ã£o", "sustentabilidade"],
        "category": "solo",
        "officialUrl": "https://www.embrapa.br/solos"
      },
      {
        "id": "man-002",
        "title": "Manejo Integrado de Pragas na Cultura da Soja",
        "abstract": "InstruÃ§Ãµes detalhadas para identificaÃ§Ã£o e controle biolÃ³gico e quÃ­mico das principais pragas que afetam as lavouras de soja no Brasil.",
        "publicationType": "Comunicado TÃ©cnico",
        "publicationYear": 2024,
        "authors": ["Embrapa Soja"],
        "keywords": ["soja", "pragas", "manejo integrado", "defensivos"],
        "category": "soja",
        "officialUrl": "https://www.embrapa.br/soja"
      },
      {
        "id": "man-003",
        "title": "IrrigaÃ§Ã£o de PrecisÃ£o: Quando e Quanto Irrigar",
        "abstract": "Metodologias baseadas em sensores de umidade e dados climÃ¡ticos para otimizar o uso da Ã¡gua nas propriedades rurais, reduzindo custos energÃ©ticos.",
        "publicationType": "Documento de ReferÃªncia",
        "publicationYear": 2025,
        "authors": ["Embrapa Milho e Sorgo", "Embrapa InstrumentaÃ§Ã£o"],
        "keywords": ["irrigaÃ§Ã£o", "tecnologia", "clima", "precisÃ£o"],
        "category": "clima",
        "officialUrl": "https://www.embrapa.br/instrumentacao"
      },
      {
        "id": "man-004",
        "title": "Aproveitamento de ResÃ­duos na AdubaÃ§Ã£o",
        "abstract": "Como transformar restos de cultura e resÃ­duos orgÃ¢nicos da fazenda em compostos ricos em nutrientes para reduzir a dependÃªncia de fertilizantes quÃ­micos.",
        "publicationType": "Manual TÃ©cnico",
        "publicationYear": 2022,
        "authors": ["Embrapa Meio Ambiente"],
        "keywords": ["adubaÃ§Ã£o", "resÃ­duos", "fertilizantes", "orgÃ¢nico"],
        "category": "solo",
        "officialUrl": "https://www.embrapa.br/meio-ambiente"
      },
      {
        "id": "man-005",
        "title": "Cultivares de Milho Resistentes ao Estresse HÃ­drico",
        "abstract": "AvaliaÃ§Ã£o de genÃ³tipos de milho em condiÃ§Ãµes de dÃ©ficit hÃ­drico e recomendaÃ§Ãµes para o plantio na safrinha.",
        "publicationType": "Boletim TÃ©cnico",
        "publicationYear": 2026,
        "authors": ["Embrapa Milho e Sorgo"],
        "keywords": ["milho", "safrinha", "seca", "genÃ©tica"],
        "category": "milho",
        "officialUrl": "https://www.embrapa.br/milho"
      },
      {
        "id": "man-006",
        "title": "CorreÃ§Ã£o de Acidez do Solo no Cerrado",
        "abstract": "TÃ©cnicas de calagem, aplicaÃ§Ã£o de gesso e uso de bioinsumos para melhorar o perfil do solo e otimizar o enraizamento das culturas de grÃ£os.",
        "publicationType": "Manual TÃ©cnico",
        "publicationYear": 2021,
        "authors": ["Embrapa Cerrados", "Embrapa Solos"],
        "keywords": ["solo", "calagem", "gesso", "cerrado", "acidez"],
        "category": "solo",
        "officialUrl": "https://www.embrapa.br/cerrados"
      },
      {
        "id": "man-007",
        "title": "Monitoramento de DoenÃ§as da Soja via SatÃ©lite",
        "abstract": "Uso prÃ¡tico do sensoriamento remoto e Ã­ndices de vegetaÃ§Ã£o (NDVI, EVI) para detecÃ§Ã£o precoce de ferrugem asiÃ¡tica e outras anomalias.",
        "publicationType": "Circular TÃ©cnica",
        "publicationYear": 2024,
        "authors": ["Embrapa InformÃ¡tica AgropecuÃ¡ria"],
        "keywords": ["soja", "doenÃ§as", "satÃ©lite", "tecnologia"],
        "category": "soja",
        "officialUrl": "https://www.embrapa.br/agricultura-digital"
      },
      {
        "id": "man-008",
        "title": "CaptaÃ§Ã£o e Armazenamento de Ãgua da Chuva na Propriedade",
        "abstract": "Projetos prÃ¡ticos e dimensionamento de cisternas e barragens subterrÃ¢neas para mitigar os impactos das secas sazonais.",
        "publicationType": "Cartilha",
        "publicationYear": 2020,
        "authors": ["Embrapa SemiÃ¡rido"],
        "keywords": ["clima", "Ã¡gua", "chuva", "armazenamento", "seca"],
        "category": "clima",
        "officialUrl": "https://www.embrapa.br/semiarido"
      },
      {
        "id": "man-009",
        "title": "ConsÃ³rcio Milho-BraquiÃ¡ria (Sistema Santa FÃ©)",
        "abstract": "Como implementar o consÃ³rcio de milho com forrageiras para aumento da produÃ§Ã£o de palhada e viabilizaÃ§Ã£o do plantio direto.",
        "publicationType": "Documentos",
        "publicationYear": 2018,
        "authors": ["Embrapa Arroz e FeijÃ£o"],
        "keywords": ["milho", "consÃ³rcio", "pastagem", "palhada"],
        "category": "milho",
        "officialUrl": "https://www.embrapa.br/arroz-e-feijao"
      },
      {
        "id": "man-010",
        "title": "InoculaÃ§Ã£o e Co-inoculaÃ§Ã£o da Soja",
        "abstract": "BenefÃ­cios econÃ´micos e ambientais do uso de bactÃ©rias fixadoras de nitrogÃªnio (Bradyrhizobium) associadas ao Azospirillum.",
        "publicationType": "Folder TÃ©cnico",
        "publicationYear": 2023,
        "authors": ["Embrapa Agrobiologia"],
        "keywords": ["soja", "inoculante", "nitrogÃªnio", "bactÃ©rias"],
        "category": "soja",
        "officialUrl": "https://www.embrapa.br/agrobiologia"
      },
      {
        "id": "man-011",
        "title": "PrevisÃ£o ClimÃ¡tica Trimestral e Tomada de DecisÃ£o",
        "abstract": "Como interpretar os boletins do El NiÃ±o e La NiÃ±a para planejar a janela ideal de plantio e a compra antecipada de insumos.",
        "publicationType": "Boletim Informativo",
        "publicationYear": 2025,
        "authors": ["Embrapa Clima Temperado"],
        "keywords": ["clima", "previsÃ£o", "el niÃ±o", "la niÃ±a", "plantio"],
        "category": "clima",
        "officialUrl": "https://www.embrapa.br/clima-temperado"
      },
      {
        "id": "man-012",
        "title": "RotaÃ§Ã£o de Culturas e Controle de Nematoides",
        "abstract": "As melhores sequÃªncias de culturas para diminuir as populaÃ§Ãµes de nematoides formadores de galhas e das lesÃµes radiculares.",
        "publicationType": "Manual",
        "publicationYear": 2022,
        "authors": ["Embrapa AgropecuÃ¡ria Oeste"],
        "keywords": ["solo", "nematoides", "rotaÃ§Ã£o", "sanidade"],
        "category": "solo",
        "officialUrl": "https://www.embrapa.br/agropecuaria-oeste"
      },
      {
        "id": "man-013",
        "title": "Colheita Mecanizada de Milho: ReduÃ§Ã£o de Perdas",
        "abstract": "Ajuste fino de colhedoras, controle de umidade do grÃ£o e velocidade ideal de operaÃ§Ã£o para maximizar a rentabilidade da colheita.",
        "publicationType": "Documento TÃ©cnico",
        "publicationYear": 2019,
        "authors": ["Embrapa Milho e Sorgo"],
        "keywords": ["milho", "colheita", "maquinÃ¡rio", "perdas"],
        "category": "milho",
        "officialUrl": "https://www.embrapa.br/milho"
      },
      {
        "id": "man-014",
        "title": "AdubaÃ§Ã£o Foliar na Cultura da Soja",
        "abstract": "RecomendaÃ§Ãµes tÃ©cnicas sobre a viabilidade, doses e momentos exatos de aplicaÃ§Ã£o de micronutrientes como Cobalto e MolibdÃªnio via folha.",
        "publicationType": "Artigo TÃ©cnico",
        "publicationYear": 2021,
        "authors": ["Embrapa Soja"],
        "keywords": ["soja", "adubaÃ§Ã£o foliar", "nutriÃ§Ã£o", "micronutrientes"],
        "category": "soja",
        "officialUrl": "https://www.embrapa.br/soja"
      },
      {
        "id": "man-015",
        "title": "Mapeamento da Variabilidade Espacial do Solo",
        "abstract": "Uso de amostragem em grade e condutividade elÃ©trica aparente para criaÃ§Ã£o de mapas de aplicaÃ§Ã£o de corretivos em taxa variÃ¡vel.",
        "publicationType": "Manual TÃ©cnico",
        "publicationYear": 2023,
        "authors": ["Embrapa InstrumentaÃ§Ã£o", "Embrapa Solos"],
        "keywords": ["solo", "precisÃ£o", "mapeamento", "taxa variÃ¡vel"],
        "category": "solo",
        "officialUrl": "https://www.embrapa.br/instrumentacao"
      },
      {
        "id": "man-016",
        "title": "EvapotranspiraÃ§Ã£o: CÃ¡lculo Baseado no Clima",
        "abstract": "Modelos simplificados para calcular o consumo diÃ¡rio de Ã¡gua da lavoura utilizando os dados bÃ¡sicos da estaÃ§Ã£o meteorolÃ³gica.",
        "publicationType": "Comunicado TÃ©cnico",
        "publicationYear": 2017,
        "authors": ["Embrapa Agricultura Digital"],
        "keywords": ["clima", "Ã¡gua", "evapotranspiraÃ§Ã£o", "cÃ¡lculo"],
        "category": "clima",
        "officialUrl": "https://www.embrapa.br/agricultura-digital"
      },
      {
        "id": "man-017",
        "title": "Cultivo do AlgodÃ£o: Boas PrÃ¡ticas",
        "abstract": "Manejo nutricional e fitossanitÃ¡rio do algodoeiro no cerrado.",
        "publicationType": "Manual TÃ©cnico",
        "publicationYear": 2023,
        "authors": ["Embrapa AlgodÃ£o"],
        "keywords": ["algodÃ£o", "cerrado", "manejo"],
        "category": "algodÃ£o",
        "officialUrl": "https://www.embrapa.br/algodao"
      },
      {
        "id": "man-018",
        "title": "DoenÃ§as do Feijoeiro",
        "abstract": "Guia de identificaÃ§Ã£o e controle das principais doenÃ§as do feijÃ£o comum.",
        "publicationType": "Comunicado TÃ©cnico",
        "publicationYear": 2022,
        "authors": ["Embrapa Arroz e FeijÃ£o"],
        "keywords": ["feijÃ£o", "doenÃ§as", "controle"],
        "category": "feijÃ£o",
        "officialUrl": "https://www.embrapa.br/arroz-e-feijao"
      },
      {
        "id": "man-019",
        "title": "Cana-de-AÃ§Ãºcar: EficiÃªncia EnergÃ©tica",
        "abstract": "Como melhorar a produtividade da cana-de-aÃ§Ãºcar visando sustentabilidade.",
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
        "abstract": "EstratÃ©gias de pastejo rotacionado e adubaÃ§Ã£o para pecuÃ¡ria de corte e leite.",
        "publicationType": "Manual TÃ©cnico",
        "publicationYear": 2023,
        "authors": ["Embrapa Gado de Corte"],
        "keywords": ["pastagem", "gado", "rotaÃ§Ã£o"],
        "category": "pastagem",
        "officialUrl": "https://www.embrapa.br/gado-de-corte"
      },
      {
        "id": "man-021",
        "title": "Piscicultura: Manejo da Ãgua e AlimentaÃ§Ã£o",
        "abstract": "Guias prÃ¡ticos para manutenÃ§Ã£o de viveiros, parÃ¢metros de Ã¡gua e nutriÃ§Ã£o de peixes.",
        "publicationType": "Guia PrÃ¡tico",
        "publicationYear": 2021,
        "authors": ["Embrapa Pesca e Aquicultura"],
        "keywords": ["peixes", "Ã¡gua", "piscicultura", "aquicultura"],
        "category": "piscicultura",
        "officialUrl": "https://www.embrapa.br/pesca-e-aquicultura"
      },
      {
        "id": "man-022",
        "title": "Sanidade Bovina: Gado de Corte e Leite",
        "abstract": "Protocolos sanitÃ¡rios e de vacinaÃ§Ã£o para prevenir doenÃ§as em bovinos de corte e de leite.",
        "publicationType": "Comunicado TÃ©cnico",
        "publicationYear": 2022,
        "authors": ["Embrapa Gado de Corte", "Embrapa Gado de Leite"],
        "keywords": ["gado", "bovinos", "leite", "corte", "sanidade"],
        "category": "gado",
        "officialUrl": "https://www.embrapa.br/gado-de-corte"
      },
      {
        "id": "man-023",
        "title": "Avicultura Caipira: InstalaÃ§Ãµes e Biosseguridade",
        "abstract": "Estruturas, manejo de ambiÃªncia e prevenÃ§Ã£o de doenÃ§as para galinhas poedeiras e frangos de corte.",
        "publicationType": "Manual",
        "publicationYear": 2020,
        "authors": ["Embrapa SuÃ­nos e Aves"],
        "keywords": ["aves", "frango", "galinha", "biosseguridade"],
        "category": "aves",
        "officialUrl": "https://www.embrapa.br/suinos-e-aves"
      },
      {
        "id": "man-024",
        "title": "Suinocultura: Manejo de Dejetos e Sustentabilidade",
        "abstract": "PrÃ¡ticas para o uso de dejetos suÃ­nos como biofertilizantes e biogÃ¡s na propriedade.",
        "publicationType": "Boletim TÃ©cnico",
        "publicationYear": 2023,
        "authors": ["Embrapa SuÃ­nos e Aves"],
        "keywords": ["suÃ­nos", "dejetos", "porcos", "biogÃ¡s"],
        "category": "suÃ­nos",
        "officialUrl": "https://www.embrapa.br/suinos-e-aves"
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

    
    // XP Gamification
    let xp = parseInt(localStorage.getItem('agra_embrapa_xp') || '0');
    let readManuals = JSON.parse(localStorage.getItem('agra_embrapa_read') || '[]');
    
    function updateLevelBanner() {
      const readCount = readManuals.length;
      const totalNeeded = 5;
      const progress = Math.min((readCount / totalNeeded) * 100, 100); // Wait, typo totalNeeded
      
      const countEl = container.querySelector('#embrapaReadCount');
      if (countEl) countEl.textContent = readCount;
      
      const barEl = container.querySelector('#embrapaProgressBar');
      if (barEl) barEl.style.width = Math.min((readCount / totalNeeded) * 100, 100) + '%';
      
      const titleEl = Array.from(container.querySelectorAll('h3')).find(el => el.textContent.includes('NÃ­vel'));
      if (titleEl) {
        if (readCount >= 15) titleEl.textContent = 'NÃ­vel: Especialista Supremo ðŸ†';
        else if (readCount >= 10) titleEl.textContent = 'NÃ­vel: Produtor AvanÃ§ado â­';
        else if (readCount >= 5) titleEl.textContent = 'NÃ­vel: Estudante Focado ðŸ“š';
        else titleEl.textContent = 'NÃ­vel: Produtor Aprendiz ðŸŒ±';
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
                              
        const livestockCategories = ['gado', 'aves', 'suÃ­nos', 'piscicultura', 'pastagem'];
        let matchesCategory = currentCategory === 'all' || doc.category === currentCategory ||
          (currentCategory === 'gado' && livestockCategories.includes(doc.category)) ||
          (currentCategory === 'soja' && (doc.category === 'soja' || doc.category === 'milho'));
        
        // On-Demand Logic
        if (currentCategory === 'recommended') {
          const propData = JSON.parse(localStorage.getItem('agra_property_data') || '{"fields":[]}');
          const plantedCrops = propData.fields.map(f => normalizeStr(f.crop));
          const prefs = JSON.parse(localStorage.getItem('agra_embrapa_prefs') || '{"scale":"todas","climate":"todos"}');
          
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
        moduleList.innerHTML += `
          <article class="panel" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'" data-index="${index}">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div class="field-name" style="align-items: flex-start;">
                <span class="field-color accent-blue" style="border-radius: 4px; padding: 4px; display:flex; align-items:center; justify-content:center; color:white;">ðŸ“š</span>
                <div>
                  <strong style="display: block; line-height: 1.3; margin-bottom: 0.25rem;">${doc.title}</strong>
                  <small class="muted">${doc.publicationType} Â· ${doc.publicationYear}</small>
                </div>
              </div>
              ${isSaved ? '<span title="Salvo">â­</span>' : ''}
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
      
      const fullTextContainer = container.querySelector('#manualFullText');
      if (fullTextContainer) fullTextContainer.style.display = 'none';
      const readBtn = container.querySelector('#manualReadBtn');
      if (readBtn) readBtn.style.display = 'inline-flex';
      
      const saveBtn = container.querySelector('#manualSaveBtn');
      const isSaved = getSavedManuals().includes(doc.id);
      saveBtn.textContent = isSaved ? 'â­ Salvo' : 'â˜† Salvar';
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
      container.querySelector('#manualSaveBtn').textContent = isSaved ? 'â­ Salvo' : 'â˜† Salvar';
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
        showToast('ðŸŽ‰ +50 XP! Leitura Iniciada.');
        updateLevelBanner();
      }

      if (!activeDocId) return;
      const doc = defaultCatalog.find(d => d.id === activeDocId);
      const fullTextContainer = container.querySelector('#manualFullText');
      const readBtn = container.querySelector('#manualReadBtn');
      
      if (fullTextContainer && doc) {
        // Generate mock full content for beta
        let mockContent = `
          <h3 style="margin-bottom: 1rem; color: var(--text);">IntroduÃ§Ã£o</h3>
          <p style="margin-bottom: 1rem;">Esta publicaÃ§Ã£o aborda os principais aspectos relacionados a <strong>${doc.title}</strong>, um tema vital para o aumento da eficiÃªncia no campo. A pesquisa desenvolvida pela ${doc.authors.join(', ')} visa trazer as melhores prÃ¡ticas validadas na regiÃ£o de testes para a sua propriedade.</p>
          
          <h3 style="margin-bottom: 1rem; margin-top: 1.5rem; color: var(--text);">Metodologia e AplicaÃ§Ã£o PrÃ¡tica</h3>
          <p style="margin-bottom: 1rem;">Recomenda-se iniciar o processo atravÃ©s de uma avaliaÃ§Ã£o prÃ©via das condiÃ§Ãµes atuais da lavoura. As prÃ¡ticas apresentadas devem ser inseridas de maneira gradativa, respeitando as condiÃ§Ãµes climÃ¡ticas locais.</p>
          
          <div style="background: var(--surface); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--primary); margin: 1.5rem 0;">
            <strong>Dica TÃ©cnica:</strong> Sempre mantenha o registro atualizado no mÃ³dulo de Atividades do AGRA para cruzar os resultados destas recomendaÃ§Ãµes com a sua produtividade final.
          </div>
          
          <h3 style="margin-bottom: 1rem; margin-top: 1.5rem; color: var(--text);">Resultados Esperados</h3>
          <p style="margin-bottom: 1rem;">A adoÃ§Ã£o destas prÃ¡ticas tem demonstrado um aumento de atÃ© 15% na retenÃ§Ã£o de recursos na propriedade, ao mesmo tempo que reduz o impacto das variaÃ§Ãµes ambientais nas Ãºltimas safras de testes.</p>
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
        const prefs = JSON.parse(localStorage.getItem('agra_embrapa_prefs') || '{"scale":"todas","climate":"todos"}');
        container.querySelector('#prefScale').value = prefs.scale;
        container.querySelector('#prefClimate').value = prefs.climate;
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
