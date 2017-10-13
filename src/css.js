import React from 'react'
import stylis from 'stylis'
import objss from 'objss'
import hash from './hash'
import withTheme from './withTheme'
import Style from './Style'
import { PREFIX, CHANNEL } from './constants'

const styled = Component => (strings, ...tokens) => {
  const isElement = typeof Component === 'string'
  // todo: can any of this be parsed statically?
  // - check for !tokens.length

  class Styled extends React.Component {
    constructor (props, context) {
      super(props)

      this.getStyles = props => {
        const styles = tokens.map((token = '', i) => {
          const parsed = typeof token === 'function'
            ? token(props)
            : token
          const css = typeof parsed === 'object'
            ? objss(parsed)
            : parsed
          return strings[i] + css
        }).join('')
        const className = PREFIX + hash(styles)
        const css = stylis('.' + className, styles)

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
    }

    componentWillMount () {
      this.getStyles(this.props)
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
        this.state.className
      ].join(' ').trim()

      return [
        <Style key='css' css={css} />,
        <Component
          key='Component'
          {...next}
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
