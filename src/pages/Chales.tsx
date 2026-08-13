import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { CHALES, HERO } from '../lib/site'
import { useReserva } from '../components/reserva/contexto'
import { PageHero } from '../components/layout/PageHero'
import { Reveal, Stagger, StaggerItem, SplitText } from '../components/motion/Text'
import { ImageReveal, TiltCard, ParallaxImage } from '../components/motion/Interactive'
import { Button, Arrow, Eyebrow, SectionHead } from '../components/ui'

const EASE = [0.16, 1, 0.3, 1] as const

const ENXOVAL = [
  'Cama king',
  'Blackout',
  'Ar-quente e frio',
  'TV 55"',
  'Wi-Fi',
  'Frigobar',
  'Varanda',
  'Vaga privativa',
  'Enxoval premium',
  'Amenities',
  'Secador',
  'Café da manhã',
]

/* ============================================================
   Um chalé — imagem grande + miniaturas trocáveis
   ============================================================ */
function ChaleBloco({
  chale,
  index,
}: {
  chale: (typeof CHALES)[number]
  index: number
}) {
  const [ativa, setAtiva] = useState(0)
  const invertido = index % 2 === 1

  return (
    <article className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
      {/* Imagem */}
      <div
        className={`lg:col-span-7 ${invertido ? 'lg:order-2' : ''}`}
      >
        <TiltCard max={4} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink">
            <AnimatePresence mode="wait">
              <motion.img
                key={chale.imagens[ativa]}
                src={chale.imagens[ativa]}
                alt={`${chale.nome}, Vida Boa Pousada`}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
        </TiltCard>

        {/* Miniaturas */}
        <div className="mt-3 flex gap-3">
          {chale.imagens.map((img, i) => (
            <button
              key={img}
              onClick={() => setAtiva(i)}
              aria-label={`Foto ${i + 1} do ${chale.nome}`}
              className={`relative h-16 w-24 overflow-hidden rounded-2xl transition-all duration-500 ease-expo ${
                ativa === i
                  ? 'opacity-100 ring-1 ring-terra-500 ring-offset-2 ring-offset-cream'
                  : 'opacity-45 hover:opacity-80'
              }`}
            >
              <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Texto */}
      <div className={`lg:col-span-5 ${invertido ? 'lg:order-1' : ''}`}>
        <Reveal>
          <span className="t-eyebrow t-mono text-terra-500">
            0{index + 1}
          </span>
          <h2 className="t-title mt-4 font-display text-ink">{chale.nome}</h2>
          <p className="t-lead mt-4 font-display tracking-display text-ink/70">
            {chale.resumo}
          </p>
          <p className="t-body mt-5 max-w-[42ch] text-ink/55">
            {chale.descricao}
          </p>
        </Reveal>

        <Stagger className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-ink/10 pt-7">
          {chale.itens.map((item) => (
            <StaggerItem key={item}>
              <span className="t-body flex items-center gap-2.5 text-ink/70">
                <span className="h-1 w-1 shrink-0 rounded-full bg-terra-500" />
                {item}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </article>
  )
}

/* ============================================================
   PÁGINA
   ============================================================ */
export default function Chales() {
  const { abrir } = useReserva()

  return (
    <>
      <PageHero
        index="01 / 04"
        eyebrow="Acomodações"
        title="Casa, não quarto."
        lead="Sete construções soltas na encosta. Cada uma com sua vaga, sua varanda e o vale inteiro na frente."
        image={HERO.quartoVista}
        alt="Quarto com porta de vidro aberta para a varanda e vista da serra"
      />

      {/* Blocos */}
      <section className="section shell">
        <div className="flex flex-col gap-24 lg:gap-36">
          {CHALES.map((c, i) => (
            <ChaleBloco key={c.nome} chale={c} index={i} />
          ))}
        </div>
      </section>

      {/* Enxoval — faixa escura */}
      <section className="surface-dark grain section relative overflow-hidden">
        <div className="shell relative z-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow tone="light">Em todos eles</Eyebrow>
              <SplitText
                as="h2"
                text="O que já está lá antes de você chegar."
                className="t-display mt-6 max-w-[12ch] font-display text-cream"
              />
            </div>

            <Stagger
              stagger={0.04}
              className="grid grid-cols-2 gap-x-8 gap-y-0 self-center sm:grid-cols-3 lg:col-span-7"
            >
              {ENXOVAL.map((item) => (
                <StaggerItem key={item}>
                  <p className="t-body border-b border-cream/10 py-3.5 text-cream/60">
                    {item}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Banheiro / detalhe */}
      <section className="section shell">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <ImageReveal
            src={HERO.banho}
            alt="Banheiro amplo com box de vidro"
            ratio="aspect-[4/5]"
            className="rounded-3xl"
          />
          <div>
            <SectionHead
              eyebrow="Detalhe"
              title="Toalha com nome, sabonete que você leva."
              lead="Box amplo, água quente que não falha e amenities de erva-doce. É a coisa pequena que fica na memória depois."
            />
            <Reveal delay={0.3} className="mt-9">
              <Button onClick={abrir}>
                Consultar disponibilidade <Arrow />
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Transição para estrutura */}
      <section className="relative">
        <ParallaxImage
          src={HERO.fachada}
          alt="Fachada dos chalés com vaga de estacionamento na porta"
          className="h-[60svh] min-h-[400px]"
          overlay="bg-ink/55"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="shell">
            <SplitText
              as="p"
              text="Você estaciona e entra. Ninguém no meio do caminho."
              className="t-title max-w-[16ch] font-display text-cream"
            />
            <Reveal delay={0.25} className="mt-8">
              <Button to="/estrutura" variant="ghost">
                Ver a estrutura <Arrow />
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
