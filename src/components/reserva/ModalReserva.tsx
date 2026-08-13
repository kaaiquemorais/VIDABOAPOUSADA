import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { MARCA } from '../../lib/site'
import {
  HOJE,
  contarNoites,
  montarMensagem,
  somarDias,
  useReserva,
} from './contexto'

const EASE = [0.16, 1, 0.3, 1] as const

const HOSPEDES = ['1', '2', '3', '4', '5–6', '7–10', '10+']
const PERFIS = ['A dois', 'Família', 'Amigos', 'Evento']

export function ModalReserva() {
  const { dados, definir, aberto, fechar } = useReserva()
  const noites = contarNoites(dados.checkin, dados.checkout)
  const mensagem = montarMensagem(dados)

  useEffect(() => {
    if (!aberto) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && fechar()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [aberto, fechar])

  const enviar = () => {
    const url = `https://wa.me/${MARCA.whatsapp}?text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank', 'noopener')
  }

  const aoMudarCheckin = (valor: string) => {
    const proximo: { checkin: string; checkout?: string } = { checkin: valor }
    if (valor && (!dados.checkout || dados.checkout <= valor)) {
      proximo.checkout = somarDias(valor, 2)
    }
    definir(proximo)
  }

  const rotulo = 'text-[0.62rem] font-medium uppercase tracking-[0.2em] text-cream/55'
  const campo =
    'w-full rounded-2xl border border-cream/20 bg-white/[0.07] px-4 py-3 text-cream outline-none transition-colors duration-300 [color-scheme:dark] placeholder:text-cream/35 focus:border-cream/50'

  const pilula = (ativo: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
      ativo
        ? 'border-transparent bg-cream text-terra-700 font-medium'
        : 'border-cream/25 text-cream/80 hover:border-cream/55'
    }`

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={fechar}
          className="fixed inset-0 z-[500] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-md sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Formulário de reserva"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.55, ease: EASE }}
            /* Altura travada na tela: o miolo rola por dentro, então o
               cabeçalho e o botão de enviar nunca ficam cortados */
            className="relative flex max-h-[94svh] w-full max-w-[34rem] flex-col overflow-hidden rounded-[2rem] shadow-2xl"
            style={{
              background:
                'linear-gradient(165deg, #C4551F 0%, #A8431A 45%, #7F3315 100%)',
            }}
          >
            <button
              onClick={fechar}
              aria-label="Fechar"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-cream transition-colors duration-300 hover:bg-white/30"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            {/* Cabeçalho fixo */}
            <div className="flex shrink-0 flex-col items-center px-6 pb-4 pt-7 text-center sm:px-8">
              <img src="/brand/logo-mark.png" alt="" aria-hidden className="h-10 w-10" />
              <h2 className="mt-2 font-display text-[1.6rem] leading-tight tracking-display text-cream">
                Vamos reservar?
              </h2>
              <p className="mt-1.5 text-sm text-cream/70">
                Preencha e abrimos o WhatsApp com tudo pronto.
              </p>
            </div>

            {/* Miolo rolável */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-2 sm:px-8">
            {/* Datas */}
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-2">
                <span className={rotulo}>Check-in</span>
                <input
                  type="date"
                  value={dados.checkin}
                  min={HOJE}
                  onChange={(e) => aoMudarCheckin(e.target.value)}
                  className={campo}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className={rotulo}>Check-out</span>
                <input
                  type="date"
                  value={dados.checkout}
                  min={dados.checkin ? somarDias(dados.checkin, 1) : somarDias(HOJE, 1)}
                  onChange={(e) => definir({ checkout: e.target.value })}
                  className={campo}
                />
              </label>
            </div>

            {/* Hóspedes */}
            <fieldset className="mt-4">
              <legend className={rotulo}>
                Quantos hóspedes?
                {noites > 0 && (
                  <span className="ml-2 normal-case tracking-normal text-gold-300">
                    {noites} {noites === 1 ? 'noite' : 'noites'}
                  </span>
                )}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {HOSPEDES.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => definir({ hospedes: h })}
                    className={`${pilula(dados.hospedes === h)} min-w-[2.75rem]`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Perfil */}
            <fieldset className="mt-4">
              <legend className={rotulo}>
                O que você procura?
                <span className="ml-2 normal-case tracking-normal text-cream/40">
                  (opcional)
                </span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {PERFIS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => definir({ perfil: dados.perfil === p ? '' : p })}
                    className={pilula(dados.perfil === p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Nome */}
            <label className="mt-4 flex flex-col gap-2">
              <span className={rotulo}>Seu nome</span>
              <input
                type="text"
                value={dados.nome}
                onChange={(e) => definir({ nome: e.target.value })}
                placeholder="Como podemos te chamar?"
                className={campo}
              />
            </label>

            {/* Observação */}
            <label className="mt-4 flex flex-col gap-2">
              <span className={rotulo}>
                Observação
                <span className="ml-2 normal-case tracking-normal text-cream/40">
                  (opcional)
                </span>
              </span>
              <textarea
                value={dados.observacao}
                onChange={(e) => definir({ observacao: e.target.value })}
                rows={2}
                placeholder="Ex.: chegada após as 22h, precisa de berço..."
                className={`${campo} resize-y`}
              />
            </label>

              {/* Prévia */}
              <div className="mt-5 rounded-2xl border border-cream/20 bg-black/15 p-4">
                <p className={rotulo}>Prévia da mensagem</p>
                <p className="mt-2.5 whitespace-pre-line text-sm leading-relaxed text-cream/85">
                  {mensagem}
                </p>
              </div>
            </div>

            {/* Rodapé fixo */}
            <div className="shrink-0 px-6 pb-6 pt-4 sm:px-8">
              <button
                onClick={enviar}
                className="w-full rounded-2xl bg-[#25D366] py-3.5 font-medium text-[#0B3D1E] transition-colors duration-300 hover:bg-[#1FBF5A]"
              >
                Enviar no WhatsApp
              </button>
              <button
                onClick={fechar}
                className="mx-auto mt-3 block text-[0.68rem] uppercase tracking-[0.2em] text-cream/55 transition-colors duration-300 hover:text-cream"
              >
                Voltar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
