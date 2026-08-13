import { ESTRUTURA, HERO, LIBRARY } from '../lib/site'
import { Reveal, Stagger, StaggerItem, SplitText } from '../components/motion/Text'
import { ParallaxImage, SpotlightCard } from '../components/motion/Interactive'
import { Eyebrow, SectionHead } from '../components/ui'

const ROTEIRO = [
  { hora: '08h', texto: 'Café da manhã servido na área comum, com bolos e pães do dia.' },
  { hora: '10h', texto: 'Piscina liberada, com espreguiçadeiras e sombra das palmeiras.' },
  { hora: '15h', texto: 'Toboágua e playground em funcionamento para as crianças.' },
  { hora: '18h', texto: 'Pôr do sol visto da área da piscina e das varandas dos chalés.' },
  { hora: '20h', texto: 'Caminhos iluminados entre os chalés e a recepção.' },
  { hora: '22h', texto: 'Silêncio na propriedade, com céu aberto e vista para o vale.' },
]

export function Estrutura() {
  const fotosCafe = [
    LIBRARY.comidas[3],
    LIBRARY.comidas[7],
    LIBRARY.comidas[11],
    LIBRARY.comidas[15],
  ]

  return (
    <section id="estrutura" className="scroll-mt-20">
      {/* Lazer e serviços */}
      <div className="section shell">
        <SectionHead
          eyebrow="Estrutura"
          title="O que está à disposição."
          lead="A propriedade é cercada por mata nativa e reúne piscina, playground, área gramada e estacionamento privativo."
          className="mb-14"
        />

        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ESTRUTURA.map((item, i) => (
            <StaggerItem key={item.titulo}>
              <SpotlightCard className="vignette group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink">
                <img
                  src={item.imagem}
                  alt={item.titulo}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[1400ms] ease-expo group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                <div className="relative z-10 p-7">
                  <span className="t-eyebrow t-mono text-gold-300/70">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-2xl leading-tight tracking-display text-cream">
                    {item.titulo}
                  </h3>
                  <p className="t-body mt-2.5 text-cream/65">{item.texto}</p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Café da manhã */}
      <div className="section shell pt-0">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>Café da manhã</Eyebrow>
            <SplitText
              as="h3"
              text="Servido todas as manhãs."
              className="t-title mt-4 max-w-[16ch] text-ink"
            />
            <Reveal delay={0.2} className="mt-5">
              <p className="t-body max-w-[42ch] text-ink/55">
                Café mineiro torrado e moído na hora, bolos e pães assados no
                dia, frutas da estação, doces caseiros e ovos preparados na
                hora. Incluso na diária.
              </p>
            </Reveal>
            <Reveal delay={0.35} className="mt-6">
              <p className="t-eyebrow text-ink/40">Das 8h às 10h</p>
            </Reveal>
          </div>

          {/* Grade uniforme, alinhada com o bloco de texto */}
          <div className="grid grid-cols-2 gap-3 lg:col-span-7">
            {fotosCafe.map((f, i) => (
              <Reveal key={f} variant="mask" duration={1.1} delay={i * 0.08}>
                <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={f}
                    alt="Café da manhã da Vida Boa Pousada"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Vista aérea */}
      <div className="relative">
        <ParallaxImage
          src={HERO.aereaDia}
          alt="Vista aérea da propriedade, cercada por mata nativa"
          className="h-[60svh] min-h-[400px]"
          overlay="bg-ink/45"
        />
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="shell">
            <Eyebrow tone="light">A propriedade</Eyebrow>
            <SplitText
              as="p"
              text="Mata nativa em toda a volta."
              className="t-title mt-4 max-w-[16ch] text-cream"
            />
          </div>
        </div>
      </div>

      {/* Um dia na pousada */}
      <div className="surface-dark grain section relative overflow-hidden">
        <div className="shell relative z-10">
          <SectionHead
            eyebrow="Um dia na pousada"
            title="Como funciona a rotina."
            tone="light"
            lead="Não há programação obrigatória. Estes são os horários dos serviços da casa."
            className="mb-14"
          />

          <Stagger stagger={0.08} className="grid md:grid-cols-2 lg:grid-cols-3">
            {ROTEIRO.map((r) => (
              <StaggerItem key={r.hora}>
                <div className="group flex items-baseline gap-6 border-t border-cream/10 py-7 transition-colors duration-500 hover:border-terra-500/50">
                  <span className="t-mono font-display text-3xl leading-none text-terra-400 transition-transform duration-500 ease-expo group-hover:translate-x-1">
                    {r.hora}
                  </span>
                  <p className="t-body max-w-[30ch] text-cream/60">{r.texto}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
