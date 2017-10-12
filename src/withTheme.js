import React from 'react'
import PropTypes from 'prop-types'

const withTheme = Component => {
  return class Themed extends React.Component {
    static contextTypes = {
      theme: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
      ])
    }

    render() {
      return (
        <Component
          {...this.context}
          {...this.props}
        />
      )
    }
  }
}

export default withTheme
