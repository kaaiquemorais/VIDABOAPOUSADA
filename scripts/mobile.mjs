import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://localhost:4173'
mkdirSync('shots', { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
const erros = []
page.on('pageerror', (e) => erros.push(String(e)))

await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(3000)
await page.screenshot({ path: 'shots/m-hero.png' })

// abre o seletor de hóspedes e confere o preenchimento das datas
await page.fill('input[aria-label="Data de check-in"]', '2026-09-11')
await page.waitForTimeout(400)
await page.selectOption('select[aria-label="Número de hóspedes"]', '4')
await page.waitForTimeout(600)
await page.screenshot({ path: 'shots/m-reserva.png' })

const href = await page.evaluate(() => {
  const f = document.querySelector('form')
  return f ? 'form ok' : 'sem form'
})
const checkout = await page.inputValue('input[aria-label="Data de check-out"]')
console.log(`${href} · checkout auto: ${checkout} · erros: ${erros.length}`)

await browser.close()
