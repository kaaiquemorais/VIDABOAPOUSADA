import { MARCA, NAV } from '../../lib/site'
import { SplitText, Reveal } from '../motion/Text'
import { Button, Arrow, Eyebrow } from '../ui'
import { Marquee } from '../motion/Interactive'
import { useReserva } from '../reserva/contexto'
import { irPara } from './Nav'

export function Footer() {
  const ano = new Date().getFullYear()
  const { abrir } = useReserva()

  const link = 'link-underline t-body text-cream/65 hover:text-cream'

  return (
    <footer className="surface-dark grain relative overflow-hidden">
      {/* Faixa de transição: marca a entrada do rodapé, não divide dois blocos */}
      <div className="relative z-10 border-b border-cream/10 py-2.5">
        <Marquee speed={44}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-base tracking-display text-cream/25 sm:text-lg"
            >
              Serra da Mantiqueira
              <span className="text-terra-500">✦</span>
              Águas de Lindóia
              <span className="text-terra-500">✦</span>
              Vida Boa
              <span className="text-terra-500">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Um único bloco: chamada à esquerda, informação à direita */}
      <div className="shell relative z-10 py-[clamp(3.5rem,7vw,6rem)]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Eyebrow tone="light">Reservas</Eyebrow>
            <SplitText
              as="h2"
              text="Só existem sete."
              className="t-display mt-5 max-w-[10ch] text-cream"
            />
            <Reveal delay={0.15}>
              <p className="t-lead mt-5 max-w-[34ch] text-cream/60">
                E a serra não avisa quando fica bonita. Fim de semana costuma
                fechar com semanas de antecedência.
              </p>
            </Reveal>
            {/* O WhatsApp é sempre alcançado pelo formulário de reserva,
                nunca por um botão solto */}
            <Reveal delay={0.3} className="mt-8">
              <Button onClick={abrir} variant="light">
                Consultar datas <Arrow />
              </Button>
            </Reveal>
          </div>

          {/* Três colunas abrindo no mesmo rótulo e na mesma linha */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div className="flex flex-col gap-4">
              <p className="t-eyebrow text-cream/35">Endereço</p>
              <p className="t-body text-cream/65">
                {MARCA.endereco}
                <br />
                {MARCA.cidade}, {MARCA.uf}
                <br />
                CEP {MARCA.cep}
              </p>
            </div>

            <nav className="flex flex-col gap-4">
              <p className="t-eyebrow text-cream/35">Navegar</p>
              <ul className="flex flex-col gap-2">
                {NAV.map((n) => (
                  <li key={n.id}>
                    <button
                      onClick={() => irPara(n.id)}
                      className={`${link} text-left`}
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-4">
              <p className="t-eyebrow text-cream/35">Contato</p>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href={`https://wa.me/${MARCA.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className={link}
                  >
                    {MARCA.whatsappLabel}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${MARCA.email}`} className={link}>
                    {MARCA.email}
                  </a>
                </li>
                <li>
                  <a
                    href={MARCA.booking}
                    target="_blank"
                    rel="noreferrer"
                    className={link}
                  >
                    Booking.com
                  </a>
                </li>
                <li>
                  <a
                    href={MARCA.tripadvisor}
                    target="_blank"
                    rel="noreferrer"
                    className={link}
                  >
                    Tripadvisor
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Reveal
          variant="fade"
          className="mt-14 flex flex-col gap-5 border-t border-cream/10 pt-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <img
            src="/brand/logo-script.png"
            alt={`${MARCA.nome} ${MARCA.sufixo}`}
            className="h-7 w-auto object-contain object-left"
          />
          <div className="flex flex-col gap-1 sm:items-end">
            <p className="t-eyebrow text-cream/30">
              © {ano} {MARCA.nome} {MARCA.sufixo}
            </p>
            <p className="t-eyebrow text-cream/30">
              Check-in {MARCA.checkin} · Check-out {MARCA.checkout}
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
