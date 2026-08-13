import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

/* ============================================================
   useTrilho — a mecânica compartilhada dos carrosséis:
   arrasta com o dedo, com o mouse ou pelas setas.
   ============================================================ */
function useTrilho() {
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
    const item = el.querySelector('[data-item]') as HTMLElement | null
    const passo = item ? item.offsetWidth + 12 : el.clientWidth * 0.8
    el.scrollBy({ left: passo * 2 * direcao, behavior: 'smooth' })
  }

  const arrasto = useRef({ ativo: false, x: 0, scroll: 0, moveu: false })

  const eventos = {
    onMouseDown: (e: React.MouseEvent) => {
      const el = trilho.current
      if (!el) return
      arrasto.current = {
        ativo: true,
        x: e.clientX,
        scroll: el.scrollLeft,
        moveu: false,
      }
      el.style.cursor = 'grabbing'
    },
    onMouseMove: (e: React.MouseEvent) => {
      const el = trilho.current
      if (!el || !arrasto.current.ativo) return
      const dx = e.clientX - arrasto.current.x
      if (Math.abs(dx) > 4) arrasto.current.moveu = true
      el.scrollLeft = arrasto.current.scroll - dx
    },
    onMouseUp: () => {
      const el = trilho.current
      arrasto.current.ativo = false
      if (el) el.style.cursor = 'grab'
    },
    onMouseLeave: () => {
      const el = trilho.current
      arrasto.current.ativo = false
      if (el) el.style.cursor = 'grab'
    },
    // impede que o arraste vire clique no link da foto
    onClickCapture: (e: React.MouseEvent) => {
      if (arrasto.current.moveu) {
        e.preventDefault()
        e.stopPropagation()
        arrasto.current.moveu = false
      }
    },
  }

  return { trilho, inicio, fim, mover, eventos }
}

/* ---------- Setas ---------- */
function Setas({
  inicio,
  fim,
  mover,
  tone = 'dark',
}: {
  inicio: boolean
  fim: boolean
  mover: (d: 1 | -1) => void
  tone?: 'dark' | 'light'
}) {
  const estilo = (ligado: boolean) =>
    `grid h-9 w-9 place-items-center rounded-full border transition-all duration-400 ${
      ligado
        ? tone === 'dark'
          ? 'border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream'
          : 'border-cream/25 text-cream hover:bg-cream hover:text-ink'
        : tone === 'dark'
          ? 'cursor-not-allowed border-ink/10 text-ink/20'
          : 'cursor-not-allowed border-cream/10 text-cream/20'
    }`

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => mover(-1)}
        disabled={inicio}
        aria-label="Anterior"
        className={estilo(!inicio)}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      <button
        onClick={() => mover(1)}
        disabled={fim}
        aria-label="Próximo"
        className={estilo(!fim)}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

/* ============================================================
   FaixaFotos — um carrossel por categoria, com as fotos reais.
   O cabeçalho e o trilho abrem na mesma linha da margem.
   ============================================================ */
export function FaixaFotos({
  titulo,
  frase,
  fotos,
  onSelecionar,
  indice,
}: {
  titulo: string
  frase: string
  fotos: readonly string[]
  /** abre o visualizador no índice clicado */
  onSelecionar: (i: number) => void
  indice: number
}) {
  const { trilho, inicio, fim, mover, eventos } = useTrilho()

  return (
    <section className="py-8 md:py-10">
      <div className="shell">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="t-eyebrow t-mono text-terra-500">
              {String(indice + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-none tracking-display text-ink">
              {titulo}
            </h3>
            <p className="t-body mt-2 max-w-[46ch] text-ink/55">{frase}</p>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <span className="t-eyebrow hidden text-ink/35 lg:block">
              Arraste para o lado
            </span>
            <div className="hidden sm:block">
              <Setas inicio={inicio} fim={fim} mover={mover} />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={trilho}
        {...eventos}
        className="mt-6 flex snap-x scroll-pl-[var(--gutter)] gap-3 overflow-x-auto scroll-smooth px-[var(--gutter)] pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ cursor: 'grab' }}
      >
        {fotos.map((foto, i) => {
          // Todas as fotos no mesmo formato: as linhas fecham certas
          const moldura =
            'aspect-[4/3] w-[17rem] overflow-hidden rounded-2xl bg-cream-deep md:w-[22rem]'
          const imagem = (
            <img
              src={foto}
              alt={titulo}
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.05]"
            />
          )

          return (
            <motion.div
              key={foto}
              data-item
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.7, ease: EASE, delay: Math.min(i * 0.05, 0.3) }}
              className="shrink-0 snap-start"
            >
              <button
                onClick={() => onSelecionar(i)}
                className="group block"
                aria-label={`Abrir foto ${i + 1} de ${titulo}`}
              >
                <div className={moldura}>{imagem}</div>
              </button>
            </motion.div>
          )
        })}

      </div>
    </section>
  )
}
