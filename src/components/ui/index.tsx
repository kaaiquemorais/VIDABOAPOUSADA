import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { SplitText } from '../motion/Text'

/* ============================================================
   Button — preenchimento que sobe no hover.
   variantes: solid | outline | ghost | light
   ============================================================ */
type ButtonProps = {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: 'solid' | 'outline' | 'ghost' | 'light'
  size?: 'sm' | 'md'
  className?: string
}

const base =
  'relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium tracking-wider uppercase transition-colors duration-500 ease-expo'

const sizes = {
  sm: 'px-5 py-2.5 text-[0.66rem]',
  md: 'px-8 py-4 text-[0.7rem]',
}

const skins = {
  solid: 'bg-ink text-cream hover:text-cream',
  outline: 'border border-ink/25 text-ink hover:text-cream',
  ghost: 'border border-cream/25 text-cream hover:text-ink',
  light: 'bg-cream text-ink hover:text-cream',
}

const fills = {
  // terra-600 garante contraste AA com o texto creme
  solid: 'bg-terra-600',
  outline: 'bg-ink',
  ghost: 'bg-cream',
  light: 'bg-terra-600',
}

export function Button({
  children,
  to,
  href,
  onClick,
  variant = 'solid',
  size = 'md',
  className = '',
}: ButtonProps) {
  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[600ms] ease-expo group-hover:scale-y-100 ${fills[variant]}`}
      />
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </>
  )

  const cls = `group ${base} ${sizes[size]} ${skins[variant]} ${className}`

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls}>
        {inner}
      </button>
    )
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    )
  }
  return (
    <Link to={to ?? '/'} className={cls}>
      {inner}
    </Link>
  )
}

/* ============================================================
   Eyebrow — rótulo curto acima do título.
   ============================================================ */
export function Eyebrow({
  children,
  className = '',
  tone = 'dark',
}: {
  children: ReactNode
  className?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`t-eyebrow ${
        tone === 'dark' ? 'text-terra-500' : 'text-gold-400'
      } ${className}`}
    >
      {children}
    </motion.p>
  )
}

/* ============================================================
   SectionHead — cabeçalho padrão de seção.
   ============================================================ */
export function SectionHead({
  eyebrow,
  title,
  lead,
  tone = 'dark',
  align = 'left',
  className = '',
}: {
  eyebrow?: string
  title: string
  lead?: string
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === 'center' ? 'items-center text-center' : 'items-start'
      } ${className}`}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <SplitText
        as="h2"
        text={title}
        className={`t-display max-w-[16ch] ${
          tone === 'dark' ? 'text-ink' : 'text-cream'
        }`}
      />
      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className={`t-lead max-w-[46ch] ${
            tone === 'dark' ? 'text-ink/65' : 'text-cream/65'
          }`}
        >
          {lead}
        </motion.p>
      )}
    </div>
  )
}

/* ============================================================
   Arrow — seta que desliza no hover do pai (.group)
   ============================================================ */
export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:translate-x-1 ${className}`}
    >
      <path
        d="M4 12h15m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
