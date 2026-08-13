import { motion } from 'framer-motion'
import { HOJE, contarNoites, somarDias, useReserva } from '../reserva/contexto'

const EASE = [0.16, 1, 0.3, 1] as const


/* ============================================================
   ReservaBar — entrada rápida no hero.
   No celular vira um cartão de campos empilhados com o botão do
   WhatsApp cheio; no desktop, uma barra única e contínua.
   ============================================================ */
export function ReservaBar() {
  const { dados, definir, abrir } = useReserva()
  const noites = contarNoites(dados.checkin, dados.checkout)

  const aoMudarCheckin = (valor: string) => {
    const proximo: { checkin: string; checkout?: string } = { checkin: valor }
    if (valor && (!dados.checkout || dados.checkout <= valor)) {
      proximo.checkout = somarDias(valor, 2)
    }
    definir(proximo)
  }

  const campo =
    'w-full bg-transparent text-[0.95rem] text-cream outline-none [color-scheme:dark]'
  const celula =
    'flex flex-col gap-0.5 rounded-2xl border border-cream/20 px-4 py-2.5 text-left transition-colors duration-500 md:flex-1 md:rounded-none md:border-0 md:px-5 md:py-3 md:hover:bg-cream/[0.06]'
  const rotulo = 't-eyebrow text-cream/50'

  return (
    <motion.form
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1, ease: EASE, delay: 1.6 }}
      onSubmit={(e) => {
        e.preventDefault()
        abrir()
      }}
      className="flex w-full flex-col gap-2 rounded-3xl border border-cream/20 bg-ink/35 p-2 backdrop-blur-2xl md:flex-row md:items-stretch md:gap-0 md:p-0"
    >
      {/* No celular as duas datas dividem a linha; no desktop viram irmãs da barra */}
      <div className="grid grid-cols-2 gap-2 md:contents">
        <label className={celula}>
          <span className={rotulo}>Check-in</span>
          <input
            type="date"
            value={dados.checkin}
            min={HOJE}
            onChange={(e) => aoMudarCheckin(e.target.value)}
            className={campo}
            aria-label="Data de check-in"
          />
        </label>

        <span aria-hidden className="hidden w-px bg-cream/15 md:block" />

        <label className={celula}>
          <span className={rotulo}>Check-out</span>
          <input
            type="date"
            value={dados.checkout}
            min={dados.checkin ? somarDias(dados.checkin, 1) : somarDias(HOJE, 1)}
            onChange={(e) => definir({ checkout: e.target.value })}
            className={campo}
            aria-label="Data de check-out"
          />
        </label>
      </div>

      <span aria-hidden className="hidden w-px bg-cream/15 md:block" />

      <label className={`${celula} md:max-w-[11rem]`}>
        <span className={rotulo}>
          Hóspedes
          {noites > 0 && (
            <span className="ml-2 text-gold-400">
              {noites} {noites === 1 ? 'noite' : 'noites'}
            </span>
          )}
        </span>
        <select
          value={dados.hospedes}
          onChange={(e) => definir({ hospedes: e.target.value })}
          className={`${campo} cursor-pointer`}
          aria-label="Número de hóspedes"
        >
          {['1', '2', '3', '4', '5–6', '7–10', '10+'].map((n) => (
            <option key={n} value={n} className="bg-ink text-cream">
              {n} {n === '1' ? 'hóspede' : 'hóspedes'}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="relative flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-[#25D366] px-8 py-3.5 font-medium text-[#0B3D1E] transition-colors duration-400 hover:bg-[#1FBF5A] md:m-2 md:py-3"
      >
        {/* Brilho que atravessa o botão devagar */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-2/5 animate-shine bg-gradient-to-r from-transparent via-white/55 to-transparent blur-[2px]"
        />
        <span className="relative z-10">Consultar</span>
      </button>
    </motion.form>
  )
}
