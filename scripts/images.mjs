import sharp from 'sharp'
import fg from 'fast-glob'
import fs from 'fs/promises'
import path from 'path'

// bersihkan folder thumb dan preview 
await fs.rm('public/images/thumb', { recursive: true, force: true })
await fs.rm('public/images/preview', { recursive: true, force: true })

const BASE = 'public/images'
const SRC = path.join(BASE, 'original')

// ukuran default
const SIZES = {
  thumb: 320,
  preview: 960
}

// folder yang TIDAK perlu thumbnail
const NO_THUMB_DIRS = ['certificates', 'web']

// ambil semua gambar rekursif
const files = await fg(`${SRC}/**/*.{jpg,jpeg,png,webp}`)

for (const file of files) {
  // path relatif setelah original/
  const relative = path.relative(SRC, file)

  // ambil top-level folder (blog, certificates, dll)
  const [topDir] = relative.split(path.sep)

  // tentukan variant yang akan dibuat
  const variants =
    NO_THUMB_DIRS.includes(topDir)
      ? { preview: SIZES.preview }
      : SIZES

  for (const [variant, width] of Object.entries(variants)) {
    const outPath = path.join(BASE, variant, relative)

    // pastikan folder output ada
    await fs.mkdir(path.dirname(outPath), { recursive: true })

    await sharp(file)
      .resize({ width, withoutEnlargement: true })
      .toFile(outPath)
  }
}

console.log('Images transformed successfully')