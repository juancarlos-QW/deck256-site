# Deck 256 · Bar & Restaurante

Site estático em HTML, CSS e JavaScript puro. Não precisa de npm, framework ou build.

## Abrir
Abra `index.html` no navegador, ou use o Live Server do VS Code (porta 5501).

## Páginas
- `index.html`: hero animado, destaques, diferenciais, evento em destaque com contagem regressiva, galeria e formulário de reserva via WhatsApp.
- `cardapio.html`: cardápio em abas (Porções, Lanches, Pratos, Drinks, Cervejas & Chopp, Doses & Sem álcool).
- `sobre.html`: história, cozinha, diferenciais e perguntas frequentes.
- `eventos.html`: evento em destaque, agenda fixa da semana e eventos particulares.
- `styles.css`: cores e fontes ficam no `:root`, no início do arquivo.
- `script.js`: menu mobile, animações, abas, lightbox, contagem regressiva e WhatsApp.

## Antes de entregar ao cliente, edite
| O quê | Onde |
|---|---|
| Número do WhatsApp | `script.js`, constante `WHATSAPP` (formato `55` + DDD + número) |
| Endereço | `index.html` (seção Reserva) e o rodapé de todas as páginas |
| Horários | `index.html` (seção Reserva) e o rodapé de todas as páginas |
| Link do Instagram | Rodapé e `eventos.html` |
| Link do Google Maps | `index.html`, link "Como chegar" |
| Itens e preços do cardápio | `cardapio.html` (os atuais são exemplos) |
| Foto de cada prato | Atributo `data-img` de cada item em `cardapio.html` (fotos em `assets/cardapio/`) |
| "Desde 2020", agenda fixa e FAQ | `index.html`, `sobre.html` e `eventos.html` (textos de exemplo) |
| Evento em destaque e data da contagem | Atributo `data-countdown` em `index.html` e `eventos.html` |

Cabeçalho e rodapé se repetem nas 4 páginas. Quando mudar um, mude nos outros também.

## Animações
- Logo do hero desenhada em CSS, com glow pulsando, e foto de fundo com zoom lento (Ken Burns) e parallax.
- Faixa rolante vermelha, barra de progresso de rolagem e header que encolhe ao rolar.
- Elementos aparecem ao rolar (`data-reveal` e `data-stagger`) e títulos entram letra por letra (`data-split`).
- Luz que segue o mouse nos cards, cartaz do evento com efeito 3D, títulos neon piscando e contagem regressiva.
- No cardápio, a foto muda conforme o prato: passe o mouse ou toque no item.
- Menu mobile abre em círculo e as abas do cardápio têm indicador deslizante. FAQ e lightbox abrem suavemente, e o botão do WhatsApp tem efeito de onda.
- Quem ativa "reduzir movimento" no sistema recebe o site sem animações.

## Imagens
- `logo`, `comida-1`, `comida-2`, `promocao` e `sobre` são do próprio bar. Os PNGs originais continuam em `assets/` e o site usa as versões `.webp`.
- `hero-bar`, `salao`, `drinks`, `drink-neon`, `chopp`, `batata`, `burger`, `picanha`, `brinde`, `amigos`, `garrafas`, `cozinha` e as fotos dos pratos em `assets/cardapio/` vêm do [Unsplash](https://unsplash.com/license), com uso comercial gratuito. Vale trocar por fotos reais do bar quando possível.
