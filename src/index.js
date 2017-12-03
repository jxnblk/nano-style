import React from 'react'
import hash from './hash'
import parse from './parse'
import withTheme from './withTheme'

const prefix = 'nano'

const styled = Component => (...args) => {
  const staticStyles = args.filter(a => typeof a !== 'function')
    .reduce((a, b) => Object.assign(a, b), {})
  const dynamicStyles = args.filter(a => typeof a === 'function')
  const baseClassName = prefix + hash(JSON.stringify(staticStyles))
  const base = parse('.' + baseClassName, staticStyles)

  class Styled extends React.Component {
    constructor (props) {
      super(props)

      this.getStyles = props => {
        const styles = dynamicStyles.map(fn => fn(props))
        const className = prefix + hash(JSON.stringify(styles))
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
          'innerRef',
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
      const { className, css } = this.state
      const next = this.getProps(this.props)

      const cn = [
        this.props.className,
        baseClassName,
        className
      ].join(' ').trim()

      return [
        <Component
          {...next}
          ref={this.props.innerRef}
          key='Component'
          className={cn}
        />,
        !!base && <Style key='base' css={base} />,
        !!css && <Style key='css' css={css} />,
      ]
    }
  }

  Styled.defaultProps = {
    className: ''
  }

  const ThemeStyled = withTheme(Styled)

  return ThemeStyled
}

const Style = ({ css }) =>
  <style dangerouslySetInnerHTML={{ __html: css }} />

export default styled
export { default as ThemeProvider } from './ThemeProvider'
