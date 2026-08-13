import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/* ============================================================
   Estado compartilhado da reserva.
   A barra do hero e o modal escrevem no mesmo lugar, então o que
   o visitante digita no topo já chega preenchido no formulário.
   ============================================================ */

export type Reserva = {
  checkin: string
  checkout: string
  hospedes: string
  perfil: string
  nome: string
  observacao: string
}

const VAZIO: Reserva = {
  checkin: '',
  checkout: '',
  hospedes: '2',
  perfil: '',
  nome: '',
  observacao: '',
}

type Ctx = {
  dados: Reserva
  definir: (parcial: Partial<Reserva>) => void
  aberto: boolean
  abrir: () => void
  fechar: () => void
}

const ReservaCtx = createContext<Ctx | null>(null)

export function ReservaProvider({ children }: { children: ReactNode }) {
  const [dados, setDados] = useState<Reserva>(VAZIO)
  const [aberto, setAberto] = useState(false)

  const valor = useMemo<Ctx>(
    () => ({
      dados,
      definir: (parcial) => setDados((d) => ({ ...d, ...parcial })),
      aberto,
      abrir: () => setAberto(true),
      fechar: () => setAberto(false),
    }),
    [dados, aberto]
  )

  return <ReservaCtx.Provider value={valor}>{children}</ReservaCtx.Provider>
}

export function useReserva() {
  const ctx = useContext(ReservaCtx)
  if (!ctx) throw new Error('useReserva precisa estar dentro de ReservaProvider')
  return ctx
}

/* ---------- Utilidades de data ---------- */
export const iso = (d: Date) => d.toISOString().slice(0, 10)
export const HOJE = iso(new Date())

export function somarDias(base: string, dias: number) {
  const d = new Date(`${base}T12:00:00`)
  d.setDate(d.getDate() + dias)
  return iso(d)
}

export function contarNoites(checkin: string, checkout: string) {
  if (!checkin || !checkout) return 0
  const ms =
    new Date(`${checkout}T12:00:00`).getTime() -
    new Date(`${checkin}T12:00:00`).getTime()
  return Math.max(0, Math.round(ms / 86_400_000))
}

const dataLonga = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
})

export function porExtenso(data: string) {
  if (!data) return ''
  return dataLonga.format(new Date(`${data}T12:00:00`))
}

/* ---------- Monta a mensagem do WhatsApp ---------- */
export function montarMensagem(d: Reserva) {
  const linhas = ['Olá! Vim pelo site da Vida Boa 🌞', '']
  linhas.push('Gostaria de consultar disponibilidade e valores.')

  const noites = contarNoites(d.checkin, d.checkout)
  if (d.checkin && d.checkout && noites > 0) {
    linhas.push(
      `Check-in ${porExtenso(d.checkin)}, check-out ${porExtenso(d.checkout)} (${noites} ${
        noites === 1 ? 'noite' : 'noites'
      }).`
    )
  }

  linhas.push(`Somos ${d.hospedes} ${d.hospedes === '1' ? 'hóspede' : 'hóspedes'}.`)
  if (d.perfil) linhas.push(`Perfil da viagem: ${d.perfil}.`)
  if (d.nome.trim()) linhas.push(`Meu nome é ${d.nome.trim()}.`)
  if (d.observacao.trim()) linhas.push('', d.observacao.trim())

  return linhas.join('\n')
}
