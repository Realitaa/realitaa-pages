<template>
  <div ref="host" class="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const host = ref<HTMLElement | null>(null)

// --- Types ---
type DensityLevel = 'sparse' | 'normal' | 'dense' | 'nebula'

interface StarfieldOptions {
  density?: DensityLevel
  speed?: number
  safeZone?: number // safe radius in center
}

interface PresetConfig {
  density: DensityLevel
  speedFactor: number
  trailAlpha: number
  backgroundColor: string
}

interface StarConfig {
  width: number
  height: number
  speedFactor: number
  safeRadius?: number
}

// --- Presets ---
const PRESETS: Record<DensityLevel, PresetConfig> = {
  sparse: { density: 'sparse', speedFactor: 0.6, trailAlpha: 0.15, backgroundColor: 'transparent' }, // Adjusted bg to transparent for overlay usage
  normal: { density: 'normal', speedFactor: 1, trailAlpha: 0.25, backgroundColor: 'transparent' },
  dense: { density: 'dense', speedFactor: 1.8, trailAlpha: 0.35, backgroundColor: 'transparent' },
  nebula: { density: 'nebula', speedFactor: 1.2, trailAlpha: 0.3, backgroundColor: 'transparent' }
}

const DENSITY_MAP: Record<DensityLevel, number> = {
  sparse: 0.0005,
  normal: 0.0015,
  dense: 0.003,
  nebula: 0.004
}

// --- Star Implementation ---
class Star {
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

    this.reset(true)
  }

  reset(initial = false) {
    // Random angle
    const angle = Math.random() * Math.PI * 2
    
    // Determine distance: if initial, can be anywhere. If respawning (not initial), usually spawn near center or edges?
    // The doc says "spawn acak di luar safe zone"
    // To simple simulation of expanding universe: spawn somewhat near center but outside safezone, or random across screen if initial.
    
    // Simplified logic: Spawn at random position, but if within safeRadius, push out.
    // For "expanding" feel, stars usually spawn at center and move out.
    // However, the provided doc snippet implies simple movement.
    // Let's implement fully random spawn first.
    
    this.x = Math.random() * this.width
    this.y = Math.random() * this.height
    
    // Check safe zone
    const dx = this.x - this.cx
    const dy = this.y - this.cy
    const dist = Math.sqrt(dx*dx + dy*dy)
    
    if (dist < this.safeRadius) {
       // Push out along the angle
       const pushAngle = Math.atan2(dy, dx)
       this.x = this.cx + Math.cos(pushAngle) * this.safeRadius
       this.y = this.cy + Math.sin(pushAngle) * this.safeRadius
    }

    // Velocity relative to angle from center (expansion effect)
    // Or just simple parallax? The doc says "bergerak menjauhi titik pusat".
    const moveAngle = Math.atan2(this.y - this.cy, this.x - this.cx)
    const speed = (0.2 + Math.random() * 0.5) * this.speedFactor
    
    this.vx = Math.cos(moveAngle) * speed
    this.vy = Math.sin(moveAngle) * speed
    
    this.size = 0.5 + Math.random() * 1.5
    this.opacity = 0.1 + Math.random() * 0.9
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    // Accelerate slightly as they move out?
    this.x += this.vx * 0.01
    this.y += this.vy * 0.01
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`
    ctx.fill()
  }

  isOutOfBounds() {
    return (this.x < 0 || this.x > this.width || this.y < 0 || this.y > this.height)
  }
}

// --- Component Logic ---
const props = withDefaults(defineProps<{
  density?: DensityLevel
  speed?: number
  safeZone?: number
}>(), {
  density: 'normal',
  speed: 1,
  safeZone: 100
})

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D | null
let animationId: number
let stars: Star[] = []
let resizeObserver: ResizeObserver

function initStarfield() {
  if (!host.value) return

  const container = host.value
  canvas = document.createElement('canvas')
  canvas.style.position = 'absolute'
  canvas.style.inset = '0'
  container.appendChild(canvas)

  ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  
  function resize() {
    if (!host.value || !ctx) return
    const { clientWidth, clientHeight } = host.value
    
    canvas.width = Math.floor(clientWidth * dpr)
    canvas.height = Math.floor(clientHeight * dpr)
    canvas.style.width = `${clientWidth}px`
    canvas.style.height = `${clientHeight}px`
    
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    
    initStars(clientWidth, clientHeight)
  }
  
  resizeObserver = new ResizeObserver(() => resize())
  resizeObserver.observe(container)
  resize() // Initial sizing

  animate()
}

function initStars(width: number, height: number) {
  const preset = PRESETS[props.density]
  const area = width * height
  const baseCount = Math.floor(area * DENSITY_MAP[props.density]) // Simplified density calc from doc
  const count = Math.floor(baseCount * (0.8 + Math.random() * 0.4)) // Variance
  
  const speedFactor = props.speed * preset.speedFactor
  
  stars = []
  for (let i = 0; i < count; i++) {
    stars.push(new Star({ width, height, speedFactor, safeRadius: props.safeZone }))
  }
}

function animate() {
  if (!ctx || !canvas) return
  
  const width = canvas.width / (window.devicePixelRatio || 1)
  const height = canvas.height / (window.devicePixelRatio || 1)
  
  ctx.clearRect(0, 0, width, height)
  
  // Optional: Background from preset if needed, but usually we want transparent to overlay on CSS gradients
  // ctx.fillStyle = 'rgba(0,0,0,0)' 
  // ctx.fillRect(0,0,width,height)

  for (const star of stars) {
    star.update()
    star.draw(ctx)
    if (star.isOutOfBounds()) {
        // Respawn logic specific: simple reset implies random respawn
        // Ideally should respawn at centerish?
        star.reset()
        // Reset to center-ish to create continuous flow?
        // For now, Star.reset() handles random placement. 
        // If random placement, it will look like noise rather than starfield warp.
        // Let's adjust logic in reset slightly for respawn vs initial?
        // Actually doc says "Spawn acak di luar safe zone" generically.
    }
  }

  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  initStarfield()
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (resizeObserver) resizeObserver.disconnect()
  if (canvas) canvas.remove()
})
</script>
