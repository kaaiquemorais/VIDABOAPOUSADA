import { DISTANCIAS, HERO, MARCA } from '../lib/site'
import { PageHero } from '../components/layout/PageHero'
import { Reveal, Stagger, StaggerItem, SplitText } from '../components/motion/Text'
import { CountUp, ImageReveal, SpotlightCard } from '../components/motion/Interactive'
import { Button, Arrow, Eyebrow, SectionHead } from '../components/ui'
import { useReserva } from '../components/reserva/contexto'

const MAPA = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${MARCA.endereco}, ${MARCA.cidade} - ${MARCA.uf}`
)}`

const CONTATOS = [
  {
    rotulo: 'WhatsApp',
    valor: MARCA.whatsappLabel,
    href: `https://wa.me/${MARCA.whatsapp}`,
    nota: 'Resposta no mesmo dia',
  },
  {
    rotulo: 'E-mail',
    valor: MARCA.email,
    href: `mailto:${MARCA.email}`,
    nota: 'Para grupos e eventos',
  },
  {
    rotulo: 'Booking',
    valor: 'Reserva online',
    href: MARCA.booking,
    nota: 'Confirmação imediata',
  },
]

export default function Localizacao() {
  const { abrir } = useReserva()

  return (
    <>
      <PageHero
        index="04 / 04"
        eyebrow="Como chegar"
        title="Longe o suficiente. Perto o bastante."
        lead="Asfalto até o portão, no Circuito das Águas Paulista, no ponto em que São Paulo encosta no sul de Minas."
        image={HERO.aereaDia}
        alt="Vista aérea da região da pousada em Águas de Lindóia"
      />

      {/* Endereço + distâncias */}
      <section className="section shell">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>Endereço</Eyebrow>
            <p className="t-title mt-6 max-w-[16ch] font-display text-ink">
              {MARCA.endereco}
            </p>
            <p className="t-lead mt-4 text-ink/55">
              {MARCA.cidade}, {MARCA.uf}
              <br />
              CEP {MARCA.cep}
            </p>

            <Reveal delay={0.2} className="mt-9">
              <Button href={MAPA}>
                Abrir no Google Maps <Arrow />
              </Button>
            </Reveal>

            <dl className="mt-12 grid grid-cols-2 gap-6">
              <div>
                <dt className="t-eyebrow text-ink/40">Check-in</dt>
                <dd className="mt-2 font-display text-3xl tracking-display text-ink">
                  {MARCA.checkin}
                </dd>
              </div>
              <div>
                <dt className="t-eyebrow text-ink/40">Check-out</dt>
                <dd className="mt-2 font-display text-3xl tracking-display text-ink">
                  {MARCA.checkout}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <Eyebrow>Distâncias aproximadas</Eyebrow>
            <Stagger stagger={0.07} className="mt-8">
              {DISTANCIAS.map((d) => (
                <StaggerItem key={d.destino}>
                  <div className="group flex items-baseline justify-between gap-6 border-b border-ink/10 py-5 transition-colors duration-500 hover:border-terra-500/40">
                    <span className="t-body text-ink/70 transition-transform duration-500 ease-expo group-hover:translate-x-1.5">
                      {d.destino}
                    </span>
                    <span className="font-display text-2xl leading-none tracking-display text-ink">
                      <CountUp to={d.km} duration={1.6} />
                      <span className="ml-1 text-sm text-ink/40">km</span>
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <p className="t-eyebrow mt-6 text-ink/35">
              Distâncias por rodovia, aproximadas
            </p>
          </div>
        </div>
      </section>

      {/* Mapa incorporado */}
      <section className="relative">
        <Reveal variant="mask" duration={1.3}>
          <div className="relative h-[58svh] min-h-[380px] w-full overflow-hidden bg-cream-deep">
            {/* Fundo de reserva: se o embed do Maps não carregar, a seção
                continua legível em vez de virar um retângulo cinza. */}
            <div className="absolute inset-0">
              <img
                src={HERO.aereaDia}
                alt=""
                aria-hidden
                className="h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 grid place-items-center">
                <a
                  href={MAPA}
                  target="_blank"
                  rel="noreferrer"
                  className="t-eyebrow rounded-full bg-ink px-6 py-3 text-cream"
                >
                  Abrir no Google Maps
                </a>
              </div>
            </div>
            <iframe
              title={`Mapa de ${MARCA.nome} ${MARCA.sufixo}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `${MARCA.endereco}, ${MARCA.cidade} ${MARCA.uf}`
              )}&z=14&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="relative h-full w-full grayscale-[0.35] contrast-[1.05]"
              style={{ border: 0 }}
            />
          </div>
        </Reveal>
      </section>

      {/* Contato */}
      <section className="surface-dark grain section relative overflow-hidden">
        <div className="shell relative z-10">
          <SectionHead
            eyebrow="Falar com a gente"
            title="Manda mensagem. Quem responde mora aqui."
            tone="light"
            className="mb-14"
          />

          <Stagger className="grid gap-3 md:grid-cols-3">
            {CONTATOS.map((c) => (
              <StaggerItem key={c.rotulo}>
                <a href={c.href} target="_blank" rel="noreferrer" className="group block h-full">
                  <SpotlightCard className="flex h-full flex-col justify-between gap-10 rounded-3xl border border-cream/12 p-7 transition-colors duration-500 hover:border-cream/30">
                    <span className="t-eyebrow text-cream/40">{c.rotulo}</span>
                    <div>
                      <p className="font-display text-2xl leading-tight tracking-display text-cream">
                        {c.valor}
                      </p>
                      <p className="t-eyebrow mt-3 flex items-center gap-2 text-terra-400">
                        {c.nota} <Arrow />
                      </p>
                    </div>
                  </SpotlightCard>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Encerramento */}
      <section className="section shell">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <ImageReveal
            src="/img/pordosol/576575908.webp"
            alt="Pôr do sol visto da pousada"
            ratio="aspect-[3/4]"
            className="rounded-3xl"
          />
          <div>
            <SplitText
              as="h2"
              text="Chega de tarde. Sai na segunda."
              className="t-display max-w-[12ch] font-display text-ink"
            />
            <Reveal delay={0.25} className="mt-8">
              <p className="t-lead max-w-[36ch] text-ink/60">
                É o tempo que a serra pede. Menos que isso, você só passa por
                aqui sem perceber onde esteve.
              </p>
            </Reveal>
            <Reveal delay={0.4} className="mt-9">
              <Button onClick={abrir}>
                Consultar datas <Arrow />
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
