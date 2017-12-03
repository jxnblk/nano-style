import React from 'react'
import assign from 'deep-assign'
import hash from './hash'
import parse from './parse'
import withTheme from './withTheme'

const prefix = 'alpha_nano'

const styled = Component => (...baseArgs) => {
  const args = Array.isArray(Component._styles) ? [ ...Component._styles, ...baseArgs ] : baseArgs

  class Styled extends React.Component {
    constructor (props) {
      super(props)

      this.getStyles = props => {
        // const props = Object.assign({}, Component.defaultProps, _props)
        // console.log(props, args)
        const styles = args.map(arg => typeof arg === 'function' ? arg(props) : arg)
        const style = styles.reduce((a, b) => assign(a, b), {})
        const className = props.className || prefix + hash(JSON.stringify(style))
        // const css = styles.map(style => parse('.' + className, style)).join('')

        const css = parse('.' + className, style)

        this.setState({
          className,
          css
        })
      }

      this.getBlacklist = () => {
        return [
          ...Object.keys(ThemeStyled.propTypes || {}),
          'theme'
        ]
      }

      this.getProps = props => {
        const next = {}
        const blacklist = this.getBlacklist()
        for (let key in props) {
          if (blacklist.includes(key)) continue
          next[key] = props[key]
        }

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
      const { className, css } = this.state
      const next = this.getProps(this.props)

      return [
        <Component
          {...next}
          key='Component'
          className={className}
        />,
        !!css && !next.className && <Style key='css' css={css} />
        // !!css && <Style key='css' css={css} />
      ]
    }
  }

  const ThemeStyled = withTheme(Styled)

  ThemeStyled.defaultProps = Component.defaultProps
  // Styled._styles = args

  ThemeStyled._styles = args

  return ThemeStyled
}

const Style = ({ css }) =>
  <style dangerouslySetInnerHTML={{ __html: css }} />

export default styled
export { default as ThemeProvider } from './ThemeProvider'
