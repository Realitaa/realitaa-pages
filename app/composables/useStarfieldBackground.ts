import {
  onMounted,
  onUnmounted,
  watch,
  toValue,
  ref,
  type MaybeRef,
  type Ref
} from 'vue'
import { useThrottleFn, useDebounceFn } from '@vueuse/core'

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
}

interface StarfieldConfig {
  density?: MaybeRef<number>   // 0.1 – 5
  speed?: number              // default 1
  trailAlpha?: number         // 0.05 – 0.3
  safeRadius?: number         // px
}

export function useStarfieldBackground(
  host: Ref<HTMLElement | null>,
  config: StarfieldConfig = {}
) {
  /* ------------------------------------------------------------------ */
  /* State (NO browser API here — SSR safe)                              */
  /* ------------------------------------------------------------------ */
  let canvas: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let rafId: number | null = null
  let stars: Star[] = []

  let dpr = 1
  let last = 0
  let fps = 60
  let interval = 1000 / 60

  let onResize: (() => void) | null = null
  const lowEnd = ref(true) // default true for SSR safety

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */
  const getDensity = () =>
    Math.min(Math.max(toValue(config.density) ?? 3, 0.1), 5)

  const speedFactor = config.speed ?? 1

  function detectLowEndDevice(): boolean {
    if (typeof navigator === 'undefined') return true

    const cores = navigator.hardwareConcurrency || 2
    const memory = (navigator as any).deviceMemory || 2

    return cores <= 4 || memory <= 2
  }

  /* ------------------------------------------------------------------ */
  /* Star factory                                                        */
  /* ------------------------------------------------------------------ */
  function createStar(width: number, height: number): Star {
    const cx = width / 2
    const cy = height / 2
    const safe = config.safeRadius ?? 0

    let x = 0
    let y = 0

    do {
      x = Math.random() * width
      y = Math.random() * height
    } while (safe > 0 && Math.hypot(x - cx, y - cy) < safe)

    const dx = x - cx
    const dy = y - cy
    const dist = Math.sqrt(dx * dx + dy * dy) || 1
    const speed = (Math.random() * 0.6 + 0.4) * speedFactor
    const alpha = Math.random() * 0.5 + 0.4

    return {
      x,
      y,
      vx: (dx / dist) * speed,
      vy: (dy / dist) * speed,
      size: Math.random() * 1.2 + 0.3,
      alpha,
      color: `rgba(255,255,255,${alpha})`
    }
  }

  /* ------------------------------------------------------------------ */
  /* Resize                                                              */
  /* ------------------------------------------------------------------ */
  function resize() {
    if (!canvas || !host.value || !ctx) return

    dpr = Math.min(
      window.devicePixelRatio || 1,
      lowEnd.value ? 1 : 1.5
    )

    const w = host.value.clientWidth
    const h = host.value.clientHeight

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  /* ------------------------------------------------------------------ */
  /* Init stars                                                          */
  /* ------------------------------------------------------------------ */
  function initStars() {
    if (!canvas) return

    const width = canvas.width / dpr
    const height = canvas.height / dpr
    const density = getDensity()

    const count =
      Math.floor((width * height) / 10000) * density

    stars = Array.from({ length: count }, () =>
      createStar(width, height)
    )
  }

  /* ------------------------------------------------------------------ */
  /* Animation loop                                                      */
  /* ------------------------------------------------------------------ */
  function animate(now = 0) {
    if (!ctx || !canvas) return

    if (now - last < interval) {
      rafId = requestAnimationFrame(animate)
      return
    }
    last = now

    const width = canvas.width / dpr
    const height = canvas.height / dpr

    const trailAlpha =
      lowEnd.value ? 1 : config.trailAlpha ?? 0.15

    if (trailAlpha < 1) {
      ctx.save()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = `rgba(0,0,0,${trailAlpha})`
      ctx.fillRect(0, 0, width, height)
      ctx.restore()
    } else {
      ctx.clearRect(0, 0, width, height)
    }

    for (const star of stars) {
      star.x += star.vx
      star.y += star.vy

      if (
        star.x < 0 ||
        star.x > width ||
        star.y < 0 ||
        star.y > height
      ) {
        Object.assign(star, createStar(width, height))
        continue
      }

      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fillStyle = star.color
      ctx.fill()
    }

    rafId = requestAnimationFrame(animate)
  }

  /* ------------------------------------------------------------------ */
  /* Lifecycle (CLIENT ONLY)                                             */
  /* ------------------------------------------------------------------ */
  onMounted(() => {
    // 🔐 SSR-safe: browser API only here
    lowEnd.value = detectLowEndDevice()

    fps = lowEnd.value ? 24 : 60
    interval = 1000 / fps

    // Optional hard kill for ultra low-end
    // if (lowEnd.value) return

    if (!host.value) return

    canvas = document.createElement('canvas')
    canvas.className = 'absolute inset-0'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '1'

    host.value.appendChild(canvas)
    ctx = canvas.getContext('2d')

    resize()
    initStars()

    onResize = useThrottleFn(() => {
      resize()
      initStars()
    }, 200)

    window.addEventListener('resize', onResize)

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
      } else if (!document.hidden && !rafId) {
        rafId = requestAnimationFrame(animate)
      }
    })

    rafId = requestAnimationFrame(animate)
  })

  /* ------------------------------------------------------------------ */
  /* Reactive density (desktop only)                                     */
  /* ------------------------------------------------------------------ */
  watch(
    () => toValue(config.density),
    useDebounceFn(() => {
      if (!canvas || !ctx || lowEnd.value) return
      const width = canvas.width / dpr
      const height = canvas.height / dpr
      ctx.clearRect(0, 0, width, height)
      initStars()
    }, 300)
  )

  /* ------------------------------------------------------------------ */
  /* Cleanup                                                             */
  /* ------------------------------------------------------------------ */
  onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)
    if (onResize) window.removeEventListener('resize', onResize)
    canvas?.remove()
    canvas = null
    ctx = null
    stars = []
  })
}
