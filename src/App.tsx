import { useEffect, type ReactNode } from 'react'
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'

import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { ProgressBar } from './components/motion/Interactive'
import { ReservaProvider } from './components/reserva/contexto'
import { ModalReserva } from './components/reserva/ModalReserva'

import Home from './pages/Home'
import Chales from './pages/Chales'
import Estrutura from './pages/Estrutura'
import Galeria from './pages/Galeria'
import Localizacao from './pages/Localizacao'
import NaoEncontrado from './pages/NaoEncontrado'

const EASE = [0.16, 1, 0.3, 1] as const

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

/* Volta ao topo a cada troca de página */
function useScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
}

/* Envelope de transição entre páginas */
function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
      <Footer />
    </motion.main>
  )
}

/* Cortina que cobre a tela na troca de rota */
function Curtain() {
  const { pathname } = useLocation()
  return (
    <motion.div
      key={pathname}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[300] origin-top bg-ink"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.85, ease: EASE }}
      style={{ transformOrigin: 'top' }}
    />
  )
}

export default function App() {
  const location = useLocation()
  useSmoothScroll()
  useScrollTop()

  return (
    <ReservaProvider>
      <ProgressBar />
      <Nav />
      <Curtain />
      <ModalReserva />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageShell>
                <Home />
              </PageShell>
            }
          />
          <Route
            path="/chales"
            element={
              <PageShell>
                <Chales />
              </PageShell>
            }
          />
          <Route
            path="/estrutura"
            element={
              <PageShell>
                <Estrutura />
              </PageShell>
            }
          />
          <Route
            path="/galeria"
            element={
              <PageShell>
                <Galeria />
              </PageShell>
            }
          />
          <Route
            path="/localizacao"
            element={
              <PageShell>
                <Localizacao />
              </PageShell>
            }
          />
          <Route
            path="*"
            element={
              <PageShell>
                <NaoEncontrado />
              </PageShell>
            }
          />
        </Routes>
      </AnimatePresence>
    </ReservaProvider>
  )
}
