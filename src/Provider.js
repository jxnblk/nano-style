import React from 'react'
import PropTypes from 'prop-types'
import StyleProvider from './StyleProvider'
import ThemeProvider from './ThemeProvider'

class Provider extends React.Component {
  render () {
    return (
      <StyleProvider>
        <ThemeProvider theme={this.props.theme}>
          {this.props.children}
        </ThemeProvider>
      </StyleProvider>
    )
  }
}

export default Provider
