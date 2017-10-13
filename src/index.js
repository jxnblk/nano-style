import React from 'react'
import PropTypes from 'prop-types'
import hash from './hash'
import parse from './parse'
import withTheme from './withTheme'
import Style from './Style'
import { PREFIX, CHANNEL } from './constants'

const styled = Component => (...args) => {
  const isElement = typeof Component === 'string'

  class Styled extends React.Component {
    static contextTypes = {
      registerCSS: PropTypes.func,
      removeCSS: PropTypes.func,
      cache: PropTypes.array
    }

    constructor (props, context) {
      super(props)

      this.getStyles = props => {
        const styles = args.map(a => typeof a === 'function' ? a(props) : a)
        const className = PREFIX + hash(JSON.stringify(styles))
        const css = styles.map(style => parse('.' + className, style)).join('')

        const { registerCSS } = context
        if (typeof registerCSS === 'function') {
          registerCSS(className, css)
        }

        return {
          className,
          css
        }
      }

      this.getProps = props => {
        if (!isElement) return props
        const next = {}
        const blacklist = [
          ...Object.keys(ThemeStyled.propTypes || {}),
          'theme'
        ]
        for (let key in props) {
          if (blacklist.includes(key)) continue
          next[key] = props[key]
        }
        if (props.className) next.className = '' + props.className

        return next
      }

      this.state = this.getStyles(props)
    }

    componentWillReceiveProps (next) {
      if (next !== this.props) {
        const nextCSS = this.getStyles(next)
        if (nextCSS.css === this.state.css) return
        const { className } = this.state
        const { removeCSS } = this.context

        if (typeof removeCSS === 'function') {
          // might remove for other components
          removeCSS(className)
        }
        this.setState(this.getStyles(next))
      }
    }

    render () {
      const { className, css } = this.state
      const { cache = [] } = this.context
      const cached = cache.includes(className)
      const next = this.getProps(this.props)

      const cn = [ this.props.className, className ].join(' ').trim()

      return [
        !cached && !!css && <Style key='css' css={css} />,
        <Component
          {...next}
          key='Component'
          className={cn}
        />
      ]
    }
  }

  Styled.defaultProps = {
    className: ''
  }

  const ThemeStyled = withTheme(Styled)

  return ThemeStyled
}

export default styled
export { default as Provider } from './Provider'
