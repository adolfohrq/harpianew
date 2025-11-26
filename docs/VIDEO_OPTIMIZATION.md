# Guia de Otimização de Vídeos

## Status Atual

| Arquivo          | Tamanho | Uso          | Status    |
| ---------------- | ------- | ------------ | --------- |
| `video-hero.mp4` | 1.2 MB  | Hero Section | ✅ OK     |
| `video.mp4`      | 27 MB   | Showreel     | ⚠️ Grande |

## Recomendações de Compressão

### FFmpeg (Recomendado)

Para comprimir `video.mp4` de 27MB para ~5MB:

```bash
# H.264 com CRF (Constant Rate Factor) - boa qualidade
ffmpeg -i video.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k video-compressed.mp4

# Opções de CRF:
# 18-23: Alta qualidade (arquivos maiores)
# 23-28: Qualidade boa (equilíbrio)
# 28-35: Qualidade aceitável (arquivos menores)
```

### Versão WebM (Fallback Moderno)

```bash
# VP9 codec - 30-50% menor que H.264
ffmpeg -i video.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k video.webm
```

### Uso no Código

```tsx
<video poster="/video-poster.jpg" preload="metadata">
  <source src="/video.webm" type="video/webm" />
  <source src="/video.mp4" type="video/mp4" />
</video>
```

## Lazy Loading

O projeto inclui o componente `LazyVideo` para carregamento sob demanda:

```tsx
import { LazyVideo } from '@/components/ui';

<LazyVideo src="/video.mp4" poster="/video-poster.jpg" lazyLoad muted playsInline />;
```

### Benefícios

- Não carrega vídeo até entrar no viewport
- Reduz tempo de carregamento inicial
- Economiza largura de banda

## CDN Externo (Produção)

Para melhor performance em produção, considere usar um CDN:

### Opções Recomendadas

1. **Cloudflare Stream**
   - Transcodificação automática
   - CDN global integrado
   - ~$5/1000 minutos de visualização

2. **Bunny.net**
   - Custo mais baixo
   - CDN pull-zone para vídeos estáticos
   - ~$0.01/GB

3. **Mux**
   - API robusta
   - Analytics de vídeo
   - ~$0.007/minuto de reprodução

### Implementação com CDN

```tsx
// Usar URL do CDN em vez de local
const VIDEO_SRC = import.meta.env.PROD ? 'https://cdn.exemplo.com/video.mp4' : '/video.mp4';
```

## Checklist de Otimização

- [ ] Comprimir `video.mp4` (27MB → ~5MB)
- [ ] Gerar versão WebM
- [ ] Criar poster images para ambos os vídeos
- [ ] Usar `LazyVideo` no Showreel
- [ ] Configurar CDN para produção (opcional)

## Poster Images

Para criar thumbnails dos vídeos:

```bash
# Extrair frame do vídeo (1 segundo)
ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 video-poster.jpg

# Com qualidade específica
ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 -q:v 2 video-poster.jpg
```

## Métricas de Performance

### Antes da Otimização

- Total de vídeos: ~28.2 MB
- Tempo de carregamento: Depende da conexão

### Depois da Otimização (Esperado)

- Total de vídeos: ~6.2 MB (78% menor)
- Com WebM: ~4.5 MB (84% menor)
- Com CDN: Carregamento distribuído globalmente
