import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MARCA, NAV } from '../../lib/site'
import { Button, Arrow } from '../ui'
import { useReserva } from '../reserva/contexto'

const EASE = [0.16, 1, 0.3, 1] as const

/* Rola até a seção descontando a altura do cabeçalho fixo */
export function irPara(id: string) {
  const alvo = document.getElementById(id)
  if (!alvo) return
  const topo = alvo.getBoundingClientRect().top + window.scrollY - 8
  window.scrollTo({ top: topo, behavior: 'smooth' })
}

function Wordmark({ tone, onClick }: { tone: 'dark' | 'light'; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group flex items-center gap-3" aria-label="Início">
      <img
        src="/brand/logo-mark.png"
        alt=""
        aria-hidden
        className="h-8 w-8 shrink-0 object-contain transition-transform duration-700 ease-expo group-hover:rotate-45"
      />
      <span className="leading-none">
        <img
          src="/brand/logo-script.png"
          alt={`${MARCA.nome} ${MARCA.sufixo}`}
          className="h-[1.35rem] w-auto object-contain object-left"
        />
        <span
          className={`t-eyebrow mt-0.5 block text-left text-[0.5rem] ${
            tone === 'dark' ? 'text-ink/45' : 'text-cream/55'
          }`}
        >
          {MARCA.sufixo}
        </span>
      </span>
    </button>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [ativa, setAtiva] = useState<string>('')
  const { scrollY } = useScroll()
  const { abrir } = useReserva()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  /* Marca no menu a seção que está na tela */
  useEffect(() => {
    const alvos = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => !!el
    )
    if (!alvos.length) return

    const obs = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visivel) setAtiva(visivel.target.id)
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.25, 0.5] }
    )
    alvos.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const navegar = (id: string) => {
    setOpen(false)
    // espera o menu fechar para o scroll não competir com o overflow travado
    setTimeout(() => irPara(id), open ? 260 : 0)
  }

  const aoTopo = () => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const tone: 'dark' | 'light' = scrolled ? 'dark' : 'light'

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-[150]"
      >
        <motion.div
          animate={{
            backgroundColor: scrolled
              ? 'rgba(250,244,236,0.85)'
              : 'rgba(250,244,236,0)',
            backdropFilter: scrolled ? 'blur(18px)' : 'blur(0px)',
            borderBottomColor: scrolled
              ? 'rgba(28,15,7,0.09)'
              : 'rgba(28,15,7,0)',
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="border-b"
        >
          <div className="shell flex h-[3.6rem] items-center justify-between md:h-[4.1rem]">
            <Wordmark tone={tone} onClick={aoTopo} />

            <nav className="hidden items-center gap-9 lg:flex">
              {NAV.map((item) => {
                const atual = ativa === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => navegar(item.id)}
                    className="group relative"
                  >
                    <span
                      className={`t-eyebrow transition-colors duration-400 ${
                        tone === 'dark'
                          ? atual
                            ? 'text-terra-500'
                            : 'text-ink/55 hover:text-ink'
                          : atual
                            ? 'text-gold-300'
                            : 'text-cream/65 hover:text-cream'
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-expo group-hover:origin-left group-hover:scale-x-100 ${
                          atual ? 'origin-left scale-x-100' : ''
                        }`}
                      />
                    </span>
                  </button>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <Button
                  onClick={abrir}
                  size="sm"
                  variant={tone === 'dark' ? 'solid' : 'light'}
                >
                  Reservar <Arrow />
                </Button>
              </div>

              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Menu"
                aria-expanded={open}
                className={`relative z-[210] grid h-11 w-11 place-items-center rounded-full border transition-colors duration-500 lg:hidden ${
                  open
                    ? 'border-cream/25 text-cream'
                    : tone === 'dark'
                      ? 'border-ink/15 text-ink'
                      : 'border-cream/25 text-cream'
                }`}
              >
                <span className="relative block h-3 w-5">
                  <motion.span
                    animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute left-0 top-[3px] h-px w-full bg-current"
                  />
                  <motion.span
                    animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute bottom-[3px] left-0 h-px w-full bg-current"
                  />
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Menu mobile em tela cheia */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="surface-dark grain fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden px-[var(--gutter)] pb-12 pt-24"
          >
            <motion.button
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="t-eyebrow flex w-fit items-center gap-2.5 rounded-full border border-cream/25 px-5 py-2.5 text-cream/70 transition-colors duration-400 hover:bg-cream hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
              Fechar
            </motion.button>

            <nav className="flex flex-col gap-1">
              {NAV.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => navegar(item.id)}
                  className="mask-line py-1 text-left"
                >
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.12 + i * 0.05 }}
                    className="flex items-baseline gap-4"
                  >
                    <span className="t-mono t-eyebrow text-cream/30">
                      0{i + 1}
                    </span>
                    <span className="font-display text-[11vw] leading-[1.05] tracking-display text-cream sm:text-5xl">
                      {item.label}
                    </span>
                  </motion.span>
                </button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
              className="flex flex-col gap-5 border-t border-cream/12 pt-7"
            >
              <p className="t-body text-cream/50">
                {MARCA.endereco}
                <br />
                {MARCA.cidade} · {MARCA.uf}
              </p>
              <Button onClick={abrir} variant="light">
                Reservar agora <Arrow />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
