import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eyebrow, Arrow } from './index'
import { SplitText, Reveal } from '../motion/Text'

const EASE = [0.16, 1, 0.3, 1] as const

export type ItemCarrossel = {
  id: string
  titulo: string
  frase: string
  capa: string
  to: string
}

/* ============================================================
   Carrossel — arrasta com o dedo, com o mouse ou pelas setas.
   Todos os cards têm a mesma largura e proporção, e o trilho
   começa exatamente na mesma linha do título.
   ============================================================ */
export function Carrossel({
  eyebrow,
  titulo,
  lead,
  itens,
}: {
  eyebrow: string
  titulo: string
  lead?: string
  itens: ItemCarrossel[]
}) {
  const trilho = useRef<HTMLDivElement>(null)
  const [inicio, setInicio] = useState(true)
  const [fim, setFim] = useState(false)

  const medir = useCallback(() => {
    const el = trilho.current
    if (!el) return
    setInicio(el.scrollLeft <= 4)
    setFim(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = trilho.current
    if (!el) return
    medir()
    el.addEventListener('scroll', medir, { passive: true })
    window.addEventListener('resize', medir)
    return () => {
      el.removeEventListener('scroll', medir)
      window.removeEventListener('resize', medir)
    }
  }, [medir])

  const mover = (direcao: 1 | -1) => {
    const el = trilho.current
    if (!el) return
    const card = el.querySelector('[data-card]') as HTMLElement | null
    const passo = card ? card.offsetWidth + 16 : el.clientWidth * 0.8
    el.scrollBy({ left: passo * direcao, behavior: 'smooth' })
  }

  /* Arrastar com o mouse no desktop */
  const arrasto = useRef({ ativo: false, x: 0, scroll: 0 })
  const aoPressionar = (e: React.MouseEvent) => {
    const el = trilho.current
    if (!el) return
    arrasto.current = { ativo: true, x: e.clientX, scroll: el.scrollLeft }
    el.style.cursor = 'grabbing'
  }
  const aoMover = (e: React.MouseEvent) => {
    const el = trilho.current
    if (!el || !arrasto.current.ativo) return
    el.scrollLeft = arrasto.current.scroll - (e.clientX - arrasto.current.x)
  }
  const soltar = () => {
    const el = trilho.current
    arrasto.current.ativo = false
    if (el) el.style.cursor = 'grab'
  }

  const seta = (ligado: boolean) =>
    `grid h-11 w-11 place-items-center rounded-full border transition-all duration-400 ${
      ligado
        ? 'border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream'
        : 'cursor-not-allowed border-ink/10 text-ink/25'
    }`

  return (
    <>
      {/* Cabeçalho alinhado à margem do trilho */}
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-5">
            <Eyebrow>{eyebrow}</Eyebrow>
            <SplitText as="h2" text={titulo} className="t-display max-w-[14ch] text-ink" />
            {lead && (
              <Reveal delay={0.15}>
                <p className="t-lead max-w-[44ch] text-ink/60">{lead}</p>
              </Reveal>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="t-eyebrow hidden text-ink/35 sm:block">
              Arraste para o lado
            </span>
            <button
              onClick={() => mover(-1)}
              disabled={inicio}
              aria-label="Anterior"
              className={seta(!inicio)}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={() => mover(1)}
              disabled={fim}
              aria-label="Próximo"
              className={seta(!fim)}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Trilho: primeiro card nasce na mesma linha do título */}
      <div
        ref={trilho}
        onMouseDown={aoPressionar}
        onMouseMove={aoMover}
        onMouseUp={soltar}
        onMouseLeave={soltar}
        // scroll-pl faz o snap respeitar o recuo: sem isso o primeiro card
        // encosta na borda da tela em vez de nascer na linha do título
        className="mt-10 flex snap-x snap-mandatory scroll-pl-[var(--gutter)] gap-4 overflow-x-auto scroll-smooth px-[var(--gutter)] pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ cursor: 'grab' }}
      >
        {itens.map((item, i) => (
          <motion.div
            key={item.id}
            data-card
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.8, ease: EASE, delay: Math.min(i * 0.06, 0.4) }}
            className="w-[min(76vw,20rem)] shrink-0 snap-start"
          >
            <Link to={item.to} className="group block" draggable={false}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-ink">
                <img
                  src={item.capa}
                  alt={item.titulo}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl leading-tight tracking-display text-cream">
                    {item.titulo}
                  </h3>
                  <p className="t-body mt-1.5 text-cream/70">{item.frase}</p>
                  <span className="t-eyebrow mt-4 inline-flex items-center gap-2 text-gold-300">
                    Ver fotos <Arrow />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  )
}
