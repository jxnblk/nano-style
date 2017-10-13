import React from 'react'
import PropTypes from 'prop-types'

class Provider extends React.Component {
  static childContextTypes = {
    registerCSS: PropTypes.func
  }

  constructor () {
    super()
    this.state = {
      css: '',
      styles: []
    }

    this.registerCSS = css => {
      this.setState(state => ({
        css: state.css + css
      }))
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
      <Style key='provider-style' css={css} />,
      this.props.children
    ]
  }
}

const Style = ({ css }) =>
  <style dangerouslySetInnerHTML={{ __html: css }} />

export default Provider
