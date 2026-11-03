import { readFile } from 'node:fs/promises'

const fileUrl = new URL('../public/data/terms.json', import.meta.url)
const terms = JSON.parse(await readFile(fileUrl, 'utf8'))

if (!Array.isArray(terms) || terms.length === 0) {
  throw new Error('terms.json doit contenir un tableau non vide.')
}

const seen = new Set()

for (const [index, entry] of terms.entries()) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
    throw new Error(`Entrée ${index + 1} : un objet est attendu.`)
  }

  for (const field of ['term', 'definition']) {
    if (typeof entry[field] !== 'string' || entry[field].trim() === '') {
      throw new Error(`Entrée ${index + 1} : le champ ${field} doit être une chaîne non vide.`)
    }
    if (entry[field] !== entry[field].trim()) {
      throw new Error(`Entrée ${index + 1} : le champ ${field} contient des espaces superflus.`)
    }
  }

  const key = entry.term.toLocaleLowerCase('fr-FR')
  if (seen.has(key)) {
    throw new Error(`Terme dupliqué : ${entry.term}`)
  }
  seen.add(key)

  if (entry.definition.length < 45) {
    throw new Error(`Définition trop courte pour « ${entry.term} ».`)
  }
}

console.log(`${terms.length} termes valides, sans doublon.`)
