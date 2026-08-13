import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import {
  HERO,
  MARCA,
  NUMEROS,
  CATEGORIAS,
  DEPOIMENTOS,
  VIDEO,
} from '../lib/site'
import { VideoBackdrop, VideoPlayer } from '../components/media/Video'
import { ReservaBar } from '../components/ui/ReservaBar'
import { LogoHero } from '../components/brand/LogoHero'
import { Carrossel } from '../components/ui/Carrossel'
import {
  SplitText,
  ScrollReveal,
  Reveal,
  Stagger,
  StaggerItem,
} from '../components/motion/Text'
import {
  CountUp,
  Marquee,
  ParallaxImage,
} from '../components/motion/Interactive'
import { Button, Arrow, Eyebrow, SectionHead } from '../components/ui'

const EASE = [0.16, 1, 0.3, 1] as const

/* ============================================================
   HERO — cabe inteiro na tela, sem rolagem
   ============================================================ */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={ref}
      className="vignette grain relative flex h-[100svh] w-full items-center overflow-hidden bg-ink"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 will-transform">
        <VideoBackdrop
          src={VIDEO.hero}
          srcMobile={VIDEO.heroMobile}
          poster={VIDEO.heroPoster}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/55" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="shell relative z-10 flex w-full flex-col items-center pb-6 pt-[4.6rem] text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.45 }}
          className="t-eyebrow text-gold-400"
        >
          {MARCA.cidade} · {MARCA.uf} · {MARCA.regiao}
        </motion.p>

        <LogoHero className="mt-3 w-[min(58vw,24rem)]" />

        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.3 }}
          className="mt-3 max-w-[26ch] font-display text-[clamp(1.05rem,1.9vw,1.6rem)] leading-[1.2] tracking-display text-cream"
        >
          Sete chalés soltos na Mantiqueira. Nenhuma parede em comum.
        </motion.p>

        <div className="mt-7 w-full max-w-[54rem]">
          <ReservaBar />
        </div>
      </motion.div>
    </section>
  )
}

/* ============================================================
   NÚMEROS — faixa fina abaixo do hero
   ============================================================ */
function Numeros() {
  return (
    <section className="surface-dark overflow-hidden border-t border-cream/10">
      {/* Celular: a faixa passa sozinha, sem quebrar em duas linhas */}
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

      {/* Desktop: uma linha rasa, quatro colunas */}
      <div className="shell hidden sm:block">
        <Stagger className="grid grid-cols-4 py-5">
          {NUMEROS.map((n) => (
            <StaggerItem key={n.label}>
              <div className="flex items-baseline gap-2.5">
                <p className="font-display text-[clamp(1.35rem,2.2vw,1.9rem)] leading-none tracking-tightest text-cream">
                  <CountUp to={n.valor} suffix={n.sufixo} duration={2} />
                </p>
                <p className="t-eyebrow max-w-[14ch] text-cream/40">{n.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ============================================================
   MANIFESTO — imagem e texto começam e terminam na mesma linha
   ============================================================ */
function Manifesto() {
  return (
    <section className="section shell">
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
            <ScrollReveal
              text="Não existe recepção, corredor nem porta ao lado. Cada chalé é uma casa inteira: o carro para na frente, a varanda abre nos fundos e a serra toma a janela toda."
              className="font-display text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.14] tracking-display text-ink"
            />

            <Stagger className="grid gap-7 sm:grid-cols-2">
              {[
                {
                  t: 'Sete, não setenta.',
                  d: 'É a matemática do sossego. Ninguém disputa espreguiçadeira.',
                },
                {
                  t: 'Café que segura a manhã.',
                  d: 'Mineiro, moído na hora, com bolo ainda saindo do forno.',
                },
                {
                  t: 'A serra faz o resto.',
                  d: 'Névoa cedo, sol firme à tarde, o céu pegando fogo às seis.',
                },
                {
                  t: 'Criança tem onde correr.',
                  d: 'Escorregador, campo e toboágua no mesmo gramado.',
                },
              ].map((item) => (
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
    </section>
  )
}

/* ============================================================
   TOUR — vídeo em quadro contido, alinhado à coluna de texto
   ============================================================ */
function Tour() {
  return (
    <section className="surface-dark grain relative overflow-hidden py-[var(--section-y)]">
      {/* Texto e vídeo dividem a mesma coluna: começam e terminam na mesma linha */}
      <div className="shell relative z-10">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow tone="light">O lugar em movimento</Eyebrow>
              <SplitText
                as="h2"
                text="Um minuto e você entende."
                className="t-display mt-5 max-w-[13ch] text-cream"
              />
            </div>
            <Reveal delay={0.2}>
              <p className="t-body max-w-[26ch] text-cream/50 sm:text-right">
                Sem produção, sem trilha, sem ator. É exatamente o que te espera.
              </p>
            </Reveal>
          </div>

          <Reveal variant="mask" duration={1.2} className="mt-9">
            <VideoPlayer
              src={VIDEO.tour}
              poster={VIDEO.tourPoster}
              className="aspect-[16/9] w-full overflow-hidden rounded-3xl bg-ink"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   CATEGORIAS — carrossel arrastável
   ============================================================ */
function Categorias() {
  return (
    <section className="section bg-cream-warm">
      <Carrossel
        eyebrow="Por dentro"
        titulo="Arraste e veja de perto."
        lead="Cada capa abre a galeria daquele canto da pousada. Sem foto de banco de imagem, sem render, sem promessa."
        itens={CATEGORIAS.map((c) => ({
          id: c.id,
          titulo: c.titulo,
          frase: c.frase,
          capa: c.capa,
          to: `/galeria?c=${c.id}`,
        }))}
      />
    </section>
  )
}

/* ============================================================
   PÔR DO SOL
   ============================================================ */
function Poente() {
  return (
    <section className="relative">
      <ParallaxImage
        src="/img/pordosol/576575842.webp"
        alt="Pôr do sol sobre a serra em Águas de Lindóia"
        className="h-[80svh] min-h-[520px]"
        distance={14}
        overlay="bg-gradient-to-b from-ink/55 via-ink/25 to-ink/75"
      />
      <div className="absolute inset-0 flex items-center">
        <div className="shell">
          <Eyebrow tone="light">Todo fim de tarde</Eyebrow>
          <SplitText
            as="h2"
            text="Às seis, a serra pega fogo."
            className="t-display mt-5 max-w-[13ch] text-cream"
          />
          <Reveal delay={0.3} className="mt-6">
            <p className="t-lead max-w-[38ch] text-cream/70">
              O céu abre em laranja atrás das palmeiras e a piscina devolve tudo
              em dobro. Dura vinte minutos e ninguém fala nada.
            </p>
          </Reveal>
          <Reveal delay={0.45} className="mt-8">
            <Button to="/galeria" variant="ghost">
              Ver a galeria <Arrow />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   DEPOIMENTOS
   ============================================================ */
function Depoimentos() {

  return (
    <section className="section overflow-hidden bg-cream">
      <div className="shell">
        <SectionHead
          eyebrow="Quem já ficou"
          title="Nota cinco, sem arredondar."
          lead="O que os hóspedes escreveram no Booking e no Tripadvisor, sem edição nossa."
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
   PÁGINA
   ============================================================ */
export default function Home() {
  return (
    <>
      <Hero />
      <Numeros />
      <Manifesto />
      <Tour />
      <Categorias />
      <Poente />
      <Depoimentos />
    </>
  )
}
