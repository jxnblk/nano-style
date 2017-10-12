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
    render () {
      const styles = dynamicStyles
        .map((func, i) => func(this.props))

      const dynamicClassName = prefix + hash(JSON.stringify(styles))
      const css = styles.map(style => parse('.' + dynamicClassName, style)).join('')

      const blacklist = Object.keys(ThemeStyled.propTypes || {})
      const next = {}
      for (let key in this.props) {
        if (typeof Component === 'string' && blacklist.includes(key)) continue
        next[key] = this.props[key]
      }

      next.className = [
        this.props.className,
        baseClassName,
        dynamicClassName
      ].join(' ').trim()

      return [
        !!base && <Style key='base' css={base} />,
        !!css && <Style key='css' css={css} />,
        <Component key='Component' {...next} />
      ]
    }
  }

  Styled.defaultProps = {
    className: ''
  }

  const ThemeStyled = withTheme(Styled)

  // return withTheme(Styled)
  return ThemeStyled
}

const Style = ({ css }) =>
  <style dangerouslySetInnerHTML={{ __html: css }} />

export default styled
export { default as ThemeProvider } from './ThemeProvider'
