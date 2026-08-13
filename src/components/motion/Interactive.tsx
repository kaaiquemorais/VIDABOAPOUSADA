import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  animate,
  useInView,
} from 'framer-motion'
import { useEffect, useRef, type ReactNode, type MouseEvent } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

/* ============================================================
   Magnetic — o elemento é atraído pelo cursor.
   Inspirado no Magnet do reactbits.dev
   ============================================================ */
export function Magnetic({
  children,
  strength = 0.35,
  radius = 120,
  className = '',
}: {
  children: ReactNode
  strength?: number
  radius?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 })
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: globalThis.MouseEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist < r.width / 2 + radius) {
        x.set(dx * strength)
        y.set(dy * strength)
      } else {
        x.set(0)
        y.set(0)
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [radius, strength, x, y])

  return (
    <motion.div ref={ref} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  )
}

/* ============================================================
   SpotlightCard — halo radial que segue o mouse dentro do card.
   ============================================================ */
export function SpotlightCard({
  children,
  className = '',
  color = 'rgba(201, 160, 85, 0.16)',
}: {
  children: ReactNode
  className?: string
  color?: string
}) {
  const mx = useMotionValue(-500)
  const my = useMotionValue(-500)
  const bg = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, ${color}, transparent 72%)`

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(-500)
        my.set(-500)
      }}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div
        aria-hidden
        style={{ background: bg }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {children}
    </div>
  )
}

/* ============================================================
   TiltCard — inclinação 3D com profundidade.
   ============================================================ */
export function TiltCard({
  children,
  className = '',
  max = 8,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 20,
  })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 20,
  })

  return (
    <motion.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        px.set((e.clientX - r.left) / r.width)
        py.set((e.clientY - r.top) / r.height)
      }}
      onMouseLeave={() => {
        px.set(0.5)
        py.set(0.5)
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ============================================================
   CountUp — número que sobe quando entra em cena.
   ============================================================ */
export function CountUp({
  to,
  duration = 2,
  className = '',
  suffix = '',
}: {
  to: number
  duration?: number
  className?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })

  useEffect(() => {
    if (!inView || !ref.current) return
    const node = ref.current
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = Math.round(v).toString()
      },
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span className={className}>
      <span ref={ref} className="t-mono">
        0
      </span>
      {suffix}
    </span>
  )
}

/* ============================================================
   Parallax — deslocamento vertical suave no scroll.
   ============================================================ */
export function Parallax({
  children,
  distance = 90,
  className = '',
}: {
  children: ReactNode
  distance?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full will-transform">
        {children}
      </motion.div>
    </div>
  )
}

/* ============================================================
   ParallaxImage — imagem full-bleed com escala + deslocamento.
   ============================================================ */
export function ParallaxImage({
  src,
  alt,
  className = '',
  distance = 12,
  overlay = 'bg-ink/25',
}: {
  src: string
  alt: string
  className?: string
  distance?: number
  overlay?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${distance}%`, `${distance}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, scale: 1 + distance / 45 }}
        className="absolute inset-0 h-full w-full object-cover will-transform"
      />
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  )
}

/* ============================================================
   Marquee — faixa infinita (texto ou cards).
   ============================================================ */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className = '',
  pauseOnHover = true,
}: {
  children: ReactNode
  speed?: number
  reverse?: boolean
  className?: string
  pauseOnHover?: boolean
}) {
  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={`flex shrink-0 items-center animate-marquee ${
            pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
          }`}
          style={
            {
              '--marquee-duration': `${speed}s`,
              animationDirection: reverse ? 'reverse' : 'normal',
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      ))}
    </div>
  )
}

/* ============================================================
   ImageReveal — imagem que sobe atrás de uma cortina.
   ============================================================ */
export function ImageReveal({
  src,
  alt,
  className = '',
  ratio = 'aspect-[4/5]',
  delay = 0,
}: {
  src: string
  alt: string
  className?: string
  ratio?: string
  delay?: number
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${ratio} ${className}`}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 1.3, ease: EASE, delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover"
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 1.6, ease: EASE, delay }}
      />
    </motion.div>
  )
}

/* ============================================================
   ProgressBar — barra de leitura no topo.
   ============================================================ */
export function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[200] h-[2px] w-full origin-left bg-terra-500"
    />
  )
}
