import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SplitText } from '../motion/Text'
import { Eyebrow } from '../ui'

const EASE = [0.16, 1, 0.3, 1] as const

/* Cabeçalho padrão das páginas internas: imagem alta + título mascarado. */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  alt,
  index,
}: {
  eyebrow: string
  title: string
  lead?: string
  image: string
  alt: string
  index: string
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="vignette grain relative flex h-[78svh] min-h-[540px] items-end overflow-hidden bg-ink"
    >
      <motion.div style={{ y }} className="absolute inset-0 will-transform">
        <motion.img
          src={image}
          alt={alt}
          initial={{ scale: 1.16, filter: 'blur(12px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.9, ease: EASE }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/50" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="shell relative z-10 pb-14">
        <div className="flex items-center justify-between">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <span className="t-eyebrow t-mono text-cream/30">{index}</span>
        </div>

        <SplitText
          as="h1"
          text={title}
          className="t-display mt-6 block max-w-[14ch] font-display text-cream"
          delay={0.35}
          stagger={0.03}
        />

        {lead && (
          <motion.p
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.85 }}
            className="t-lead mt-7 max-w-[44ch] text-cream/65"
          >
            {lead}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
