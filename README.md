# Deck 256 · Bar & Restaurante

Site do **Deck 256 Bar & Restaurante**, feito em HTML, CSS e JavaScript puro. Não precisa de framework nem de build, e é otimizado para celular.

### 🔗 [Ver o site no ar → juancarlos-qw.github.io/deck256-site](https://juancarlos-qw.github.io/deck256-site/)

> Versão de demonstração. Endereço, WhatsApp, horários e preços ainda são exemplos.

---

## O que foi implementado

### Páginas
| Página | Conteúdo |
|---|---|
| [Início](https://juancarlos-qw.github.io/deck256-site/) | Hero com logo animada, destaques, diferenciais, apresentação do bar, evento em destaque com contagem regressiva, galeria de fotos e formulário de reserva |
| [Cardápio](https://juancarlos-qw.github.io/deck256-site/cardapio.html) | 6 categorias em abas (Porções, Lanches, Pratos, Drinks, Cervejas & Chopp, Doses & Sem álcool), cada item com nome, descrição, preço e foto própria |
| [Sobre](https://juancarlos-qw.github.io/deck256-site/sobre.html) | História do bar, cozinha e bar, diferenciais e perguntas frequentes |
| [Eventos](https://juancarlos-qw.github.io/deck256-site/eventos.html) | Evento em destaque com cartaz e contagem regressiva, agenda fixa da semana e orçamento para festas particulares |

### Funcionalidades
- **Cardápio interativo:** a foto ao lado troca conforme o prato em que você passa o mouse (ou toca, no celular). Todos os 29 itens têm foto.
- **Reserva pelo WhatsApp:** o formulário (nome, data, horário, pessoas e observação) monta a mensagem e abre a conversa no WhatsApp.
- **Botão flutuante de WhatsApp** em todas as páginas.
- **Contagem regressiva para o próximo evento.** Quando a data passa, ela vira um aviso sozinha.
- **Galeria com ampliação** das fotos (lightbox), que fecha com Esc ou com um clique fora.
- **Abas do cardápio com link direto**, como [`cardapio.html#drinks`](https://juancarlos-qw.github.io/deck256-site/cardapio.html#drinks), e navegação pelas setas do teclado.
- **Menu mobile** em tela cheia e botão "voltar ao topo".

### Animações
- Logo do hero desenhada em CSS: "DECK" se desenha, "256" desliza para dentro e o brilho fica pulsando.
- Foto de fundo com zoom lento (Ken Burns) e efeito parallax ao rolar.
- Conteúdo aparecendo ao rolar a página, em cascata, e títulos entrando letra por letra.
- Faixa vermelha rolante, barra de progresso de leitura e header que encolhe ao rolar.
- Luz que acompanha o mouse nos cards e cartaz do evento com inclinação 3D.
- Título de Eventos com efeito de neon piscando.
- Menu mobile abrindo em círculo, indicador deslizante nas abas e FAQ abrindo suavemente.
- Troca de foto do cardápio com fade e desfoque.

### Qualidade
- **Responsivo**, testado em telas de 320px até desktop.
- **Acessível:** navegação por teclado, textos alternativos nas imagens, foco visível, link "pular para o conteúdo" e respeito à opção "reduzir movimento" do sistema (as animações são desligadas).
- **Leve:** imagens em WebP e carregamento sob demanda (lazy loading). As fotos do cardápio são pré-carregadas depois que a página abre.
- **Sem dependências:** só as fontes do Google Fonts (Bebas Neue e Inter).

---

## Estrutura

```
├── index.html        Início
├── cardapio.html     Cardápio
├── sobre.html        Sobre
├── eventos.html      Eventos
├── styles.css        Estilos e animações (cores e fontes no :root)
├── script.js         Interações (menu, abas, WhatsApp, animações...)
└── assets/           Logo, fotos e favicon
    └── cardapio/     Fotos de cada prato
```

## Rodar localmente
Abra o `index.html` no navegador, ou use a extensão **Live Server** do VS Code.

## Personalizar
| O quê | Onde |
|---|---|
| Número do WhatsApp | `script.js`, constante `WHATSAPP` (formato `55` + DDD + número) |
| Endereço e horários | `index.html` (seção Reserva) e o rodapé de todas as páginas |
| Link do Instagram | Rodapé e `eventos.html` |
| Link do Google Maps | `index.html`, link "Como chegar" |
| Itens e preços do cardápio | `cardapio.html` |
| Foto de cada prato | Atributo `data-img` de cada item em `cardapio.html` |
| Evento em destaque e data da contagem | Atributo `data-countdown` em `index.html` e `eventos.html` |
| Cores e fontes | Início do `styles.css` (`:root`) |

Cabeçalho e rodapé se repetem nas 4 páginas. Quando mudar um, mude nos outros também.

## Imagens
- **Do Deck 256:** logo, fotos das porções, flyer do evento e foto do balcão (`logo`, `comida-1`, `comida-2`, `promocao` e `sobre`).
- **Do [Unsplash](https://unsplash.com/license)** (uso comercial gratuito): as demais fotos do site e as fotos dos pratos em `assets/cardapio/`.
