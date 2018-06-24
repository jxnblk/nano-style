import React from 'react'
import { space, fontSize } from 'styled-system'
import {
  Provider,
  Base
} from '../src'

const colors = [
  '#f00',
  '#f0f',
  '#00f',
  '#0ff',
  '#0f0',
  '#ff0',
]

const inc = s => ({ count: s.count + 1 })

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
      <Provider>
        <button onClick={e => { this.update(inc) }}>
          Beep
        </button>
        <Base
          css={{
            fontWeight: 'bold',
            padding: 64,
            backgroundColor: color,
            '@media (min-width: 48em)': {
              fontSize: 32
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
            space({
              p: [ 4, 5 ],
              m: 0
            }),
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
