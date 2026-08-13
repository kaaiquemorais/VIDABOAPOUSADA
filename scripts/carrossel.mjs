import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45))
await p.waitForTimeout(1800)
const m = await p.evaluate(() => {
  const card = document.querySelector('[data-card]')
  const titulo = [...document.querySelectorAll('h2')].find(h => h.textContent?.includes('Arraste'))
  const trilho = card?.parentElement
  return {
    cardLeft: card?.getBoundingClientRect().left,
    tituloLeft: titulo?.getBoundingClientRect().left,
    trilhoScroll: trilho?.scrollLeft,
    padLeft: trilho ? getComputedStyle(trilho).paddingLeft : null,
  }
})
console.log(m)
await b.close()
