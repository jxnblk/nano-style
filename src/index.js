import React from 'react'
import PropTypes from 'prop-types'
import hash from './hash'
import parse from './parse'
import withTheme from './withTheme'
import Style from './Style'
import { PREFIX, CHANNEL } from './constants'

const styled = Component => (...args) => {
  const staticStyles = args.filter(a => typeof a !== 'function')
    .reduce((a, b) => Object.assign(a, b), {})
  const dynamicStyles = args.filter(a => typeof a === 'function')
  const baseClassName = PREFIX + hash(JSON.stringify(staticStyles))
  const base = parse('.' + baseClassName, staticStyles)
  const isElement = typeof Component === 'string'

  class Styled extends React.Component {
    static contextTypes = {
      registerCSS: PropTypes.func
    }

    constructor (props, context) {
      super(props)

      this.getStyles = props => {
        const styles = dynamicStyles.map(fn => fn(props))
        const className = PREFIX + hash(JSON.stringify(styles))
        const css = styles.map(style => parse('.' + className, style)).join('')

        this.setState({
          className,
          css
        })
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

      this.state = {
        className: '',
        css: ''
      }

      this.registered = false

      const { registerCSS } = context
      if (typeof registerCSS === 'function') {
        // registerCSS(baseClassName, base)
      }
    }

    componentWillMount () {
      this.getStyles(this.props)
    }

    componentDidMount () {
      const { registerCSS } = this.context
      if (typeof registerCSS === 'function') {
        this.registered = registerCSS(baseClassName, base)
      }
    }

    componentWillReceiveProps (next) {
      if (next !== this.props) {
        this.getStyles(next)
      }
    }

    render () {
      const { css } = this.state
      const next = this.getProps(this.props)

      const className = [
        this.props.className,
        baseClassName,
        this.state.className
      ].join(' ').trim()

      return [
        !this.registered && !!base && <Style key='base' css={base} />,
        !!css && <Style key='css' css={css} />,
        <Component
          {...next}
          key='Component'
          className={className}
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
