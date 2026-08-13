import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
mkdirSync('shots', { recursive: true })

const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 390, height: 844 } })
const erros = []
p.on('pageerror', (e) => erros.push(String(e)))
p.on('console', (m) => m.type() === 'error' && erros.push(m.text()))

await p.goto('http://localhost:4173/', { waitUntil: 'domcontentloaded' })
await p.waitForTimeout(2800)
await p.screenshot({ path: 'shots/m-lp-hero.png' })

// abre o menu em tela cheia
await p.click('button[aria-label="Menu"]')
await p.waitForTimeout(1000)
await p.screenshot({ path: 'shots/m-lp-menu.png' })

// clica em "Galeria" dentro do overlay (o nav do desktop está oculto)
await p.evaluate(() => {
  const overlay = [...document.querySelectorAll('div')].find(
    (d) => getComputedStyle(d).position === 'fixed' && d.querySelector('nav button')
  )
  const btns = [...overlay.querySelectorAll('nav button')]
  btns.find((x) => x.textContent.includes('Galeria')).click()
})
await p.waitForTimeout(2500)

const topo = await p.evaluate(() =>
  Math.round(document.getElementById('galeria').getBoundingClientRect().top)
)
const menuFechado = await p.evaluate(() => document.body.style.overflow !== 'hidden')
console.log(
  `menu -> galeria: topo ${topo}px ${Math.abs(topo) < 90 ? 'OK' : 'FORA'} · menu fechado: ${menuFechado ? 'SIM' : 'NAO'}`
)
await p.screenshot({ path: 'shots/m-lp-galeria.png' })

const overflow = await p.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth
)
console.log(`overflow-x: ${overflow}px · erros: ${erros.length}`, erros.slice(0, 2))
await b.close()
