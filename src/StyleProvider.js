import React from 'react'
import PropTypes from 'prop-types'
import Style from './Style'

class StyleProvider extends React.Component {
  static childContextTypes = {
    registerCSS: PropTypes.func,
    removeCSS: PropTypes.func,
    cache: PropTypes.array
  }

  constructor () {
    super()

    this.state = {
      rules: []
    }

    this.registerCSS = (id, css) => {
      const { rules } = this.state
      const rule = rules.find(r => r.id === id)
      if (rule) return true
      this.setState(state => ({
        css: state.css + css,
        rules: [
          ...state.rules,
          { id, css }
        ]
      }))

      return true
    }

    this.removeCSS = id => {
      const { rules } = this.state
      const i = rules.findIndex(r => r.id === id)
      this.setState(state => ({
        rules: [
          ...state.rules.slice(0, i),
          ...state.rules.slice(i + 1),
        ]
      }))
    }
  }

  getChildContext () {
    return {
      registerCSS: this.registerCSS,
      removeCSS: this.removeCSS,
      cache: this.state.rules.map(r => r.id)
    }
  }

  render () {
    const { rules } = this.state
    const css = rules.map(r => r.css).join('')

    return [
      <Style id='nano-style-provider' key='provider-style' css={css} />,
      this.props.children
    ]
  }
}

export default StyleProvider
