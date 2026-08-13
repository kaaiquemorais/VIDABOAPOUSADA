import { motion } from 'framer-motion'

import { HERO, NUMEROS, VIDEO } from '../lib/site'
import { VideoPlayer } from '../components/media/Video'
import { CountUp, Marquee } from '../components/motion/Interactive'
import { Reveal, Stagger, StaggerItem, SplitText } from '../components/motion/Text'
import { Eyebrow } from '../components/ui'

const EASE = [0.16, 1, 0.3, 1] as const

const DESTAQUES = [
  {
    t: 'Sete chalés, e só',
    d: 'Uma ocupação pequena por opção, para que a piscina e as áreas comuns nunca fiquem cheias.',
  },
  {
    t: 'Café da manhã incluso',
    d: 'Café mineiro moído na hora, bolos e pães assados no dia, frutas e doces caseiros.',
  },
  {
    t: 'Vista para a serra',
    d: 'Todos os chalés têm varanda voltada para o vale, com a Mantiqueira ao fundo.',
  },
  {
    t: 'Espaço para as crianças',
    d: 'Playground, gramado livre e toboágua na piscina, tudo dentro da propriedade.',
  },
]

/* ============================================================
   Faixa fina de números, logo abaixo do hero
   ============================================================ */
export function Numeros() {
  return (
    <section className="surface-dark overflow-hidden border-t border-cream/10">
      <div className="py-4 sm:hidden">
        <Marquee speed={26}>
          {Array.from({ length: 3 }).map((_, volta) => (
            <span key={volta} className="flex shrink-0 items-center">
              {NUMEROS.map((n) => (
                <span
                  key={`${volta}-${n.label}`}
                  className="flex items-baseline gap-2.5 whitespace-nowrap px-5"
                >
                  <span className="font-display text-xl leading-none tracking-tightest text-cream">
                    {n.valor}
                    {n.sufixo}
                  </span>
                  <span className="t-eyebrow text-cream/40">{n.label}</span>
                  <span className="ml-5 text-terra-500">✦</span>
                </span>
              ))}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="shell hidden sm:block">
        <Stagger className="grid grid-cols-4 py-5">
          {NUMEROS.map((n) => (
            <StaggerItem key={n.label}>
              <div className="flex items-baseline gap-2 whitespace-nowrap">
                <p className="font-display text-[clamp(1.15rem,1.8vw,1.7rem)] leading-none tracking-tightest text-cream">
                  <CountUp to={n.valor} suffix={n.sufixo} duration={2} />
                </p>
                <p className="t-eyebrow text-[0.6rem] text-cream/40 lg:text-[0.68rem]">
                  {n.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ============================================================
   A pousada: apresentação, destaques e vídeo
   ============================================================ */
export function Pousada() {
  return (
    <section id="pousada" className="section shell scroll-mt-20">
      {/* Imagem e texto abrem e fecham na mesma linha */}
      <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
        <div className="flex flex-col lg:col-span-5">
          <Eyebrow>A pousada</Eyebrow>
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 1.3, ease: EASE }}
            className="mt-5 flex-1 overflow-hidden rounded-3xl"
          >
            <img
              src={HERO.chales}
              alt="Vista aérea dos chalés da Vida Boa Pousada"
              loading="lazy"
              className="h-full min-h-[20rem] w-full object-cover"
            />
          </motion.div>
        </div>

        <div className="flex flex-col justify-between lg:col-span-7">
          <Eyebrow className="invisible hidden lg:block">.</Eyebrow>

          <div className="mt-5 flex flex-1 flex-col justify-between gap-10">
            <Reveal>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.14] tracking-display text-ink">
                Cada chalé é uma construção independente, com estacionamento na
                porta e varanda voltada para o vale. Sem recepção no caminho e
                sem parede em comum com o vizinho.
              </h2>
            </Reveal>

            <Stagger className="grid gap-7 sm:grid-cols-2">
              {DESTAQUES.map((item) => (
                <StaggerItem key={item.t}>
                  <h3 className="font-display text-xl tracking-display text-ink">
                    {item.t}
                  </h3>
                  <p className="t-body mt-1.5 text-ink/55">{item.d}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>

      {/* Vídeo alinhado à mesma coluna do texto acima */}
      <div className="mt-20 lg:mt-24">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Em vídeo</Eyebrow>
            <SplitText
              as="h2"
              text="A pousada por dentro."
              className="t-display mt-4 max-w-[14ch] text-ink"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="t-body max-w-[34ch] text-ink/55 sm:text-right">
              Imagens gravadas na própria pousada, sem produção.
            </p>
          </Reveal>
        </div>

        <Reveal variant="mask" duration={1.2} className="mt-8">
          <VideoPlayer
            src={VIDEO.tour}
            poster={VIDEO.tourPoster}
            className="aspect-[16/9] w-full overflow-hidden rounded-3xl bg-ink"
          />
        </Reveal>
      </div>
    </section>
  )
}
