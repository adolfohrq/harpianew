# Guia de Upload de Imagens - Portfolio Harpia

Este guia explica como fazer o upload correto das imagens dos projetos no WordPress.

## Estrutura de Imagens por Projeto

Cada projeto precisa de:

| Tipo             | Quantidade | Dimensoes Recomendadas   | Uso                           |
| ---------------- | ---------- | ------------------------ | ----------------------------- |
| Imagem Destacada | 1          | 1200x800px               | Thumbnail na listagem         |
| Galeria          | 3-6        | 1200x800px ou 800x1200px | Lightbox na pagina de detalhe |

## Especificacoes Tecnicas

### Formato

- **Preferencial**: WebP (melhor compressao)
- **Alternativa**: JPEG (qualidade 80-85%)
- **Evitar**: PNG para fotos (arquivos muito grandes)

### Dimensoes

- **Landscape**: 1200x800px (aspect ratio 3:2)
- **Portrait**: 800x1200px (aspect ratio 2:3)
- **Hero/Featured**: 1920x1080px (16:9) para projetos em destaque

### Tamanho de Arquivo

- **Maximo recomendado**: 300KB por imagem
- **Ideal**: 100-200KB

### Ferramentas de Otimizacao

- [Squoosh](https://squoosh.app/) - Gratuito, online
- [TinyPNG](https://tinypng.com/) - Gratuito, online
- [ImageOptim](https://imageoptim.com/) - Mac, gratuito

## Passo a Passo de Upload

### 1. Preparar as Imagens

1. Redimensione para as dimensoes recomendadas
2. Otimize usando uma das ferramentas acima
3. Nomeie os arquivos de forma descritiva:
   - `essencia-minimalista-hero.webp`
   - `essencia-minimalista-galeria-01.webp`
   - `essencia-minimalista-galeria-02.webp`

### 2. Upload no WordPress

1. Acesse **Midia > Adicionar Nova**
2. Arraste as imagens ou clique para selecionar
3. Aguarde o upload concluir
4. Preencha o campo **Texto Alternativo** (importante para SEO)

### 3. Associar ao Projeto

#### Imagem Destacada (Thumbnail)

1. Edite o projeto em **Portfolio > Todos os Projetos**
2. No painel lateral direito, clique em **Imagem Destacada**
3. Selecione ou envie a imagem principal do projeto
4. Clique em **Definir imagem destacada**

#### Galeria de Imagens

1. Role ate a secao **Detalhes do Projeto**
2. Encontre o campo **Galeria de Imagens**
3. Clique em **Adicionar a galeria**
4. Selecione as imagens na ordem desejada
5. A primeira imagem tera destaque maior no frontend

## Checklist por Projeto

### Projeto 1: Essencia Minimalista

- [ ] Imagem destacada (interior minimalista)
- [ ] Galeria: 6 imagens de interiores

### Projeto 2: Visao Urbana

- [ ] Imagem destacada (vista aerea/urbana)
- [ ] Galeria: 4 imagens arquitetonicas

### Projeto 3: Luz & Sombra

- [ ] Imagem destacada (produto com contraste)
- [ ] Galeria: 5 imagens de campanha

### Projeto 4: Identidade Forte

- [ ] Imagem destacada (logo/branding)
- [ ] Galeria: 5 imagens de identidade visual

### Projeto 5: Campanha Altitude

- [ ] Imagem destacada (esportivo/digital)
- [ ] Galeria: 3 imagens de campanha

### Projeto 6: Narrativa Visual

- [ ] Imagem destacada (gastronomia/restaurante)
- [ ] Galeria: 4 imagens de conteudo

## Dicas de SEO para Imagens

### Texto Alternativo (Alt Text)

Descreva a imagem de forma clara e inclua palavras-chave relevantes:

**Bom**: "Sala de estar minimalista com iluminacao natural - projeto Studio Architettura"
**Ruim**: "IMG_1234" ou "foto"

### Nome do Arquivo

Use palavras-chave separadas por hifen:

**Bom**: `fotografia-interiores-minimalista-harpia.webp`
**Ruim**: `IMG_1234.jpg` ou `foto (1).png`

### Titulo e Legenda

- **Titulo**: Nome descritivo para organizacao interna
- **Legenda**: Texto que aparece abaixo da imagem (opcional)

## Troubleshooting

### Imagem nao aparece no frontend

1. Verifique se o projeto esta **Publicado** (nao Rascunho)
2. Verifique se a imagem foi associada corretamente
3. Limpe o cache do navegador (Ctrl+Shift+R)
4. Limpe o cache do WordPress (se houver plugin de cache)

### Imagem carrega lenta

1. Verifique o tamanho do arquivo (deve ser < 300KB)
2. Use formato WebP ao inves de PNG/JPEG
3. Verifique se o CDN esta configurado corretamente

### Galeria fora de ordem

1. No campo Galeria do ACF, arraste as imagens para reordenar
2. Salve o projeto
3. A ordem no admin e a mesma que aparece no frontend

## Recursos Adicionais

- [Guia de Otimizacao de Imagens do Google](https://web.dev/fast/#optimize-your-images)
- [WebP Converter Online](https://cloudconvert.com/webp-converter)
- [Unsplash](https://unsplash.com/) - Banco de imagens gratuito para placeholders
