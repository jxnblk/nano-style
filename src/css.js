const React = require('react')
const stylis = require('stylis')
const objss = require('objss')
const hash = require('./hash')
const withTheme = require('./withTheme')
const ThemeProvider = require('./ThemeProvider')

const prefix = 'nano'

const styled = Component => (strings, ...tokens) => {
  class Styled extends React.Component {
    render () {
      const styles = strings.map((str, i) => {
        const token = tokens[i] || ''
        const parsed = typeof token === 'function'
          ? token(this.props)
          : token
        const css = typeof parsed === 'object'
          ? objss(parsed)
          : parsed
        return str + css
      }).join('')
      const className = prefix + hash(styles)
      const css = stylis('.' + className, styles)

      const blacklist = [
        ...Object.keys(ThemeStyled.propTypes || {}),
        'theme'
      ]
      const next = {}
      for (let key in this.props) {
        if (blacklist.includes(key)) continue
        next[key] = this.props[key]
      }

      next.className = [
        this.props.className,
        className
      ].join(' ').trim()

      return [
        <Style key='css' css={css} />,
        <Component key='Component' {...next} />
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

module.exports = styled
module.exports.ThemeProvider = ThemeProvider
