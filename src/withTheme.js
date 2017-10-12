import React from 'react'
import { channel } from 'theming'
import PropTypes from 'prop-types'

const init = context => context[channel] ? context[channel].getState() : {}

const subscribe = (context, cb) => {
  if (context[channel]) {
    return context[channel].subscribe(cb)
  }
}

const withTheme = Component => {
  return class Themed extends React.Component {
    static contextTypes = {
      [channel]: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
      ])
    }

    constructor(props, context) {
      super(props, context)

      this.state = {
        theme: init(context)
      }

      this.setTheme = theme => this.setState({ theme })
    }

    componentDidMount() {
      this.unsubscribe = subscribe(this.context, this.setTheme)
    }

    componentWillUnmount() {
      if (typeof this.unsubscribe === 'function') {
        this.unsubscribe()
      }
    }

    render() {
      const { theme } = this.state
      return <Component theme={theme} {...this.props} />
    }
  }
}

export default withTheme
