import { motion } from 'framer-motion'
import { MARCA } from '../../lib/site'

const EASE = [0.16, 1, 0.3, 1] as const

/* ============================================================
   LogoHero — o logo da pousada remontado em três peças, para que
   o sol possa girar sozinho.

   As porcentagens abaixo reposicionam cada recorte exatamente onde
   ele estava no arquivo original (1400 × 1018), então a montagem
   fica idêntica ao logo — só que viva.
   ============================================================ */

const PECAS = {
  // sol: recorte 459×459 na posição (426, 126)
  sol: { left: '30.43%', top: '12.38%', width: '32.79%' },
  // beija-flor: recorte 290×212 na posição (855, 16)
  passaro: { left: '61.07%', top: '1.57%', width: '20.71%' },
  // "Vida Boa" + "POUSADA": recorte 1400×424 na posição (0, 594)
  palavra: { left: '0%', top: '58.35%', width: '100%' },
}

export function LogoHero({ className = '' }: { className?: string }) {
  return (
    <h1 className={className}>
      <span className="sr-only">
        {MARCA.nome} {MARCA.sufixo}
      </span>

      <span
        aria-hidden
        className="relative block w-full"
        style={{ aspectRatio: '1400 / 1018' }}
      >
        {/* Sol — entra girando e depois segue devagar, sem parar */}
        <motion.img
          src="/brand/logo-mark.png"
          alt=""
          initial={{ opacity: 0, scale: 0.4, rotate: -140 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.55 }}
          className="absolute animate-sun"
          style={PECAS.sol}
        />

        {/* Beija-flor — chega depois, com uma leve flutuação */}
        <motion.img
          src="/brand/logo-bird.png"
          alt=""
          initial={{ opacity: 0, x: 30, y: -14 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -7, 0],
          }}
          transition={{
            opacity: { duration: 1, ease: EASE, delay: 1.25 },
            x: { duration: 1.2, ease: EASE, delay: 1.25 },
            y: {
              duration: 4.5,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: 2.2,
            },
          }}
          className="absolute"
          style={PECAS.passaro}
        />

        {/* Assinatura — revelada da esquerda para a direita, como escrita à mão */}
        <motion.img
          src="/brand/logo-word.png"
          alt=""
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
          animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
          transition={{
            clipPath: { duration: 1.9, ease: EASE, delay: 0.95 },
            opacity: { duration: 0.4, delay: 0.95 },
          }}
          className="absolute"
          style={PECAS.palavra}
        />
      </span>
    </h1>
  )
}
