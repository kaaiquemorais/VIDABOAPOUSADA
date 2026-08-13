import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
mkdirSync('shots', { recursive: true })

const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
const erros = []
p.on('pageerror', (e) => erros.push(String(e)))
p.on('console', (m) => m.type() === 'error' && erros.push(m.text()))

await p.goto('http://localhost:4173/', { waitUntil: 'domcontentloaded' })
await p.waitForTimeout(3000)

// as seções existem?
const secoes = await p.evaluate(() =>
  ['pousada', 'chales', 'estrutura', 'galeria', 'localizacao'].map((id) => ({
    id, existe: !!document.getElementById(id),
  }))
)
console.log('secoes:', secoes.map(s => `${s.id}=${s.existe ? 'ok' : 'FALTA'}`).join(' '))

// a navegação leva até a seção?
for (const id of ['chales', 'galeria', 'localizacao']) {
  await p.evaluate((i) => {
    const btns = [...document.querySelectorAll('header nav button')]
    const alvo = { chales: 'Chalés', galeria: 'Galeria', localizacao: 'Onde fica' }[i]
    btns.find((b) => b.textContent.trim() === alvo)?.click()
  }, id)
  await p.waitForTimeout(1800)
  const topo = await p.evaluate((i) => Math.round(document.getElementById(i).getBoundingClientRect().top), id)
  console.log(`nav -> ${id}: topo em ${topo}px ${Math.abs(topo) < 90 ? 'OK' : 'FORA'}`)
}

await p.evaluate(() => window.scrollTo(0, 0))
await p.waitForTimeout(1200)
const altura = await p.evaluate(() => document.body.scrollHeight)
const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
console.log(`altura total: ${altura}px · overflow-x: ${overflow}px · erros: ${erros.length}`, erros.slice(0,3))

// capturas ao longo da página
for (let i = 0; i < 10; i++) {
  await p.evaluate((n) => window.scrollTo(0, n * 900), i)
  await p.waitForTimeout(900)
  await p.screenshot({ path: `shots/lp-${String(i).padStart(2, '0')}.png` })
}
await b.close()
