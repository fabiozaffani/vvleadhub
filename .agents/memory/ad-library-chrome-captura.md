---
name: ad-library-chrome-captura
description: Capturar page_id/anúncios na Meta Ad Library via Claude-in-Chrome — gotchas de screenshot/find/typeahead que evitam timeouts de 300s/30s.
metadata: 
  node_type: memory
  type: reference
  originSessionId: ed7625de-7cc9-4402-be23-6181725428da
---

Coleta v0 do radar (D-19, skill `discovery-radar`) na **Meta Ad Library** via Claude-in-Chrome. Mecânica que funciona, aprendida na leva 1 (jun/2026):

- **Screenshot exige permissão concedida**: enquanto o prompt do Chrome não é aprovado, o call de `computer screenshot` **bloqueia até 300s** e estoura. Pedir ao fundador o "sempre permitir" no 1º prompt antes de seguir.
- **Screenshot TRAVA na grade de resultados** (CDP `Page.captureScreenshot` 30s timeout — render pesado de vídeo/imagem). Screenshot só é confiável na **landing leve** da Ad Library, **não** na página de resultados de um anunciante.
- **`find` (DOM) funciona onde o screenshot falha**: usar p/ contagem ("~N resultados"), datas ("Veiculação iniciada em …") e copy dos criativos ("texto principal do anúncio"). **Não** usar `read_page`/`get_page_text` na Ad Library — estoura (read_page deu 63K chars; a skill já avisa do `get_page_text`).
- **page_id sai da URL, sem screenshot**: ao clicar o anunciante no typeahead, a URL vira `…view_all_page_id=<ID>` — ler do tab context. Fluxo: navegar à landing leve → escolher categoria "Todos os anúncios" (reseta a cada navegação) → clicar o campo e digitar o nome → **screenshot do typeahead** (leve, funciona) → clicar a sugestão certa (conferir @handle/seguidores vs homônimo) → ler page_id da URL.
- **`browser_batch` falha** quando uma ação precisa de prompt de permissão ("permission_required") ou quando uma ação anterior navegou — só a 1ª roda. Fazer cliques/digitação **standalone**.
- **Typeahead > keyword**: o typeahead de anunciante mostra @handle + seguidores + categoria, deixando o homônimo visível (ex.: "Castelo dos Vinhais" trouxe a venue certa + um consultor de eventos + a página secundária do grupo).
