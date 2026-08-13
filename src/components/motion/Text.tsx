import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, type ElementType, type ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

/* ============================================================
   SplitText — revela por caractere, saindo de uma máscara.
   Inspirado no SplitText do reactbits.dev
   ============================================================ */
export function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.022,
  duration = 1,
  once = true,
}: {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  once?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once, margin: '-12% 0px -12% 0px' })
  const words = text.split(' ')

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
          aria-hidden
        >
          {word.split('').map((char, ci) => {
            const index =
              words.slice(0, wi).reduce((n, w) => n + w.length, 0) + ci
            return (
              <motion.span
                key={`${char}-${ci}`}
                className="inline-block will-transform"
                initial={{ y: '110%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : undefined}
                transition={{
                  duration,
                  ease: EASE,
                  delay: delay + index * stagger,
                }}
              >
                {char}
              </motion.span>
            )
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}

/* ============================================================
   BlurText — palavras entram desfocadas e assentam.
   ============================================================ */
export function BlurText({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  as: Tag = 'p',
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: ElementType
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block will-transform"
          aria-hidden
          initial={{ filter: 'blur(10px)', opacity: 0, y: 12 }}
          animate={
            inView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : undefined
          }
          transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
        >
          {word}
          {' '}
        </motion.span>
      ))}
    </Tag>
  )
}

/* ============================================================
   ScrollReveal — o texto acende palavra a palavra conforme rola.
   ============================================================ */
export function ScrollReveal({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const words = text.split(' ')
  return (
    <p className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block will-transform"
          aria-hidden
          initial={{ opacity: 0.12, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ margin: '-25% 0px -35% 0px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.012 }}
        >
          {word}
          {' '}
        </motion.span>
      ))}
    </p>
  )
}

/* ============================================================
   Reveal — envelope genérico de entrada.
   ============================================================ */
const variants: Record<string, Variants> = {
  up: {
    hidden: { y: 34, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  mask: {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    show: { clipPath: 'inset(0% 0 0 0)' },
  },
  scale: {
    hidden: { scale: 1.08, opacity: 0 },
    show: { scale: 1, opacity: 1 },
  },
}

export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 1,
  className = '',
  once = true,
}: {
  children: ReactNode
  variant?: keyof typeof variants
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}) {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ============================================================
   Stagger — pai que escalona os filhos <Reveal.Item>
   ============================================================ */
export function Stagger({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { y: 30, opacity: 0, filter: 'blur(6px)' },
        show: { y: 0, opacity: 1, filter: 'blur(0px)' },
      }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
