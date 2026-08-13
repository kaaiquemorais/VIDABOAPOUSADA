import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { ESTRUTURA, HERO, LIBRARY } from '../lib/site'
import { PageHero } from '../components/layout/PageHero'
import { Reveal, SplitText, Stagger, StaggerItem, ScrollReveal } from '../components/motion/Text'
import { ImageReveal, ParallaxImage, SpotlightCard } from '../components/motion/Interactive'
import { Button, Arrow, Eyebrow, SectionHead } from '../components/ui'

const EASE = [0.16, 1, 0.3, 1] as const

/* ============================================================
   Trilho horizontal comandado pelo scroll vertical
   ============================================================ */
function TrilhoHorizontal() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-72%'])

  return (
    <section ref={ref} className="relative h-[320svh] bg-cream-warm">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="shell mb-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow>Lazer</Eyebrow>
              <h2 className="t-title mt-4 max-w-[14ch] font-display text-ink">
                O dia tem mais horas aqui.
              </h2>
            </div>
            <span className="t-eyebrow hidden text-ink/35 md:block">
              Continue rolando →
            </span>
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-5 pl-[var(--gutter)] will-transform">
          {ESTRUTURA.map((item, i) => (
            <SpotlightCard
              key={item.titulo}
              className="group relative h-[52svh] w-[min(84vw,30rem)] shrink-0 overflow-hidden rounded-3xl bg-ink"
            >
              <img
                src={item.imagem}
                alt={item.titulo}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[1400ms] ease-expo group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end p-7">
                <span className="t-eyebrow t-mono text-gold-300/70">
                  0{i + 1}
                </span>
                <h3 className="t-title mt-3 font-display text-cream">
                  {item.titulo}
                </h3>
                <p className="t-body mt-3 max-w-[32ch] text-cream/65">
                  {item.texto}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================================
   Café da manhã — mosaico
   ============================================================ */
function Cafe() {
  const fotos = [
    LIBRARY.comidas[3],
    LIBRARY.comidas[7],
    LIBRARY.comidas[11],
    LIBRARY.comidas[15],
  ]

  return (
    <section className="section shell">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHead
            eyebrow="Café da manhã"
            title="A refeição que ninguém pula."
            lead="Café mineiro torrado e moído na hora. Doce de leite, bolo, pão quente, fruta da estação e ovo do jeito que você pedir."
          />
          <Reveal delay={0.3} className="mt-9">
            <p className="t-eyebrow text-ink/40">
              Servido das 8h às 10h · incluso na diária
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:col-span-7">
          {fotos.map((f, i) => (
            <ImageReveal
              key={f}
              src={f}
              alt="Café da manhã da Vida Boa Pousada"
              ratio={i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-square'}
              delay={i * 0.1}
              className={`rounded-3xl ${i === 1 ? 'mt-8' : ''} ${i === 3 ? 'mt-8' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Roteiro do dia — linha do tempo
   ============================================================ */
const ROTEIRO = [
  { hora: '07h', texto: 'A névoa ainda está no vale. Sagui na varanda.' },
  { hora: '08h', texto: 'Café posto. Bolo saindo do forno.' },
  { hora: '11h', texto: 'Piscina vazia. Serra de fundo, sol firme.' },
  { hora: '15h', texto: 'Toboágua para as crianças. Rede para você.' },
  { hora: '18h', texto: 'O céu vira laranja. Ninguém fala nada.' },
  { hora: '21h', texto: 'Luz baixa nos caminhos. Céu limpo, sem ruído.' },
]

function Roteiro() {
  return (
    <section className="surface-dark grain section relative overflow-hidden">
      <div className="shell relative z-10">
        <SectionHead
          eyebrow="Um dia aqui"
          title="Programação: nenhuma."
          tone="light"
          lead="Ninguém vai te chamar para nada. Mesmo assim o dia se organiza sozinho."
          className="mb-16"
        />

        <Stagger stagger={0.09} className="grid gap-0 md:grid-cols-2 lg:grid-cols-3">
          {ROTEIRO.map((r) => (
            <StaggerItem key={r.hora}>
              <div className="group flex items-baseline gap-6 border-t border-cream/10 py-7 transition-colors duration-500 hover:border-terra-500/50">
                <span className="t-mono font-display text-3xl leading-none text-terra-400 transition-transform duration-500 ease-expo group-hover:translate-x-1">
                  {r.hora}
                </span>
                <p className="t-body max-w-[26ch] text-cream/60">{r.texto}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ============================================================
   PÁGINA
   ============================================================ */
export default function Estrutura() {

  return (
    <>
      <PageHero
        index="02 / 04"
        eyebrow="Estrutura"
        title="Piscina, campo e mato de verdade."
        lead="Mata nativa em volta, lago no fundo do terreno e um vale que troca de cor três vezes por dia."
        image={HERO.piscinaNevoa}
        alt="Piscina com toboágua e névoa sobre a serra ao fundo"
      />

      {/* Abertura */}
      <section className="section shell">
        <ScrollReveal
          text="Não construímos uma pousada dentro da paisagem. Encaixamos sete casas nela e deixamos o resto quieto."
          className="mx-auto max-w-[24ch] text-center font-display text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.1] tracking-display text-ink"
        />
      </section>

      <TrilhoHorizontal />

      <Cafe />

      {/* Full bleed aérea */}
      <section className="relative">
        <ParallaxImage
          src={HERO.aereaDia}
          alt="Vista aérea do terreno da pousada, cercado por mata e montanhas"
          className="h-[70svh] min-h-[440px]"
          overlay="bg-ink/40"
        />
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="shell">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="t-eyebrow text-cream/60"
            >
              O que você vê da varanda
            </motion.p>
            <SplitText
              as="p"
              text="Mata, montanha e mais nada."
              className="t-title mt-4 max-w-[14ch] font-display text-cream"
            />
          </div>
        </div>
      </section>

      <Roteiro />

      {/* Fecho da página: entrega para a galeria. A reserva fica no rodapé. */}
      <section className="section shell text-center">
        <SectionHead
          eyebrow="Próximo"
          title="Tem foto de tudo isso."
          lead="Cento e trinta e sete, para ser exato. Nenhuma comprada."
          align="center"
          className="items-center"
        />
        <Reveal delay={0.25} className="mt-10 flex justify-center">
          <Button to="/galeria">
            Abrir a galeria <Arrow />
          </Button>
        </Reveal>
      </section>
    </>
  )
}
