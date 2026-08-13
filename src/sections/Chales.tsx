import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { CHALES, HERO } from '../lib/site'
import { Reveal, Stagger, StaggerItem, SplitText } from '../components/motion/Text'
import { Button, Arrow, Eyebrow, SectionHead } from '../components/ui'
import { useReserva } from '../components/reserva/contexto'

const EASE = [0.16, 1, 0.3, 1] as const

const ENXOVAL = [
  'Cama king-size',
  'Cortina blackout',
  'Ar quente e frio',
  'TV 55"',
  'Wi-Fi',
  'Frigobar',
  'Varanda privativa',
  'Vaga na porta',
  'Enxoval completo',
  'Amenities',
  'Secador de cabelo',
  'Café da manhã',
]

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
      <div className={`lg:col-span-7 ${invertido ? 'lg:order-2' : ''}`}>
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

        <div className="mt-3 flex gap-3">
          {chale.imagens.map((img, i) => (
            <button
              key={img}
              onClick={() => setAtiva(i)}
              aria-label={`Foto ${i + 1} do ${chale.nome}`}
              className={`relative aspect-[4/3] w-24 overflow-hidden rounded-xl transition-all duration-500 ease-expo ${
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

      <div className={`lg:col-span-5 ${invertido ? 'lg:order-1' : ''}`}>
        <Reveal>
          <span className="t-eyebrow t-mono text-terra-500">
            0{index + 1}
          </span>
          <h3 className="t-title mt-4 font-display text-ink">{chale.nome}</h3>
          <p className="t-lead mt-3 font-display tracking-display text-ink/70">
            {chale.resumo}
          </p>
          <p className="t-body mt-4 max-w-[46ch] text-ink/55">
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

export function Chales() {
  const { abrir } = useReserva()

  return (
    <section id="chales" className="section bg-cream-warm scroll-mt-20">
      <div className="shell">
        <SectionHead
          eyebrow="Acomodações"
          title="Sete chalés independentes."
          lead="Cada um com vaga privativa, varanda voltada para o vale e entrada direta, sem corredores ou áreas compartilhadas."
          className="mb-14"
        />

        <div className="flex flex-col gap-20 lg:gap-28">
          {CHALES.map((c, i) => (
            <ChaleBloco key={c.nome} chale={c} index={i} />
          ))}
        </div>
      </div>

      {/* O que está incluso em todos */}
      <div className="shell mt-20 lg:mt-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>Em todos os chalés</Eyebrow>
            <SplitText
              as="h3"
              text="O que já está incluso."
              className="t-title mt-4 max-w-[14ch] text-ink"
            />
            <Reveal delay={0.2} className="mt-6">
              <p className="t-body max-w-[40ch] text-ink/55">
                Todos os chalés recebem o mesmo padrão de enxoval, amenities e
                equipamentos, independentemente da configuração escolhida.
              </p>
            </Reveal>
            <Reveal delay={0.35} className="mt-8">
              <Button onClick={abrir}>
                Consultar disponibilidade <Arrow />
              </Button>
            </Reveal>
          </div>

          <Stagger
            stagger={0.04}
            className="grid grid-cols-2 gap-x-8 self-start sm:grid-cols-3 lg:col-span-7"
          >
            {ENXOVAL.map((item) => (
              <StaggerItem key={item}>
                <p className="t-body border-b border-ink/10 py-3.5 text-ink/65">
                  {item}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {/* Detalhe do banheiro, alinhado à mesma grade */}
      <div className="shell mt-20 lg:mt-28">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal variant="mask" duration={1.2}>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl">
              <img
                src={HERO.banho}
                alt="Banheiro do chalé, com box de vidro"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Eyebrow>Banheiro</Eyebrow>
            <SplitText
              as="h3"
              text="Amplo, com box de vidro."
              className="t-title mt-4 max-w-[16ch] text-ink"
            />
            <Reveal delay={0.2} className="mt-5">
              <p className="t-body max-w-[42ch] text-ink/55">
                Bancada em granito, box de vidro, água quente e amenities
                inclusos. Toalhas de banho e de rosto trocadas diariamente.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
