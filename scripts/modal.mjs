import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = 'http://localhost:4173'
mkdirSync('shots', { recursive: true })

const browser = await chromium.launch()

/* Desktop: hero sem rolagem + modal de reserva */
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const erros = []
page.on('pageerror', (e) => erros.push(String(e)))
page.on('console', (m) => m.type() === 'error' && erros.push(m.text()))

await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(3200)
await page.screenshot({ path: 'shots/hero.png' })

// O hero cabe na tela?
const alturaHero = await page.evaluate(() => {
  const s = document.querySelector('section')
  const conteudo = s?.querySelector('.shell')
  return {
    secao: s?.getBoundingClientRect().height ?? 0,
    conteudo: conteudo?.getBoundingClientRect().height ?? 0,
    viewport: window.innerHeight,
  }
})
console.log(
  `hero: secao ${Math.round(alturaHero.secao)}px, conteudo ${Math.round(alturaHero.conteudo)}px, viewport ${alturaHero.viewport}px -> ${
    alturaHero.conteudo <= alturaHero.viewport ? 'CABE' : 'ESTOURA'
  }`
)

// Abre o modal pelo botao Reservar da nav
await page.click('header button:has-text("Reservar"), header a:has-text("Reservar")')
await page.waitForTimeout(900)
await page.screenshot({ path: 'shots/modal.png' })

const linkWhats = await page.evaluate(() => {
  const p = document.querySelector('[role="dialog"] p.whitespace-pre-line')
  return p ? p.textContent : null
})
console.log('previa:', JSON.stringify(linkWhats))

await page.keyboard.press('Escape')
await page.waitForTimeout(500)

// Carrossel
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45))
await page.waitForTimeout(1600)
await page.screenshot({ path: 'shots/carrossel.png' })

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(1400)
await page.screenshot({ path: 'shots/rodape.png' })

const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth
)
console.log(`overflow-x: ${overflow}px · erros: ${erros.length}`, erros.slice(0, 3))
await page.close()

/* Mobile */
const mob = await browser.newPage({ viewport: { width: 390, height: 844 } })
await mob.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
await mob.waitForTimeout(3200)
await mob.screenshot({ path: 'shots/m-hero.png' })

const mAltura = await mob.evaluate(() => {
  const c = document.querySelector('section .shell')
  return {
    conteudo: c?.getBoundingClientRect().height ?? 0,
    viewport: window.innerHeight,
  }
})
console.log(
  `mobile hero: conteudo ${Math.round(mAltura.conteudo)}px / viewport ${mAltura.viewport}px -> ${
    mAltura.conteudo <= mAltura.viewport ? 'CABE' : 'ESTOURA'
  }`
)
await mob.close()

await browser.close()
