import { useEffect } from 'react'
import Lenis from 'lenis'

import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { ProgressBar } from './components/motion/Interactive'
import { ReservaProvider } from './components/reserva/contexto'
import { ModalReserva } from './components/reserva/ModalReserva'

import { Hero } from './sections/Hero'
import { Numeros, Pousada } from './sections/Pousada'
import { Chales } from './sections/Chales'
import { Estrutura } from './sections/Estrutura'
import { Galeria } from './sections/Galeria'
import { Depoimentos, Localizacao } from './sections/Localizacao'

/* Scroll suave global (desligado para quem pede menos movimento) */
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}

export default function App() {
  useSmoothScroll()

  return (
    <ReservaProvider>
      <ProgressBar />
      <Nav />

      <main>
        <Hero />
        <Numeros />
        <Pousada />
        <Chales />
        <Estrutura />
        <Galeria />
        <Depoimentos />
        <Localizacao />
      </main>

      <Footer />
      <ModalReserva />
    </ReservaProvider>
  )
}
