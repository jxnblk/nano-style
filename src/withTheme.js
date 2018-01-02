const React = require('react')
const PropTypes = require('prop-types')

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

module.exports = withTheme
