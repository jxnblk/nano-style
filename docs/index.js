import React from 'react'
import {
  Provider,
  Base
} from '../src'

const colors = [
  'red',
  'magenta',
  'blue',
  'cyan',
  'green',
  'yellow',
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

    return (
      <Provider>
        <button onClick={e => { this.update(inc) }}>
          Beep
        </button>
        <Base
          css={{
            fontWeight: 'bold',
            padding: 64,
            backgroundColor: color
          }}>
          Hello
        </Base>
      </Provider>
    )
  }
}
