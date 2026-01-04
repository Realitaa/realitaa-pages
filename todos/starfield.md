# Dokumentasi: starfield-bg

Dokumentasi ini menjelaskan bagaimana repository `starfield-bg` bekerja, arsitekturnya, dan memuat potongan kode penting supaya kamu cepat paham cara kerjanya dan cara menggunakannya.

## Ringkasan

`starfield-bg` adalah sebuah engine latar belakang berbasis Canvas 2D yang membuat efek bintang bergerak (starfield). Dirancang untuk digunakan sebagai background UI: ringan, zero-dependency, SSR-safe, dan mudah dikonfigurasi.

Fitur utama:
- Preset visual (`calm`, `normal`, `warp`, `nebula`)
- Abstraksi density (bukan hitungan bintang mentah)
- Safe zone untuk menjaga keterbacaan konten
- API lifecycle: `pause()`, `resume()`, `destroy()`
- Retina / DPR aware

---

## Cara kerja (high-level)

1. `createStarfield(options)` dipanggil dengan `target` (selector atau HTMLElement).
2. Jika bukan di environment browser (SSR), fungsi mengembalikan no-op object supaya aman di server.
3. Canvas dibuat dan di-attach ke `target` sebagai layer latar belakang.
4. Jumlah bintang ditentukan berdasarkan area dan `density`.
5. Setiap bintang dikelola oleh kelas `Star` (posisi, kecepatan, ukuran, opacity).
6. Loop animasi memakai `requestAnimationFrame`: menggambar background lalu setiap `Star` di-update dan digambar.
7. Resize dan visibility change ditangani untuk efisiensi dan kebersihan lifecycle.

---

## API publik

Pemanggilan utama:

```ts
import { createStarfield } from './src'

const bg = createStarfield({
	target: '#hero',
	preset: 'nebula',
	density: 'normal',
	speed: 1,
	safeZone: 160
})

// kontrol
bg.pause()
bg.resume()
bg.destroy()
```

Kembalian `createStarfield` adalah objek dengan metode `pause`, `resume`, dan `destroy`.

---

## Potongan kode penting dan penjelasan

Berikut potongan kode inti dari repository dan penjelasan singkatnya.

### `src/core/Star.ts` (konstruktor dan logika bintang)

Kelas `Star` menyimpan posisi, kecepatan, ukuran, opacity, dan menyediakan `reset`, `update`, `draw`, serta pengecekan out-of-bounds.

```ts
export interface StarConfig {
	width: number
	height: number
	speedFactor: number
	safeRadius?: number
}

export class Star {
	private x!: number
	private y!: number
	private vx!: number
	private vy!: number
	private size!: number
	private opacity!: number

	private cx: number
	private cy: number

	private width: number
	private height: number
	private speedFactor: number
	private safeRadius: number

	constructor(config: StarConfig) {
		this.width = config.width
		this.height = config.height
		this.speedFactor = config.speedFactor
		this.safeRadius = config.safeRadius ?? 0

		this.cx = this.width / 2
		this.cy = this.height / 2

		this.reset()
	}

	reset() { /* spawn acak di luar safe zone, inisialisasi kecepatan, ukuran, opacity */ }
	update() { this.x += this.vx; this.y += this.vy }
	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
		ctx.fillStyle = `rgba(255,255,255,${this.opacity})`
		ctx.fill()
	}
	isOutOfBounds() { return (this.x < 0 || this.x > this.width || this.y < 0 || this.y > this.height) }
	updateBounds(width: number, height: number) { /* update bounds tanpa recreate */ }
}
```

Keterangan: setiap `Star` bergerak menjauhi titik pusat (`cx`,`cy`) dengan kecepatan acak yang dikalibrasi oleh `speedFactor`.

### `src/core/Starfield.ts` (inisialisasi dan loop animasi)

Fungsi `createStarfield` mengurus pembuatan canvas, inisialisasi array `Star`, loop animasi, dan event handler.

