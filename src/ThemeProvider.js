import React from 'react'
import PropTypes from 'prop-types'

const createTheme = (theme = {}) => Object.assign(function (keys = '') {
  return keys.split('.')
    .reduce((a, b) => (a && a[b]) ? a[b] : null, theme)
}, theme)

class ThemeProvider extends React.Component {
  getChildContext () {
    return {
      theme: createTheme(this.props.theme)
    }
  }

  render () {
    return <div>{this.props.children}</div>
  }
}

ThemeProvider.childContextTypes = {
  theme: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ])
}

export default ThemeProvider
