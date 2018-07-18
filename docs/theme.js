import chroma from 'chroma-js'

const black = '#000'
const cyan = '#0ff'
const magenta = '#f0f'
const yellow = '#ff0'

const steps = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9
]
  .map(n => n + 2)
  .map(n => n / 20)

const createColorRange = base => {
  const [ h, s, l ] = chroma(base).hsl()
  return steps.map(n => {
    return chroma.hsl([ h, s, n ]).hex()
  })
}

const colors = {
  black,
  cyan,
  magenta,
  yellow
}

createColorRange(magenta)
  .forEach((val, i) => {
    colors['m' + i] = val
  })

createColorRange(cyan)
  .forEach((val, i) => {
    colors['c' + i] = val
  })

createColorRange(yellow)
  .forEach((val, i) => {
    colors['y' + i] = val
  })

export default {
  colors
}
