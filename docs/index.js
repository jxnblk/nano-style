import React from 'react'
import { space, fontSize, color } from 'styled-system'
import {
  Provider,
  Base,
  styled,
} from '../src'

const colors = [
  '#f00',
  '#f0f',
  '#00f',
  '#0ff',
  '#0f0',
  '#ff0',
]

const theme = {
  colors: {
    blue: '#0af'
  }
}

const inc = s => ({ count: s.count + 1 })

const Button = styled.button({
  fontFamily: 'inherit',
  fontSize: 14,
  fontWeight: 'bold',
  lineHeight: 16/14 + '',
  margin: 0,
  border: 'none',
  borderRadius: 8,
  WebkitFontSmoothing: 'antialiased',
  display: 'inline-block',
  verticalAlign: 'middle',
  textAlign: 'center',
  textDecoration: 'none',
  appearance: 'none',
  '&:disabled': {
    opacity: 1/4
  }
}, space, color)
Button.defaultProps = {
  px: 3,
  py: 2,
  color: 'white',
  bg: 'blue'
}
Button.propTypes = {
  ...color.propTypes,
  ...space.propTypes,
}

export default class extends React.Component {
  state = {
    count: 0
  }

  update = fn => this.setState(fn)

  render () {
    const { count } = this.state
    const color = colors[count % colors.length]
    const hoverColor = colors[(count + 1) % colors.length]

    return (
      <Provider theme={theme}>
        <h1>Stress test</h1>
        <Button
          m={3}
          onClick={e => { this.update(inc) }}>
          Beep
        </Button>
        <Base
          css={{
            fontWeight: 'bold',
            padding: 64,
            backgroundColor: color,
            '@media (min-width: 48em)': {
              fontSize: 32,
              '&:hover': {
                color: 'yellow'
              }
            },
            '&:hover': {
              backgroundColor: hoverColor
            }
          }}>
          Hello
        </Base>
        <Base
          is='h1'
          css={[
            space({ p: [ 4, 5 ], m: 0 }),
            fontSize({
              fontSize: [ 4, 5, 6 ]
            }),
            { color }
          ]}
          children='beep boop'
        />
      </Provider>
    )
  }
}
