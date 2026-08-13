import { useEffect, useMemo, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { FILTROS, LIBRARY } from '../lib/site'
import { PageHero } from '../components/layout/PageHero'
import { Reveal } from '../components/motion/Text'
import { Button, Arrow } from '../components/ui'
import { useReserva } from '../components/reserva/contexto'

const EASE = [0.16, 1, 0.3, 1] as const

type FiltroId = (typeof FILTROS)[number]['id']

/* Ordem de exibição do "Tudo" — intercala categorias para o mosaico
   não ficar com blocos monotemáticos. */
function montarTudo(): string[] {
  const grupos = [
    LIBRARY.quartos,
    LIBRARY.piscina,
    LIBRARY.pordosol,
    LIBRARY.comidas,
    LIBRARY.local,
    LIBRARY.noite,
    LIBRARY.geral,
    LIBRARY.brinquedos,
    LIBRARY.animais,
    LIBRARY.banheiros,
  ] as readonly (readonly string[])[]

  const saida: string[] = []
  const maior = Math.max(...grupos.map((g) => g.length))
  for (let i = 0; i < maior; i++) {
    for (const g of grupos) if (g[i]) saida.push(g[i])
  }
  return saida
}

/* ============================================================
   Lightbox
   ============================================================ */
function Lightbox({
  fotos,
  indice,
  onFechar,
  onNavegar,
}: {
  fotos: string[]
  indice: number
  onFechar: () => void
  onNavegar: (n: number) => void
}) {
  const anterior = useCallback(
    () => onNavegar((indice - 1 + fotos.length) % fotos.length),
    [indice, fotos.length, onNavegar]
  )
  const proxima = useCallback(
    () => onNavegar((indice + 1) % fotos.length),
    [indice, fotos.length, onNavegar]
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onFechar()
      if (e.key === 'ArrowLeft') anterior()
      if (e.key === 'ArrowRight') proxima()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onFechar, anterior, proxima])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de fotos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="fixed inset-0 z-[400] flex items-center justify-center bg-ink/96 backdrop-blur-md"
      onClick={onFechar}
    >
      <button
        onClick={onFechar}
        aria-label="Fechar"
        className="t-eyebrow absolute right-[var(--gutter)] top-8 z-10 text-cream/60 transition-colors hover:text-cream"
      >
        Fechar ✕
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          anterior()
        }}
        aria-label="Foto anterior"
        className="absolute left-3 z-10 grid h-12 w-12 place-items-center rounded-full text-cream/50 transition-colors hover:text-cream md:left-8"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
          <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          proxima()
        }}
        aria-label="Próxima foto"
        className="absolute right-3 z-10 grid h-12 w-12 place-items-center rounded-full text-cream/50 transition-colors hover:text-cream md:right-8"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={fotos[indice]}
          src={fotos[indice]}
          alt={`Foto ${indice + 1} de ${fotos.length}`}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-h-[84svh] max-w-[92vw] object-contain"
        />
      </AnimatePresence>

      <p className="t-eyebrow t-mono absolute bottom-8 text-cream/45">
        {String(indice + 1).padStart(2, '0')} / {String(fotos.length).padStart(2, '0')}
      </p>
    </motion.div>
  )
}

/* ============================================================
   PÁGINA
   ============================================================ */
export default function Galeria() {
  const { abrir } = useReserva()
  const [params] = useSearchParams()

  // O carrossel da home aponta para /galeria?c=piscina e afins
  const inicial = params.get('c')
  const [filtro, setFiltro] = useState<FiltroId>(
    FILTROS.some((f) => f.id === inicial) ? (inicial as FiltroId) : 'todas'
  )
  const [aberta, setAberta] = useState<number | null>(null)

  const fotos = useMemo(() => {
    if (filtro === 'todas') return montarTudo()
    return [...((LIBRARY as Record<string, readonly string[]>)[filtro] ?? [])]
  }, [filtro])

  return (
    <>
      <PageHero
        index="03 / 04"
        eyebrow="Galeria"
        title="O que você vê é o que tem."
        lead="Cento e trinta e sete fotos tiradas dentro da pousada. Se está na tela, está lá quando você chegar."
        image="/img/noite/563860545.webp"
        alt="Vista aérea noturna da pousada iluminada"
      />

      {/* Filtros */}
      <section className="sticky top-[3.6rem] z-[100] border-b border-ink/8 bg-cream/85 backdrop-blur-xl md:top-[4.1rem]">
        <div className="shell flex gap-1.5 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTROS.map((f) => {
            const ativo = filtro === f.id
            return (
              <button
                key={f.id}
                onClick={() => setFiltro(f.id)}
                className={`t-eyebrow relative shrink-0 rounded-full px-4 py-2.5 transition-colors duration-400 ${
                  ativo ? 'text-cream' : 'text-ink/50 hover:text-ink'
                }`}
              >
                {ativo && (
                  <motion.span
                    layoutId="pilula-filtro"
                    transition={{ duration: 0.5, ease: EASE }}
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Mosaico */}
      <section className="shell py-12 md:py-16">
        <motion.div
          layout
          className="columns-2 gap-3 md:columns-3 xl:columns-4 [&>*]:mb-3"
        >
          <AnimatePresence mode="popLayout">
            {fotos.map((src, i) => (
              <motion.button
                key={src}
                layout
                initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.65,
                  ease: EASE,
                  delay: Math.min(i * 0.018, 0.5),
                }}
                onClick={() => setAberta(i)}
                className="group relative block w-full break-inside-avoid overflow-hidden rounded-3xl bg-cream-deep"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="w-full transition-transform duration-[1100ms] ease-expo group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
                <span className="t-eyebrow t-mono absolute bottom-3 left-3 translate-y-2 text-cream opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-16 flex flex-col items-center gap-5 text-center">
          <p className="t-eyebrow text-ink/40">
            {fotos.length} fotos · {FILTROS.find((f) => f.id === filtro)?.label}
          </p>
          <Button onClick={abrir}>
            Reservar sua data <Arrow />
          </Button>
        </Reveal>
      </section>

      <AnimatePresence>
        {aberta !== null && (
          <Lightbox
            fotos={fotos}
            indice={aberta}
            onFechar={() => setAberta(null)}
            onNavegar={setAberta}
          />
        )}
      </AnimatePresence>
    </>
  )
}
