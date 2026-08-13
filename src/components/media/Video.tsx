import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

function prefereMenosMovimento() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/* ============================================================
   VideoBackdrop — vídeo de fundo silencioso.
   · só baixa e toca quando entra em cena
   · congela no pôster para quem pede menos movimento
   · se o autoplay for bloqueado, o pôster continua valendo
   ============================================================ */
export function VideoBackdrop({
  src,
  srcMobile,
  className = '',
}: {
  src: string
  srcMobile?: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [pronto, setPronto] = useState(false)

  // 5,5 MB em rede móvel é caro: telas pequenas recebem o corte leve.
  const [fonte] = useState(() =>
    srcMobile && typeof window !== 'undefined' && window.innerWidth < 768
      ? srcMobile
      : src
  )

  useEffect(() => {
    const el = ref.current
    if (!el || prefereMenosMovimento()) return

    const obs = new IntersectionObserver(
      ([entrada]) => {
        // Só toca depois que o vídeo aparece. Se tocasse durante o fade,
        // ele já teria avançado alguns segundos ao ficar visível e o corte
        // com o pôster (primeiro quadro) apareceria como um salto.
        if (entrada.isIntersecting && pronto) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [pronto])

  return (
    <>
      {/* Sem pôster: só o vídeo. Até ele estar pronto, fica o fundo escuro
          da seção, sem imagem estática aparecendo antes. */}
      <motion.video
        ref={ref}
        src={fonte}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        onCanPlay={(e) => {
          const v = e.currentTarget
          v.currentTime = 0
          setPronto(true)
          v.play().catch(() => {})
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: pronto ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    </>
  )
}

/* ============================================================
   VideoPlayer — vídeo com controle de som e play/pause.
   Usado na seção de tour: preload="none" para não pesar a página.
   ============================================================ */
export function VideoPlayer({
  src,
  poster,
  className = '',
}: {
  src: string
  poster: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [tocando, setTocando] = useState(false)
  const [mudo, setMudo] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || prefereMenosMovimento()) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.35 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const alternarPlay = () => {
    const el = ref.current
    if (!el) return
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }

  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted={mudo}
        loop
        playsInline
        preload="none"
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
        className="h-full w-full object-cover"
      />

      {/* Controles */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-ink/70 to-transparent p-5">
        <button
          onClick={alternarPlay}
          aria-label={tocando ? 'Pausar vídeo' : 'Reproduzir vídeo'}
          className="t-eyebrow flex items-center gap-2.5 rounded-full border border-cream/25 px-4 py-2.5 text-cream backdrop-blur-md transition-colors duration-500 hover:bg-cream hover:text-ink"
        >
          {tocando ? (
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
              <path d="M7 4.5v15l13-7.5z" />
            </svg>
          )}
          {tocando ? 'Pausar' : 'Assistir'}
        </button>

        <button
          onClick={() => setMudo((v) => !v)}
          aria-label={mudo ? 'Ativar som' : 'Desativar som'}
          aria-pressed={!mudo}
          className="t-eyebrow flex items-center gap-2.5 rounded-full border border-cream/25 px-4 py-2.5 text-cream backdrop-blur-md transition-colors duration-500 hover:bg-cream hover:text-ink"
        >
          {mudo ? (
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M11 5 6 9H3v6h3l5 4V5z" strokeLinejoin="round" />
              <path d="m17 9 4 6m0-6-4 6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M11 5 6 9H3v6h3l5 4V5z" strokeLinejoin="round" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" strokeLinecap="round" />
            </svg>
          )}
          {mudo ? 'Som' : 'Mudo'}
        </button>
      </div>
    </div>
  )
}
