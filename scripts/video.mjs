import { chromium } from 'playwright'
const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] })
for (const [nome, vw, vh] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const p = await b.newPage({ viewport: { width: vw, height: vh } })
  await p.goto('http://localhost:4173/', { waitUntil: 'domcontentloaded' })
  await p.waitForTimeout(4000)
  const leitura = async () =>
    p.evaluate(() => {
      const v = document.querySelector('video')
      return v ? { t: +v.currentTime.toFixed(2), pausado: v.paused, src: v.currentSrc.split('/').pop() } : null
    })
  const a = await leitura()
  await p.waitForTimeout(2500)
  const c = await leitura()
  const avancou = c && a && c.t > a.t + 1
  console.log(`${nome}: ${a?.src} | ${a?.t}s -> ${c?.t}s | pausado=${c?.pausado} | ${avancou ? 'RODANDO' : 'TRAVADO'}`)
  await p.close()
}
await b.close()
