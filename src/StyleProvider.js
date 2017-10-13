import React from 'react'
import PropTypes from 'prop-types'
import Style from './Style'
import { CHANNEL } from './constants'

let base = ''
const cache = {}

class StyleProvider extends React.Component {
  static childContextTypes = {
    [CHANNEL]: PropTypes.shape({
      cache: PropTypes.object
    })
  }

  static registerCSS = (id, css) => {
    if (cache[id]) return true
    base += css
    cache[id] = true
    return true
  }

  getChildContext () {
    return {
      [CHANNEL]: {
        cache
      }
    }
  }

  render () {
    return [
      <Style id='nano-style-provider' key='provider-style' css={base} />,
      this.props.children
    ]
  }
}

export default StyleProvider
