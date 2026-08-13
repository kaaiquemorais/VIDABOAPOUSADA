import { readFileSync } from 'node:fs'
const buf = readFileSync(process.argv[2])
const vistos = new Map()
for (let i = 0; i + 2 < buf.length; i += 3) {
  const hex = '#' + [buf[i], buf[i + 1], buf[i + 2]].map((n) => n.toString(16).padStart(2, '0')).join('')
  vistos.set(hex, (vistos.get(hex) ?? 0) + 1)
}
;[...vistos.entries()]
  .filter(([h]) => h !== '#ffffff' && h !== '#000000')
  .sort((a, b) => b[1] - a[1])
  .slice(0, 16)
  .forEach(([h, n]) => console.log(h, n))
