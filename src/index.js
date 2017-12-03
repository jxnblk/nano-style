import React from 'react'
// import assign from 'deep-assign'
import hash from './hash'
import parse from './parse'
import withTheme from './withTheme'

const prefix = 'nano'

const styled = Component => (...baseArgs) => {
  const args = Array.isArray(Component._styles) ? [ ...Component._styles, ...baseArgs ] : baseArgs

  class Styled extends React.Component {
    constructor (props) {
      super(props)

      this.getStyles = props => {
        const styles = args.map(arg => typeof arg === 'function' ? arg(props) : arg)
        // const style = styles.reduce((a, b) => assign(a, b), {})
        const className = prefix + hash(JSON.stringify(styles))
        // const css = parse('.' + className, style)
        const css = styles.map(style => parse('.' + className, style)).join('')

        this.setState({
          className,
          css
        })
      }

      this.getProps = props => {
        const next = {}
        const blacklist = [
          ...Object.keys(ThemeStyled.propTypes || {}),
          'theme'
        ]
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
          key='Component'
          className={className}
          {...next}
        />,
        !!css && !next.className && <Style key='css' css={css} />
      ]
    }
  }

  const ThemeStyled = withTheme(Styled)

  ThemeStyled._styles = args

  return ThemeStyled
}

const Style = ({ css }) =>
  <style dangerouslySetInnerHTML={{ __html: css }} />

export default styled
export { default as ThemeProvider } from './ThemeProvider'
