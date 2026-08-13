import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 390, height: 844 } })
await p.goto('http://localhost:4173/', { waitUntil: 'domcontentloaded' })
await p.waitForTimeout(2500)
const r = await p.evaluate(() => {
  const limite = document.documentElement.clientWidth
  const fora = []
  // só quem realmente empurra a página: nenhum ancestral corta o excesso
  const cortado = (el) => {
    let n = el.parentElement
    while (n && n !== document.body) {
      const o = getComputedStyle(n)
      if (o.overflowX !== 'visible') return true
      n = n.parentElement
    }
    return false
  }
  document.querySelectorAll('*').forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.width === 0) return
    if (rect.right > limite + 1 && !cortado(el)) {
      fora.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className?.toString?.() || '').slice(0, 100),
        left: Math.round(rect.left), right: Math.round(rect.right),
      })
    }
  })
  return { limite, scroll: document.documentElement.scrollWidth, fora: fora.slice(0, 8) }
})
console.log(`client ${r.limite} · scroll ${r.scroll}`)
r.fora.forEach((c) => console.log(` ${c.tag} [${c.left} -> ${c.right}] ${c.cls}`))
if (!r.fora.length) console.log(' nenhum elemento nao-cortado excede')
await b.close()
