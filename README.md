# SiteDela

```
index.html              → página inicial (formulário do date)
pages/
  momentos.html         → carrossel + mural de fotos
  jogos.html            → Conexo, adivinhe o número e karaokê
assets/
  css/
    base.css            → paleta de cores e estilos usados em todas as páginas
    home.css            → estilos do formulário
    momentos.css        → estilos das fotos
    jogos.css           → estilos dos jogos
  js/
    home.js             → lógica do formulário e envio pelo WhatsApp
    momentos.js         → carrossel e foto ampliada
    jogos.js            → lógica dos jogos
  img/fotos/            → fotos
  audio/                → música do karaokê
  video/                → vídeos
```

## Como adicionar...

- **Uma pergunta no formulário:** copie uma `<section class="question" data-resumo="...">` no `index.html`
  e troque o `name` dos checkboxes. A numeração, o resumo e a mensagem do WhatsApp se atualizam sozinhos.
- **Uma foto no carrossel:** copie um `<figure class="slide">` em `pages/momentos.html` (troque a foto no `src`).
- **Uma foto no mural:** copie um `<figure class="polaroid">` em `pages/momentos.html`.
