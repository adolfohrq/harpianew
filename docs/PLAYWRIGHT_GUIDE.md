# Guia de Uso do Playwright MCP - Harpia

Guia prático para usar o Playwright MCP no projeto Harpia, focado em testes de UI, automação e validação da landing page.

## 📋 Índice

- [Introdução](#introdução)
- [Comandos Básicos](#comandos-básicos)
- [Casos de Uso para Harpia](#casos-de-uso-para-harpia)
- [Exemplos Práticos](#exemplos-práticos)
- [Testes Visuais](#testes-visuais)
- [Debugging](#debugging)
- [Boas Práticas](#boas-práticas)

## Introdução

O Playwright MCP permite automatizar testes de navegador diretamente do Claude Code. Ideal para:

- ✅ Testar formulário de contato
- ✅ Validar responsividade
- ✅ Verificar SEO visual
- ✅ Testar animações e interações
- ✅ Capturar screenshots para documentação

## Comandos Básicos

### Navegação

```bash
# Iniciar navegador e acessar localhost
browser_navigate url="http://localhost:5020"

# Navegar entre páginas
browser_navigate url="http://localhost:5020/servicos"
browser_navigate url="http://localhost:5020/portfolio"

# Voltar para página anterior
browser_navigate_back
```

### Inspeção de Página

```bash
# Capturar estrutura acessível da página (recomendado)
browser_snapshot

# Tirar screenshot da página completa
browser_take_screenshot fullPage=true filename="homepage-full.png"

# Screenshot de viewport atual
browser_take_screenshot type="png" filename="viewport.png"

# Screenshot de elemento específico
browser_take_screenshot element="Hero section" ref="<ref-do-elemento>"
```

### Interações

```bash
# Clicar em botão
browser_click element="Botão de contato" ref="<ref>"

# Digitar em campo
browser_type element="Campo de email" ref="<ref>" text="cliente@exemplo.com"

# Preencher formulário completo
browser_fill_form fields=[
  {"name": "Nome", "type": "textbox", "ref": "<ref>", "value": "João Silva"},
  {"name": "Email", "type": "textbox", "ref": "<ref>", "value": "joao@exemplo.com"}
]

# Hover sobre elemento
browser_hover element="Card de serviço" ref="<ref>"

# Pressionar tecla
browser_press_key key="Enter"
```

### Execução de JavaScript

```bash
# Executar código JavaScript
browser_evaluate function="() => { return document.title; }"

# Verificar scroll
browser_evaluate function="() => { return window.scrollY; }"

# Obter dimensões da janela
browser_evaluate function="() => { return {width: window.innerWidth, height: window.innerHeight}; }"
```

### Gerenciamento de Abas

```bash
# Listar abas abertas
browser_tabs action="list"

# Abrir nova aba
browser_tabs action="new"

# Selecionar aba
browser_tabs action="select" index=0

# Fechar aba atual
browser_tabs action="close"
```

## Casos de Uso para Harpia

### 1. Testar Formulário de Contato

```bash
# 1. Navegar para home
browser_navigate url="http://localhost:5020"

# 2. Capturar snapshot
browser_snapshot

# 3. Preencher formulário
browser_fill_form fields=[
  {"name": "Nome", "type": "textbox", "ref": "<ref>", "value": "Teste Cliente"},
  {"name": "Email", "type": "textbox", "ref": "<ref>", "value": "teste@exemplo.com"},
  {"name": "Telefone", "type": "textbox", "ref": "<ref>", "value": "(11) 99999-9999"},
  {"name": "Mensagem", "type": "textbox", "ref": "<ref>", "value": "Gostaria de um orçamento"}
]

# 4. Enviar formulário
browser_click element="Botão Enviar" ref="<ref>"

# 5. Capturar resultado
browser_snapshot
```

### 2. Validar Responsividade

```bash
# Desktop (1920x1080)
browser_resize width=1920 height=1080
browser_navigate url="http://localhost:5020"
browser_take_screenshot filename="desktop-1920.png"

# Tablet (768x1024)
browser_resize width=768 height=1024
browser_take_screenshot filename="tablet-768.png"

# Mobile (375x667)
browser_resize width=375 height=667
browser_take_screenshot filename="mobile-375.png"
```

### 3. Testar Navegação entre Páginas

```bash
# Home
browser_navigate url="http://localhost:5020"
browser_snapshot

# Serviços
browser_click element="Link Serviços" ref="<ref>"
browser_snapshot

# Portfolio
browser_click element="Link Portfolio" ref="<ref>"
browser_snapshot

# Sobre
browser_click element="Link Sobre" ref="<ref>"
browser_snapshot

# Contato
browser_click element="Link Contato" ref="<ref>"
browser_snapshot
```

### 4. Verificar SEO Visual

```bash
# Acessar página
browser_navigate url="http://localhost:5020/servicos"

# Verificar título
browser_evaluate function="() => { return document.title; }"

# Verificar meta description
browser_evaluate function="() => {
  const meta = document.querySelector('meta[name=\"description\"]');
  return meta ? meta.content : null;
}"

# Verificar Open Graph
browser_evaluate function="() => {
  const ogTitle = document.querySelector('meta[property=\"og:title\"]')?.content;
  const ogDesc = document.querySelector('meta[property=\"og:description\"]')?.content;
  const ogImage = document.querySelector('meta[property=\"og:image\"]')?.content;
  return { ogTitle, ogDesc, ogImage };
}"

# Verificar estrutura de headings
browser_evaluate function="() => {
  const h1 = Array.from(document.querySelectorAll('h1')).map(h => h.textContent);
  const h2 = Array.from(document.querySelectorAll('h2')).map(h => h.textContent);
  return { h1Count: h1.length, h1, h2Count: h2.length, h2 };
}"
```

### 5. Testar Animações Reveal

```bash
# Acessar página
browser_navigate url="http://localhost:5020"

# Scroll para acionar animações
browser_evaluate function="() => { window.scrollTo(0, 800); }"
browser_wait_for time=1

# Screenshot após animações
browser_take_screenshot filename="animations-triggered.png"

# Verificar classes de animação
browser_evaluate function="() => {
  const reveals = document.querySelectorAll('[class*=\"reveal\"]');
  return Array.from(reveals).map(el => ({
    visible: el.classList.contains('reveal-visible'),
    classes: el.className
  }));
}"
```

### 6. Validar Links Externos

```bash
# Verificar redes sociais
browser_evaluate function="() => {
  const socialLinks = document.querySelectorAll('a[href*=\"instagram\"], a[href*=\"facebook\"], a[href*=\"linkedin\"]');
  return Array.from(socialLinks).map(link => ({
    href: link.href,
    text: link.textContent,
    hasTarget: link.hasAttribute('target'),
    hasRel: link.hasAttribute('rel')
  }));
}"

# Verificar links com target="_blank" têm rel="noopener"
browser_evaluate function="() => {
  const externalLinks = document.querySelectorAll('a[target=\"_blank\"]');
  return Array.from(externalLinks).map(link => ({
    href: link.href,
    hasNoopener: link.rel.includes('noopener'),
    hasNoreferrer: link.rel.includes('noreferrer')
  }));
}"
```

### 7. Verificar Performance Visual

```bash
# Verificar imagens carregadas
browser_evaluate function="() => {
  const images = document.querySelectorAll('img');
  return Array.from(images).map(img => ({
    src: img.src,
    loaded: img.complete && img.naturalHeight !== 0,
    hasAlt: img.hasAttribute('alt'),
    alt: img.alt,
    width: img.width,
    height: img.height
  }));
}"

# Verificar lazy loading
browser_evaluate function="() => {
  const lazyImages = document.querySelectorAll('img[loading=\"lazy\"]');
  return {
    total: lazyImages.length,
    images: Array.from(lazyImages).map(img => img.src)
  };
}"
```

### 8. Testar Acessibilidade

```bash
# Verificar landmarks ARIA
browser_evaluate function="() => {
  const landmarks = document.querySelectorAll('[role]');
  return Array.from(landmarks).map(el => ({
    role: el.getAttribute('role'),
    tag: el.tagName,
    hasLabel: el.hasAttribute('aria-label') || el.hasAttribute('aria-labelledby')
  }));
}"

# Verificar contraste de cores (básico)
browser_evaluate function="() => {
  const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button');
  return Array.from(elements).slice(0, 10).map(el => {
    const styles = window.getComputedStyle(el);
    return {
      tag: el.tagName,
      color: styles.color,
      background: styles.backgroundColor,
      fontSize: styles.fontSize
    };
  });
}"

# Verificar alt em imagens
browser_evaluate function="() => {
  const images = document.querySelectorAll('img');
  const withoutAlt = Array.from(images).filter(img => !img.hasAttribute('alt') || img.alt === '');
  return {
    total: images.length,
    withoutAlt: withoutAlt.length,
    missingAlt: withoutAlt.map(img => img.src)
  };
}"
```

## Exemplos Práticos

### Exemplo 1: Teste Completo de Homepage

```bash
# 1. Iniciar servidor dev (se não estiver rodando)
npm run dev

# 2. Aguardar 3 segundos
browser_wait_for time=3

# 3. Navegar
browser_navigate url="http://localhost:5020"

# 4. Capturar estrutura
browser_snapshot

# 5. Screenshot desktop
browser_take_screenshot fullPage=true filename="docs/screenshots/homepage-desktop.png"

# 6. Testar mobile
browser_resize width=375 height=667
browser_take_screenshot fullPage=true filename="docs/screenshots/homepage-mobile.png"

# 7. Voltar para desktop
browser_resize width=1920 height=1080

# 8. Testar scroll
browser_evaluate function="() => { window.scrollTo(0, document.body.scrollHeight); }"
browser_wait_for time=1
browser_take_screenshot filename="docs/screenshots/homepage-footer.png"
```

### Exemplo 2: Auditoria SEO Automatizada

```bash
# Função para auditar SEO
browser_navigate url="http://localhost:5020/servicos"

browser_evaluate function="() => {
  const audit = {
    title: document.title,
    description: document.querySelector('meta[name=\"description\"]')?.content,
    canonical: document.querySelector('link[rel=\"canonical\"]')?.href,
    ogTitle: document.querySelector('meta[property=\"og:title\"]')?.content,
    ogDescription: document.querySelector('meta[property=\"og:description\"]')?.content,
    ogImage: document.querySelector('meta[property=\"og:image\"]')?.content,
    ogUrl: document.querySelector('meta[property=\"og:url\"]')?.content,
    h1Count: document.querySelectorAll('h1').length,
    h1Text: Array.from(document.querySelectorAll('h1')).map(h => h.textContent),
    imagesWithoutAlt: Array.from(document.querySelectorAll('img')).filter(img => !img.alt).length
  };
  return audit;
}"
```

### Exemplo 3: Teste de Formulário End-to-End

```bash
# 1. Navegar
browser_navigate url="http://localhost:5020"

# 2. Scroll até formulário
browser_evaluate function="() => {
  const form = document.querySelector('form');
  form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}"

browser_wait_for time=1

# 3. Preencher dados
browser_fill_form fields=[
  {"name": "Nome", "type": "textbox", "ref": "<ref>", "value": "Maria Santos"},
  {"name": "Email", "type": "textbox", "ref": "<ref>", "value": "maria@empresa.com"},
  {"name": "Telefone", "type": "textbox", "ref": "<ref>", "value": "(21) 98765-4321"},
  {"name": "Serviço", "type": "combobox", "ref": "<ref>", "value": "Gestão de Tráfego"},
  {"name": "Mensagem", "type": "textbox", "ref": "<ref>", "value": "Preciso aumentar minhas vendas online"}
]

# 4. Screenshot antes do envio
browser_take_screenshot filename="formulario-preenchido.png"

# 5. Enviar
browser_click element="Botão Enviar" ref="<ref>"

# 6. Aguardar resposta
browser_wait_for time=2

# 7. Capturar resultado
browser_snapshot
browser_take_screenshot filename="formulario-enviado.png"
```

## Testes Visuais

### Captura de Screenshots para Documentação

```bash
# Criar pasta se não existir
mkdir -p docs/screenshots

# Homepage
browser_navigate url="http://localhost:5020"
browser_take_screenshot fullPage=true filename="docs/screenshots/01-home.png"

# Serviços
browser_navigate url="http://localhost:5020/servicos"
browser_take_screenshot fullPage=true filename="docs/screenshots/02-servicos.png"

# Portfolio
browser_navigate url="http://localhost:5020/portfolio"
browser_take_screenshot fullPage=true filename="docs/screenshots/03-portfolio.png"

# Sobre
browser_navigate url="http://localhost:5020/sobre"
browser_take_screenshot fullPage=true filename="docs/screenshots/04-sobre.png"

# Contato
browser_navigate url="http://localhost:5020/contato"
browser_take_screenshot fullPage=true filename="docs/screenshots/05-contato.png"
```

### Teste de Breakpoints Responsivos

```bash
# Desktop Grande (1920x1080)
browser_resize width=1920 height=1080
browser_navigate url="http://localhost:5020"
browser_take_screenshot filename="responsive-1920.png"

# Desktop Médio (1366x768)
browser_resize width=1366 height=768
browser_take_screenshot filename="responsive-1366.png"

# Tablet Landscape (1024x768)
browser_resize width=1024 height=768
browser_take_screenshot filename="responsive-1024.png"

# Tablet Portrait (768x1024)
browser_resize width=768 height=1024
browser_take_screenshot filename="responsive-768.png"

# Mobile Grande (414x896) - iPhone XR/11
browser_resize width=414 height=896
browser_take_screenshot filename="responsive-414.png"

# Mobile Médio (375x667) - iPhone SE
browser_resize width=375 height=667
browser_take_screenshot filename="responsive-375.png"

# Mobile Pequeno (320x568) - iPhone 5
browser_resize width=320 height=568
browser_take_screenshot filename="responsive-320.png"
```

## Debugging

### Console Messages

```bash
# Capturar mensagens do console
browser_console_messages

# Capturar apenas erros
browser_console_messages onlyErrors=true
```

### Network Requests

```bash
# Capturar requisições de rede
browser_network_requests
```

### Aguardar Elementos

```bash
# Aguardar texto aparecer
browser_wait_for text="Mensagem enviada com sucesso"

# Aguardar texto desaparecer
browser_wait_for textGone="Carregando..."

# Aguardar tempo específico
browser_wait_for time=2
```

### Executar Código Playwright Direto

```bash
# Para casos avançados
browser_run_code code="await page.getByRole('button', { name: 'Enviar' }).click();"
```

## Boas Práticas

### 1. Sempre Iniciar com Snapshot

```bash
browser_navigate url="http://localhost:5020"
browser_snapshot  # Identifica elementos disponíveis
```

### 2. Usar Refs do Snapshot

Após `browser_snapshot`, use os `ref` exatos retornados para interagir com elementos.

### 3. Aguardar Animações

```bash
browser_click element="Menu" ref="<ref>"
browser_wait_for time=0.5  # Aguardar animação de menu
```

### 4. Nomear Screenshots Descritivamente

```bash
# ❌ Ruim
browser_take_screenshot filename="test.png"

# ✅ Bom
browser_take_screenshot filename="homepage-hero-section-desktop.png"
```

### 5. Testar em Múltiplos Breakpoints

Sempre validar pelo menos:

- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

### 6. Verificar Console para Erros

```bash
browser_console_messages onlyErrors=true
```

### 7. Limpar Estado entre Testes

```bash
# Fechar aba e abrir nova para estado limpo
browser_tabs action="close"
browser_tabs action="new"
```

### 8. Salvar Screenshots em Pasta Dedicada

```bash
# Criar estrutura organizada
docs/
├── screenshots/
│   ├── desktop/
│   ├── tablet/
│   └── mobile/
└── test-results/
```

## Comandos Úteis do Projeto

### Iniciar Dev + Playwright

```bash
# Terminal 1: Iniciar servidor
npm run dev

# Terminal 2: Claude Code
# Aguardar servidor iniciar
browser_wait_for time=3
browser_navigate url="http://localhost:5020"
```

### Teste Pós-Build

```bash
# Build
npm run build

# Preview
npm run preview

# Testar build de produção
browser_navigate url="http://localhost:4173"
browser_snapshot
```

## Integração com Comandos Customizados

Você pode criar novos comandos em `.claude/commands/` para automatizar testes:

```markdown
<!-- .claude/commands/test-ui.md -->

Execute os seguintes testes de UI usando Playwright:

1. Inicie o servidor dev se não estiver rodando
2. Teste a homepage em desktop, tablet e mobile
3. Teste o formulário de contato
4. Verifique SEO de todas as páginas
5. Capture screenshots de todas as páginas
6. Gere relatório de erros do console
7. Salve resultados em docs/test-results/
```

## Recursos Adicionais

- [Documentação Oficial Playwright](https://playwright.dev)
- [Playwright MCP GitHub](https://github.com/microsoft/playwright-mcp)
- [Guia de Seletores Playwright](https://playwright.dev/docs/selectors)

---

**Dica:** Após reiniciar o Claude Code, experimente:

```bash
browser_navigate url="http://localhost:5020"
browser_snapshot
```

Isso mostrará todos os elementos interativos da página Harpia!
