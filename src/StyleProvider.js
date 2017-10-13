import React from 'react'
import PropTypes from 'prop-types'
import Style from './Style'

class StyleProvider extends React.Component {
  static childContextTypes = {
    registerCSS: PropTypes.func
  }

  constructor () {
    super()
    this.state = {
      css: ''
    }

    this.cache = {}

    this.registerCSS = (id, css) => {
      if (this.cache[id]) return css
      this.setState(state => ({
        css: state.css + css
      }))
      this.cache[id] = true
      return css
    }
  }

  getChildContext () {
    return {
      registerCSS: this.registerCSS
    }
  }

  render () {
    const { css } = this.state

    return [
      <Style id='nano-style-provider' key='provider-style' css={css} />,
      this.props.children
    ]
  }
}

export default StyleProvider
