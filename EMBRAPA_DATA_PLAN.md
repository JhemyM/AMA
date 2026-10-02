# Base de conhecimento Embrapa para o AGRA

## Fonte oficial encontrada

A página oficial de [Busca de Publicações da Embrapa](https://www.embrapa.br/busca-de-publicacoes) informa que o catálogo reúne conteúdos dos repositórios Infoteca-e e Alice, além de apontar a BDPA para o acervo completo. A consulta atual exibe mais de 13 mil páginas de resultados, mas isso inclui artigos, teses, capítulos, notas, livros e outros tipos, não apenas manuais.

A própria página informa que as publicações são protegidas por direitos autorais. Portanto, o AGRA pode indexar o catálogo e os metadados, mas o download e a redistribuição do PDF precisam respeitar a licença ou autorização de cada item.

## Estratégia segura

### Fase 1: catálogo e metadados

Armazenar:

- título, autores, ano, idioma e tipo de publicação;
- resumo, palavras-chave, unidade da Embrapa e repositório;
- URL oficial, identificador persistente e data da coleta;
- disponibilidade de PDF/ePub e licença declarada;
- culturas, regiões, temas e condições de uso.

Estimativa para 13.500 registros:

| Componente | Estimativa conservadora | Estimativa confortável |
| --- | ---: | ---: |
| JSON/CSV bruto do catálogo | 20 MB | 200 MB |
| PostgreSQL com índices | 50 MB | 500 MB |
| Texto de resumos e metadados | 50 MB | 1 GB |
| Backups versionados por ano | 200 MB | 3 GB |
| **Total da fase 1** | **320 MB** | **4,7 GB** |

### Fase 2: documentos autorizados

O tamanho final depende da quantidade e do tipo de publicação. Usando 13.500 itens somente como limite superior:

| Tamanho médio do arquivo | Todos os 13.500 itens | 3.000 manuais selecionados |
| ---: | ---: | ---: |
| 2 MB | 27 GB | 6 GB |
| 5 MB | 67,5 GB | 15 GB |
| 10 MB | 135 GB | 30 GB |
| 25 MB | 337,5 GB | 75 GB |

Recomendação inicial: baixar apenas documentos com licença compatível ou autorização, armazenar o original em objeto versionado e manter no banco somente o metadado, hash, URL e status da licença. Reservar **50 a 150 GB** para um primeiro conjunto de 3.000 manuais, com margem para versões e OCR.

### Fase 3: busca inteligente

Para busca semântica, o AGRA pode guardar texto extraído e embeddings:

| Componente para 3.000 manuais | Estimativa |
| --- | ---: |
| Texto OCR/extraído | 0,5 a 3 GB |
| Fragmentos, metadados e índices | 1 a 8 GB |
| Embeddings e índice vetorial | 0,2 a 2 GB |
| Miniaturas e páginas de prévia | 0,5 a 5 GB |
| **Adicional recomendado** | **2,2 a 18 GB** |

## Pipeline de ingestão

1. Consultar apenas endpoints e páginas oficiais permitidos.
2. Respeitar `robots.txt`, limites de requisição e termos de uso.
3. Deduplicar por identificador persistente e hash do arquivo.
4. Registrar a licença antes de baixar o conteúdo integral.
5. Guardar origem, data, versão, checksum e atribuição.
6. Extrair texto somente quando permitido.
7. Classificar cultura, região, solo, clima, água e prática de manejo.
8. Indexar por busca textual e, opcionalmente, semântica.
9. Mostrar sempre a publicação original e seus créditos ao produtor.

## Recomendação de implantação

Começar com PostgreSQL para catálogo e arquivos em armazenamento de objetos. Para desenvolvimento local, reservar 10 GB para metadados, testes e amostra; para um acervo inicial autorizado de 3.000 manuais, usar armazenamento de 100 GB com backup separado de 100 GB. Não começar baixando o acervo inteiro.

O banco deve funcionar como índice e base de conhecimento licenciada, não como cópia indiscriminada do acervo da Embrapa.
