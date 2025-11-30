# Guia de Otimização de Vídeos

Este guia contém comandos FFmpeg para comprimir os vídeos do projeto.

## Pré-requisitos

Instale o FFmpeg:

- **Windows**: `winget install FFmpeg` ou baixe de https://ffmpeg.org/download.html
- **Mac**: `brew install ffmpeg`
- **Linux**: `sudo apt install ffmpeg`

---

## 1. Hero Background Video (Alvo: < 500KB)

O vídeo do Hero tem overlay escuro e opacidade reduzida, então pode ser comprimido agressivamente.

### Opção A: Compressão Moderada (~400KB)

```bash
ffmpeg -i public/video-hero.mp4 \
  -c:v libx264 \
  -preset veryslow \
  -crf 32 \
  -vf "scale=1280:-2,fps=24" \
  -an \
  -movflags +faststart \
  -pix_fmt yuv420p \
  public/video-hero-optimized.mp4
```

### Opção B: Compressão Agressiva (~250KB)

```bash
ffmpeg -i public/video-hero.mp4 \
  -c:v libx264 \
  -preset veryslow \
  -crf 35 \
  -vf "scale=960:-2,fps=20" \
  -an \
  -movflags +faststart \
  -pix_fmt yuv420p \
  public/video-hero-tiny.mp4
```

### Parâmetros Explicados

| Flag                   | Propósito                                  |
| ---------------------- | ------------------------------------------ |
| `-c:v libx264`         | Codec H.264 (99% compatibilidade)          |
| `-preset veryslow`     | Máxima eficiência de compressão            |
| `-crf 32-35`           | Qualidade (23=padrão, 32+=mais compressão) |
| `-vf "scale=1280:-2"`  | Reduz resolução (mantém aspect ratio)      |
| `-fps=24`              | Reduz framerate                            |
| `-an`                  | Remove áudio                               |
| `-movflags +faststart` | Permite streaming progressivo              |
| `-pix_fmt yuv420p`     | Compatibilidade máxima                     |

---

## 2. Showreel Video (Alvo: < 3MB com áudio)

O showreel precisa de qualidade boa pois é o conteúdo principal.

### Two-Pass Encoding (Melhor qualidade/tamanho)

```bash
# Windows (PowerShell)
ffmpeg -i public/video.mp4 -c:v libx264 -preset slow -b:v 1500k -vf "scale=1920:-2" -pass 1 -an -f null NUL
ffmpeg -i public/video.mp4 -c:v libx264 -preset slow -b:v 1500k -vf "scale=1920:-2" -pass 2 -c:a aac -b:a 128k -movflags +faststart public/video-optimized.mp4

# Linux/Mac
ffmpeg -i public/video.mp4 -c:v libx264 -preset slow -b:v 1500k -vf "scale=1920:-2" -pass 1 -an -f null /dev/null
ffmpeg -i public/video.mp4 -c:v libx264 -preset slow -b:v 1500k -vf "scale=1920:-2" -pass 2 -c:a aac -b:a 128k -movflags +faststart public/video-optimized.mp4
```

### CRF Encoding (Mais simples)

```bash
ffmpeg -i public/video.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 26 \
  -vf "scale=1920:-2" \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  public/video-crf.mp4
```

### Parâmetros Explicados

| Flag           | Propósito                                     |
| -------------- | --------------------------------------------- |
| `-b:v 1500k`   | Bitrate de vídeo (ajuste conforme necessário) |
| `-crf 26`      | Qualidade boa para web                        |
| `-c:a aac`     | Codec de áudio AAC                            |
| `-b:a 128k`    | Bitrate de áudio                              |
| `-preset slow` | Boa compressão sem demorar muito              |

---

## 3. Após Compressão

1. Compare os tamanhos:

   ```bash
   ls -lh public/video*.mp4
   ```

2. Visualize para verificar qualidade

3. Renomeie os arquivos otimizados:

   ```bash
   # Backup dos originais
   mv public/video-hero.mp4 public/video-hero-original.mp4
   mv public/video.mp4 public/video-original.mp4

   # Use os otimizados
   mv public/video-hero-optimized.mp4 public/video-hero.mp4
   mv public/video-optimized.mp4 public/video.mp4
   ```

---

## Comparativo de Codecs

| Codec      | Compatibilidade | Compressão | Recomendação        |
| ---------- | --------------- | ---------- | ------------------- |
| **H.264**  | 99%+ browsers   | Boa        | ✅ Use este         |
| H.265/HEVC | ~80%            | Excelente  | ❌ Safari issues    |
| AV1        | ~75%            | Melhor     | ❌ Suporte limitado |
| VP9        | ~95%            | Muito boa  | ⚠️ Alternativa WebM |

---

## Resultados Esperados

| Vídeo     | Antes       | Depois    | Economia |
| --------- | ----------- | --------- | -------- |
| Hero      | 1.2 MB      | ~400 KB   | 67%      |
| Showreel  | 9.1 MB      | ~2.5 MB   | 73%      |
| **Total** | **10.3 MB** | **~3 MB** | **71%**  |

Combinado com o lazy loading implementado, o payload inicial vai de **~10.8 MB para ~0 MB**.
