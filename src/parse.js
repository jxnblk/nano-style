let cache = {}

const hyph = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()
const mx = (rule, media) => media ? `${media}{${rule}}` : rule
const noAnd = s => s.replace(/&/g, '')
const createDeclaration = (key, value) => hyph(key) + ':' + value
const createRule = ({
  selector,
  child,
  media,
  declarations
}) => mx(`${selector + child}{${declarations.join(';')}}`, media)

const parseRules = (obj, child = '', media) => {
  const rules = []
  const declarations = []

  for (let key in obj) {
    const value = obj[key]

    if (value === null) continue

    if (typeof value === 'object') {
      const _media = /^@/.test(key) ? key : null
      const _child = _media ? child : child + noAnd(key)
      parseRules(value, _child, _media)
        .forEach(r => rules.push(r))
      continue
    }

    const dec = createDeclaration(key, value)
    declarations.push(dec)
  }

  rules.unshift({
    media,
    child,
    declarations
  })

  return rules
}

const parse = (selector, obj) => {
  const rules = parseRules(obj)
  const cssRules = []

  rules
    .filter(rule => rule.declarations.length)
    .forEach(rule => {
      const key = JSON.stringify(rule)
      // removes styles on updates
      // if (cache[key]) return

      const ruleset = createRule(Object.assign(rule, { selector }))
      cssRules.push(ruleset)
      cache[key] = true
    })

  return cssRules.join('')
}

module.exports = parse
