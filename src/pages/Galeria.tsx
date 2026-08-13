import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { CATEGORIAS, LIBRARY } from '../lib/site'
import { PageHero } from '../components/layout/PageHero'
import { Reveal } from '../components/motion/Text'
import { Button, Arrow } from '../components/ui'
import { FaixaFotos } from '../components/ui/Carrossel'
import { useReserva } from '../components/reserva/contexto'

const EASE = [0.16, 1, 0.3, 1] as const


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
   PÁGINA — uma faixa por categoria, cada uma com seu carrossel
   ============================================================ */
export default function Galeria() {
  const { abrir } = useReserva()
  const [params] = useSearchParams()

  // { categoria, índice } da foto aberta no visualizador
  const [aberta, setAberta] = useState<{ cat: string; i: number } | null>(null)

  const fotosAbertas = aberta
    ? [...((LIBRARY as Record<string, readonly string[]>)[aberta.cat] ?? [])]
    : []

  // O carrossel da home aponta para /galeria?c=piscina: rola até a faixa
  const alvo = params.get('c')
  useEffect(() => {
    if (!alvo) return
    const el = document.getElementById(`faixa-${alvo}`)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 400)
  }, [alvo])

  const total = CATEGORIAS.reduce(
    (n, c) => n + ((LIBRARY as Record<string, readonly string[]>)[c.id]?.length ?? 0),
    0
  )

  return (
    <>
      <PageHero
        index="03 / 04"
        eyebrow="Galeria"
        title="O que você vê é o que tem."
        lead={`${total} fotos tiradas dentro da pousada. Se está na tela, está lá quando você chegar.`}
        image="/img/noite/563860545.webp"
        alt="Vista aérea noturna da pousada iluminada"
      />

      <section className="py-10 md:py-14">
        {CATEGORIAS.map((c, i) => (
          <div key={c.id} id={`faixa-${c.id}`} className="scroll-mt-24">
            <FaixaFotos
              indice={i}
              titulo={c.titulo}
              frase={c.frase}
              fotos={
                (LIBRARY as Record<string, readonly string[]>)[c.id] ?? []
              }
              onSelecionar={(idx) => setAberta({ cat: c.id, i: idx })}
            />
          </div>
        ))}

        <Reveal className="shell mt-10 flex flex-col items-center gap-5 text-center">
          <p className="t-eyebrow text-ink/40">
            {total} fotos · {CATEGORIAS.length} categorias
          </p>
          <Button onClick={abrir}>
            Reservar sua data <Arrow />
          </Button>
        </Reveal>
      </section>

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
    </>
  )
}