```ts
export function createStarfield(options: StarfieldOptions) {
	if (!isBrowser()) return noopStarfield

	const config = normalizeOptions(options)
	const el = typeof options.target === 'string' ? document.querySelector(options.target) : options.target
	const host = el as HTMLElement

	const canvas = document.createElement('canvas')
	canvas.style.position = 'absolute'
	canvas.style.inset = '0'
	canvas.style.pointerEvents = 'none'
	host.style.position ||= 'relative'
	host.appendChild(canvas)

	const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

	let width = host.clientWidth
	let height = host.clientHeight
	resizeCanvas(canvas, width, height)

	const preset = config.preset ? PRESETS[config.preset] : PRESETS.normal
	const starCount = resolveStarCount(width, height, options.density)
	const speedFactor = (config.speed ?? 1) * preset.speedFactor

	const stars: Star[] = []
	for (let i = 0; i < starCount; i++) {
		stars.push(new Star({ width, height, speedFactor, safeRadius: config.safeZone }))
	}

	function animate() {
		if (paused || destroyed) return
		context.fillStyle = preset.backgroundColor
		context.fillRect(0, 0, width, height)
		for (const star of stars) {
			star.update()
			star.draw(context)
			if (star.isOutOfBounds()) star.reset()
		}
		rafId = requestAnimationFrame(animate)
	}

	// handlers: resize, visibilitychange, and public API: pause/resume/destroy

	rafId = requestAnimationFrame(animate)
	return api
}
```

Keterangan: loop menggambar latar preset (dengan alpha) lalu menggambar semua bintang. Ketika bintang keluar canvas, dipanggil `reset()` untuk respawn.

### `src/core/density.ts` (menentukan jumlah bintang)

Fungsi `resolveStarCount` menghitung jumlah bintang berdasarkan area (width * height) dan peta `DENSITY_MAP`. Ada variansi acak ±20% untuk variasi visual.

```ts
export function resolveStarCount(width: number, height: number, density: DensityLevel = 'normal'): number {
	const area = width * height
	const base = area * DENSITY_MAP[density]
	const variance = 0.8 + Math.random() * 0.4
	return Math.floor(base * variance)
}
```

### `src/core/presets.ts`

Presets mengumpulkan beberapa konfigurasi visual seperti `density`, `speedFactor`, dan `backgroundColor`.

```ts
export const PRESETS: Record<StarfieldPreset, PresetConfig> = {
	calm: { density: 'sparse', speedFactor: 0.6, trailAlpha: 0.15, backgroundColor: 'rgba(8, 8, 20, 0.2)' },
	normal: { density: 'normal', speedFactor: 1, trailAlpha: 0.25, backgroundColor: 'rgba(8, 8, 20, 0.25)' },
	warp: { density: 'dense', speedFactor: 1.8, trailAlpha: 0.35, backgroundColor: 'rgba(8, 8, 20, 0.4)' },
	nebula: { density: 'nebula', speedFactor: 1.2, trailAlpha: 0.3, backgroundColor: 'rgba(10, 10, 30, 0.35)' }
}
```

### `src/utils/resize.ts` (DPR-aware canvas sizing)

Fungsi `resizeCanvas` menyelaraskan ukuran internal canvas dengan `devicePixelRatio` supaya hasil gambar tajam di layar retina.

```ts
export function resizeCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
	const dpr = window.devicePixelRatio || 1
	canvas.width = Math.floor(width * dpr)
	canvas.height = Math.floor(height * dpr)
	canvas.style.width = `${width}px`
	canvas.style.height = `${height}px`
	const ctx = canvas.getContext('2d')
	if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}
```

### SSR safe: `src/core/noop.ts` dan `src/utils/env.ts`

Import dan pemanggilan `createStarfield` aman di SSR karena ada pengecekan `isBrowser()` dan akan mengembalikan `noopStarfield` yang semua metodenya kosong.

```ts
export function isBrowser(): boolean { return typeof window !== 'undefined' && typeof document !== 'undefined' }
export const noopStarfield = { pause() {}, resume() {}, destroy() {} }
```

---

## Lokasi file penting

- `src/core/Star.ts` — logika per-bintang
- `src/core/Starfield.ts` — entry `createStarfield`
- `src/core/density.ts` — konversi density → jumlah bintang
- `src/core/presets.ts` — preset visual
- `src/utils/resize.ts` — DPR-aware canvas sizing
- `src/core/noop.ts` & `src/utils/env.ts` — SSR safety
