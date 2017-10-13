import React from 'react'
import Style from './Style'

let base = ''
const cache = {}

class StyleProvider extends React.Component {
  static registerCSS = (id, css) => {
    if (cache[id]) return true
    base += css
    cache[id] = true
    return true
  }

  render () {
    return [
      <Style id='nano-style-provider' key='provider-style' css={base} />,
      this.props.children
    ]
  }
}

export default StyleProvider
