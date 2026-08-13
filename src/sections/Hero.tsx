import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import { MARCA, VIDEO } from '../lib/site'
import { VideoBackdrop } from '../components/media/Video'
import { ReservaBar } from '../components/ui/ReservaBar'
import { LogoHero } from '../components/brand/LogoHero'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={ref}
      id="topo"
      className="vignette sem-escurecer-mobile grain relative flex h-[100svh] w-full items-center overflow-hidden bg-ink"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 will-transform">
        <VideoBackdrop src={VIDEO.hero} srcMobile={VIDEO.heroMobile} />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-ink via-ink/35 to-ink/55 md:block" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="shell relative z-10 flex w-full flex-col items-center pb-6 pt-[4.6rem] text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.45 }}
          className="t-eyebrow text-gold-400"
        >
          {MARCA.cidade} · {MARCA.uf}
        </motion.p>

        <LogoHero className="mt-3 w-[min(58vw,24rem)]" />

        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.3 }}
          className="mt-3 max-w-[30ch] font-display text-[clamp(1.05rem,1.9vw,1.6rem)] leading-[1.2] tracking-display text-cream"
        >
          Sete chalés independentes na Serra da Mantiqueira.
        </motion.p>

        <div className="mt-7 w-full max-w-[54rem]">
          <ReservaBar />
        </div>
      </motion.div>
    </section>
  )
}
