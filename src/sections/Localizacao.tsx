import { DEPOIMENTOS, DISTANCIAS, HERO, MARCA } from '../lib/site'
import { Reveal, Stagger, StaggerItem, SplitText } from '../components/motion/Text'
import { CountUp, Marquee, SpotlightCard } from '../components/motion/Interactive'
import { Button, Arrow, Eyebrow, SectionHead } from '../components/ui'
import { useReserva } from '../components/reserva/contexto'

const MAPA = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${MARCA.endereco}, ${MARCA.cidade} - ${MARCA.uf}`
)}`

/* ============================================================
   Avaliações públicas
   ============================================================ */
export function Depoimentos() {
  return (
    <section className="section overflow-hidden bg-cream">
      <div className="shell">
        <SectionHead
          eyebrow="Avaliações"
          title="O que dizem os hóspedes."
          lead="Comentários publicados no Booking.com e no Tripadvisor, sem edição."
          align="center"
          className="mb-12"
        />
      </div>

      <Marquee
        speed={52}
        className="[mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]"
      >
        {DEPOIMENTOS.map((d, i) => (
          <figure
            key={i}
            className="mx-3 flex w-[min(78vw,26rem)] shrink-0 flex-col justify-between gap-6 rounded-3xl border border-ink/10 bg-cream-warm p-7"
          >
            <blockquote className="font-display text-[1.3rem] leading-[1.28] tracking-display text-ink">
              “{d.texto}”
            </blockquote>
            <figcaption className="t-eyebrow flex items-center gap-3 text-ink/40">
              <span className="text-gold-500">★★★★★</span>
              {d.fonte}
            </figcaption>
          </figure>
        ))}
      </Marquee>

      <div className="shell mt-12 flex justify-center">
        <Button href={MARCA.tripadvisor} variant="outline">
          Ler todas as avaliações <Arrow />
        </Button>
      </div>
    </section>
  )
}

/* ============================================================
   Localização e contato
   ============================================================ */
export function Localizacao() {
  const { abrir } = useReserva()

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
      nota: 'Grupos e eventos',
    },
    {
      rotulo: 'Booking.com',
      valor: 'Reserva online',
      href: MARCA.booking,
      nota: 'Confirmação imediata',
    },
  ]

  return (
    <section id="localizacao" className="section shell scroll-mt-20">
      <SectionHead
        eyebrow="Onde fica"
        title="Águas de Lindóia, no Circuito das Águas."
        lead="Acesso asfaltado até a entrada da pousada, entre o interior de São Paulo e o sul de Minas Gerais."
        className="mb-14"
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Endereço e horários */}
        <div className="lg:col-span-5">
          <Eyebrow>Endereço</Eyebrow>
          <p className="t-title mt-4 max-w-[18ch] font-display text-ink">
            {MARCA.endereco}
          </p>
          <p className="t-lead mt-4 text-ink/55">
            {MARCA.cidade}, {MARCA.uf}
            <br />
            CEP {MARCA.cep}
          </p>

          <Reveal delay={0.2} className="mt-8">
            <Button href={MAPA}>
              Abrir no Google Maps <Arrow />
            </Button>
          </Reveal>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/10 pt-8">
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

        {/* Distâncias */}
        <div className="lg:col-span-7">
          <Eyebrow>Distâncias aproximadas</Eyebrow>
          <Stagger stagger={0.06} className="mt-6">
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
          <p className="t-eyebrow mt-5 text-ink/35">
            Distâncias por rodovia, aproximadas
          </p>
        </div>
      </div>

      {/* Mapa, na largura da grade */}
      <Reveal variant="mask" duration={1.2} className="mt-14">
        <div className="relative h-[46svh] min-h-[320px] w-full overflow-hidden rounded-3xl bg-cream-deep">
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

      {/* Contato */}
      <div className="mt-20">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Contato</Eyebrow>
            <SplitText
              as="h3"
              text="Fale com a pousada."
              className="t-title mt-4 max-w-[16ch] text-ink"
            />
          </div>
          <Reveal delay={0.15}>
            <Button onClick={abrir}>
              Consultar datas <Arrow />
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-8 grid gap-3 md:grid-cols-3">
          {CONTATOS.map((c) => (
            <StaggerItem key={c.rotulo}>
              <a href={c.href} target="_blank" rel="noreferrer" className="group block h-full">
                <SpotlightCard
                  color="rgba(196,99,47,0.12)"
                  className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-ink/12 p-7 transition-colors duration-500 hover:border-ink/35"
                >
                  <span className="t-eyebrow text-ink/40">{c.rotulo}</span>
                  <div className="min-w-0">
                    {/* o e-mail é uma palavra só: sem isso ele estica o cartão */}
                    <p className="font-display text-xl leading-tight tracking-display text-ink [overflow-wrap:anywhere] sm:text-2xl">
                      {c.valor}
                    </p>
                    <p className="t-eyebrow mt-3 flex items-center gap-2 text-terra-500">
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
  )
}
