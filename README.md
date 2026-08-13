# Vida Boa Pousada — landing page

Site institucional da Vida Boa Pousada (Águas de Lindóia · SP), na Serra da Mantiqueira.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve o dist/
```

## Stack

| Peça | Escolha |
| --- | --- |
| Build | Vite + React 19 + TypeScript |
| Estilo | Tailwind CSS 3 + tokens em `src/index.css` |
| Motion | Framer Motion |
| Rotas | React Router (5 páginas) |
| Scroll | Lenis (desligado sob `prefers-reduced-motion`) |

## Identidade visual

A paleta foi extraída do arquivo do logo, não escolhida à mão. As cores
marcadas abaixo são valores lidos direto do PNG:

| Token | Hex | Origem no logo |
| --- | --- | --- |
| `terra-500` | `#CE5C26` | script "Vida Boa" e beija-flor |
| `terra-400` / `clay-400` | `#D98C52` | meio-tom do script |
| `terra-300` | `#E5B18F` | meio-tom claro |
| `gold-500` | `#E19F3C` | "POUSADA" e raios do sol |
| `gold-400` | `#F1BE4F` | corpo do sol |
| `gold-300` | `#F6CC42` | borda do sol |
| `gold-200` | `#F7A51B` | núcleo do sol |
| `cream-warm` | `#F6E9DF` | fundo claro do logo |
| `cream-deep` | `#F3DAC4` | fundo claro do logo |
| `ink` | `#1C0F07` | terracota escurecido até virar superfície |

Não há verde no site: a identidade da marca é inteiramente quente
(sol âmbar, script terracota, ouro).

### Assets de marca

```
public/brand/logo.png        logo completo, margens aparadas (1400px)
public/brand/logo-mark.png   só o sol, quadrado (512px) — nav e favicon
public/brand/logo-word.png   só "Vida Boa" + "POUSADA"
public/brand/logo-bird.png   só o beija-flor
public/favicon-32.png        favicon
public/favicon-512.png       favicon alta resolução / PWA
public/apple-touch-icon.png  ícone iOS (180px, fundo opaco)
public/og.jpg                imagem de compartilhamento (1200×630)
```

O `og.jpg` combina a foto do poente com o logo centralizado — é o que
aparece ao colar o link no WhatsApp, Instagram ou Facebook.

### O logo animado do hero

`components/brand/LogoHero.tsx` remonta o logo a partir de três recortes
(sol, beija-flor, assinatura) posicionados nas mesmas porcentagens que
ocupavam no arquivo original. A montagem é idêntica ao logo, mas cada peça
ganha vida própria: o sol gira sem parar, o beija-flor flutua e a assinatura
é revelada da esquerda para a direita.

Se o logo for atualizado, é preciso refazer os três recortes — as
coordenadas de cada um estão comentadas no componente.

Na barra de navegação usamos o **sol do logo + o nome em Fraunces**, em vez do
logo inteiro: o script fica ilegível em 40px de altura. O logo completo aparece
no rodapé, no favicon e na imagem de compartilhamento. Se preferir o logo
inteiro no topo, seria preciso um lockup horizontal (nome ao lado do sol).

## Estrutura

```
src/
  index.css                 design system: tokens, escala tipográfica, primitivos
  lib/
    library.ts              GERADO — inventário das fotos em public/img
    site.ts                 conteúdo: textos, chalés, distâncias, contatos
  components/
    motion/Text.tsx         SplitText · BlurText · ScrollReveal · Reveal · Stagger
    motion/Interactive.tsx  Magnetic · SpotlightCard · TiltCard · CountUp ·
                            Parallax · Marquee · ImageReveal · Cursor · ProgressBar
    media/Video.tsx         VideoBackdrop (fundo mudo) · VideoPlayer (som/pause)
    ui/index.tsx            Button · Eyebrow · SectionHead · Arrow
    ui/ReservaBar.tsx       check-in · check-out · hóspedes → URL do Booking
    layout/                 Nav · Footer · PageHero
  pages/                    Home · Chales · Estrutura · Galeria · Localizacao
scripts/
  gen-images.mjs            varre public/img e reescreve src/lib/library.ts
  shot.mjs                  captura as 5 páginas com Playwright (verificação visual)
```

### Vídeo

O clipe original (34 MB, 72s) foi cortado em dois trechos e recomprimido:

| Arquivo | Trecho | Peso | Onde aparece |
| --- | --- | --- | --- |
| `hero.mp4` | 6s–32s, aéreo, sem áudio | 5,5 MB | fundo do hero (desktop) |
| `hero-mobile.mp4` | idem, 720px | 1,5 MB | fundo do hero (< 768px) |
| `tour.mp4` | 32s–72s, com áudio | 10,5 MB | seção "Um minuto e você entende" |

Comandos usados (precisa de `ffmpeg` no PATH):

```bash
ffmpeg -ss 6 -t 26 -i ORIGINAL.mp4 -an -c:v libx264 -crf 31 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -vf scale=1280:-2 public/video/hero.mp4

ffmpeg -ss 32 -t 40 -i ORIGINAL.mp4 -c:v libx264 -crf 28 -preset slow \
  -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart \
  -vf scale=1280:-2 public/video/tour.mp4
```

O `tour.mp4` usa `preload="none"` e só começa a baixar quando entra em cena.
Ambos pausam ao sair da tela e ficam congelados no pôster sob
`prefers-reduced-motion`.

### Trocar ou adicionar fotos

Coloque os arquivos em `public/img/<categoria>/` e rode:

```bash
node scripts/gen-images.mjs
```

O manifesto é regravado e a galeria passa a listar as novas imagens.
Nomes de arquivo não devem conter espaços ou parênteses.

## Reserva

Todo botão "Reservar" do site abre o mesmo formulário
(`components/reserva/ModalReserva.tsx`). Ele monta a mensagem em tempo real,
mostra a prévia e abre o WhatsApp `(19) 98910-4654` com o texto pronto.

A barra do hero e o modal compartilham o mesmo estado
(`components/reserva/contexto.tsx`), então datas e número de hóspedes
digitados no topo já chegam preenchidos no formulário completo.

## Imagens

Todas as fotos são `.webp` (137 arquivos, 11,5 MB; eram 14,6 MB em JPG).
Para adicionar novas, converta antes:

```bash
ffmpeg -i foto.jpg -c:v libwebp -quality 76 -compression_level 6 \
  -preset photo public/img/CATEGORIA/foto.webp
node scripts/gen-images.mjs
```

## Pendências antes de publicar

Estão marcadas com `TODO` em `src/lib/site.ts`:

- **E-mail** — `contato@vidaboapousada.com.br`, placeholder.
- **Instagram** — o link do rodapé aponta para `instagram.com` genérico.
- **Distâncias** — aproximadas por rodovia; vale conferir com o Maps.
- **Nome dos chalés** — "Serra", "Vale" e "Família" foram criados para a
  narrativa. Se a pousada usa outra nomenclatura, ajuste em `CHALES`.
- **Mapa** — o embed do Google Maps busca pelo endereço. Se a fixação do pino
  ficar imprecisa, troque a URL do `<iframe>` em `pages/Localizacao.tsx` por
  uma de "Compartilhar → Incorporar um mapa" tirada do próprio Maps.

## Acessibilidade

- Todo o motion respeita `prefers-reduced-motion`.
- Lightbox da galeria navega por teclado (`←` `→` `Esc`) e tem `role="dialog"`.
- Textos animados por caractere mantêm `aria-label` com a frase inteira.
