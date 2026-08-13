import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { CATEGORIAS, LIBRARY } from '../lib/site'
import { FaixaFotos } from '../components/ui/Carrossel'
import { SectionHead } from '../components/ui'

const EASE = [0.16, 1, 0.3, 1] as const

/* ============================================================
   Visualizador em tela cheia
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
        className="t-eyebrow absolute right-[var(--gutter)] top-8 z-10 flex items-center gap-2.5 rounded-full border border-cream/25 px-5 py-2.5 text-cream/70 transition-colors hover:bg-cream hover:text-ink"
      >
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
        Fechar
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
          className="max-h-[84svh] max-w-[92vw] rounded-2xl object-contain"
        />
      </AnimatePresence>

      <p className="t-eyebrow t-mono absolute bottom-8 text-cream/45">
        {String(indice + 1).padStart(2, '0')} / {String(fotos.length).padStart(2, '0')}
      </p>
    </motion.div>
  )
}

/* ============================================================
   Galeria: uma faixa por categoria
   ============================================================ */
/* A capa (reprocessada em alta qualidade) abre a faixa. O visualizador
   precisa da mesma ordem, senão o índice clicado abriria outra foto. */
function fotosDe(id: string, capa: string) {
  const todas = (LIBRARY as Record<string, readonly string[]>)[id] ?? []
  return [capa, ...todas.filter((f) => f !== capa)]
}

export function Galeria() {
  const [aberta, setAberta] = useState<{ cat: string; i: number } | null>(null)

  const fotosAbertas = aberta
    ? fotosDe(
        aberta.cat,
        CATEGORIAS.find((c) => c.id === aberta.cat)?.capa ?? ''
      )
    : []

  const total = CATEGORIAS.reduce(
    (n, c) =>
      n + ((LIBRARY as Record<string, readonly string[]>)[c.id]?.length ?? 0),
    0
  )

  return (
    <section id="galeria" className="bg-cream-warm py-[var(--section-y)] scroll-mt-20">
      <div className="shell">
        <SectionHead
          eyebrow="Galeria"
          title="Todas as fotos da pousada."
          lead={`${total} imagens feitas na própria propriedade, organizadas por ambiente. Arraste para o lado em qualquer faixa.`}
          className="mb-6"
        />
      </div>

      {CATEGORIAS.map((c, i) => (
        <FaixaFotos
          key={c.id}
          indice={i}
          titulo={c.titulo}
          frase={c.frase}
          fotos={fotosDe(c.id, c.capa)}
          onSelecionar={(idx) => setAberta({ cat: c.id, i: idx })}
        />
      ))}

      <AnimatePresence>
        {aberta && (
          <Lightbox
            fotos={fotosAbertas}
            indice={aberta.i}
            onFechar={() => setAberta(null)}
            onNavegar={(n) => setAberta({ cat: aberta.cat, i: n })}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
