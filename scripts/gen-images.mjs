import { readdirSync, writeFileSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const imgDir = join(root, 'public', 'img')

const cats = readdirSync(imgDir).filter((d) => statSync(join(imgDir, d)).isDirectory())

const out = {}
for (const c of cats) {
  out[c] = readdirSync(join(imgDir, c))
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort()
    .map((f) => `/img/${c}/${f}`)
}

const body = `// GERADO AUTOMATICAMENTE por scripts/gen-images.mjs — não editar à mão.

export const LIBRARY = ${JSON.stringify(out, null, 2)} as const

export type Categoria = keyof typeof LIBRARY

export const TODAS: string[] = Object.values(LIBRARY).flat() as string[]
`

writeFileSync(join(root, 'src', 'lib', 'library.ts'), body)
console.log(
  'ok:',
  cats.map((c) => `${c}=${out[c].length}`).join(' ')
)
