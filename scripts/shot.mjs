import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://localhost:4173'
const OUT = process.env.OUT ?? 'shots'
mkdirSync(OUT, { recursive: true })

const rotas = process.env.ROTAS
  ? process.env.ROTAS.split(',').map((r) => [r.replace(/\W/g, '') || 'home', r])
  : [
      ['home', '/'],
      ['chales', '/chales'],
      ['estrutura', '/estrutura'],
      ['galeria', '/galeria'],
      ['localizacao', '/localizacao'],
    ]

const browser = await chromium.launch()

for (const [nome, rota] of rotas) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const erros = []
  page.on('console', (m) => m.type() === 'error' && erros.push(m.text()))
  page.on('pageerror', (e) => erros.push(String(e)))

  await page.goto(BASE + rota, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(2600)

  const altura = await page.evaluate(() => document.body.scrollHeight)
  const vh = 900
  const paradas = Math.min(Math.ceil(altura / vh), 12)

  for (let i = 0; i < paradas; i++) {
    // rola em passos curtos para os viewports de animação dispararem
    await page.evaluate(
      async ([alvo, vh]) => {
        const inicio = window.scrollY
        const passos = 12
        for (let s = 1; s <= passos; s++) {
          window.scrollTo(0, inicio + ((alvo - inicio) * s) / passos)
          await new Promise((r) => setTimeout(r, 45))
        }
      },
      [i * vh, vh]
    )
    await page.waitForTimeout(1100)
    await page.screenshot({ path: `${OUT}/${nome}-${String(i).padStart(2, '0')}.png` })
  }

  // Overflow horizontal?
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  )

  console.log(
    `${nome}: ${paradas} telas · overflow-x ${overflow}px${
      erros.length ? ` · ERROS: ${erros.slice(0, 3).join(' | ')}` : ''
    }`
  )
  await page.close()
}

await browser.close()
