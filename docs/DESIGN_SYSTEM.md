# Design System Harpia

## Cores (Definidas em `src/index.css`)

### Tons Principais

- **Harpia Black** (`--color-harpia-black` / `#050505`): Cor de fundo principal. Quase preto, profundo.
- **Harpia Carbon** (`--color-harpia-carbon` / `#121212`): Usado para cartões, seções secundárias e contrastes suaves.
- **Harpia Gray** (`--color-harpia-gray` / `#2a2a2a`): Bordas sutis, divisores e textos desabilitados.

### Texto & Acentos

- **Harpia White** (`--color-harpia-white` / `#f5f5f7`): Cor primária de texto. Um branco levemente "off-white" para conforto visual.
- **Harpia Accent** (`--color-harpia-accent` / `#ffffff`): Branco puro para destaques e hover states.

## Tipografia

### Títulos (`font-serif`)

- **Família**: 'Silk Serif', serif.
- **Uso**: Headlines, frases de impacto, números grandes.
- **Estilo**: Elegante, editorial.

### Corpo (`font-sans`)

- **Família**: 'Dosis', sans-serif.
- **Uso**: Parágrafos, botões, navegação, legendas.
- **Estilo**: Moderno, limpo, geométrico.

## Efeitos & Animações

### Noise Texture

- O site utiliza uma textura de ruído (`--background-image-noise`) com opacidade 5% sobre o fundo preto para dar textura orgânica.

### Marquee (Letreiro Infinito)

- `.animate-marquee`: Move da direita para a esquerda.
- `.animate-marquee-reverse`: Move da esquerda para a direita.
- **Comportamento**: Pausa suavemente ao passar o mouse (`hover`).
