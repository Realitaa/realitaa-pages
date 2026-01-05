import { onMounted, onUnmounted } from 'vue'

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
  density?: number        // 1 – 5 (default 3)
  speed?: number          // default 1
  trailAlpha?: number     // 0.05 – 0.3
  safeRadius?: number     // px, pusat layar
}

export function useStarfieldBackground(
  host: Ref<HTMLElement | null>,
  config: StarfieldConfig = {}
) {
  let canvas: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let rafId: number | null = null
  let stars: Star[] = []

  const density = Math.min(Math.max(config.density ?? 3, 1), 5)
  const speedFactor = config.speed ?? 1
  const trailAlpha = config.trailAlpha ?? 0.15

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

  function resize() {
    if (!canvas || !host.value) return
    canvas.width = host.value.clientWidth * devicePixelRatio
    canvas.height = host.value.clientHeight * devicePixelRatio
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    ctx?.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
  }

  function animate() {
    if (!ctx || !canvas || !host.value) return

    const width = canvas.width / devicePixelRatio
    const height = canvas.height / devicePixelRatio

    // === TRAIL MAGIC (INI KUNCI) ===
    ctx.save()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = `rgba(0,0,0,${trailAlpha})`
    ctx.fillRect(0, 0, width, height)
    ctx.restore()

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

  onMounted(() => {
    if (!host.value) return

    canvas = document.createElement('canvas')
    canvas.className = 'absolute inset-0'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '1'

    host.value.appendChild(canvas)
    ctx = canvas.getContext('2d')

    resize()

    const starCount =
      Math.floor((canvas.width * canvas.height) / 10000) * density

    stars = Array.from({ length: starCount }, () =>
      createStar(
        canvas!.width / devicePixelRatio,
        canvas!.height / devicePixelRatio
      )
    )

    window.addEventListener('resize', resize)
    rafId = requestAnimationFrame(animate)
  })

  onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)
    window.removeEventListener('resize', resize)
    canvas?.remove()
    canvas = null
    ctx = null
    stars = []
  })
}
