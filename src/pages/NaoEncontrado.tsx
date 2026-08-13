import { SplitText } from '../components/motion/Text'
import { Button, Arrow, Eyebrow } from '../components/ui'

export default function NaoEncontrado() {
  return (
    <section className="surface-dark grain relative flex min-h-svh flex-col justify-center overflow-hidden">
      <div className="shell relative z-10">
        <Eyebrow tone="light">Erro 404</Eyebrow>
        <SplitText
          as="h1"
          text="Essa trilha não leva a lugar nenhum."
          className="t-display mt-6 max-w-[14ch] font-display text-cream"
        />
        <p className="t-lead mt-7 max-w-[38ch] text-cream/55">
          A página saiu do ar ou o endereço veio torto. Volte para o começo.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/" variant="light">
            Ir para o início <Arrow />
          </Button>
          <Button to="/galeria" variant="ghost">
            Ver a galeria
          </Button>
        </div>
      </div>
    </section>
  )
}
