import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
const ruins = new Set()
p.on('response', (r) => { if (r.status() >= 400) ruins.add(`${r.status()} ${r.url()}`) })
for (const rota of ['/', '/chales', '/estrutura', '/galeria', '/localizacao']) {
  await p.goto('http://localhost:4173' + rota, { waitUntil: 'networkidle' })
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120))
    }
  })
  await p.waitForTimeout(1200)
}
await b.close()
console.log(ruins.size ? [...ruins].join('\n') : 'nenhum recurso quebrado')
