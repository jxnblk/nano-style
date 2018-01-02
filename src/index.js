const React = require('react')
const hash = require('./hash')
const parse = require('./parse')
const withTheme = require('./withTheme')
const ThemeProvider = require('./ThemeProvider')

const prefix = 'nano'

const nano = Component => (...baseArgs) => {
  const args = Array.isArray(Component.styles) ? [ ...Component.styles, ...baseArgs ] : baseArgs

  const Nano = withTheme(class extends React.Component {
    constructor (props) {
      super(props)

      this.getStyles = _props => {
        const props = Object.assign({}, Component.defaultProps, _props)
        const styles = args.map(arg => typeof arg === 'function' ? arg(props) : arg)
        const className = props.className || prefix + hash(JSON.stringify(styles))
        const css = styles.map(style => parse('.' + className, style)).join('')

        this.setState({
          className,
          css
        })
      }

      this.getBlacklist = () => [
        ...Object.keys(Nano.propTypes || {}),
        'innerRef',
        'theme'
      ]

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
          ref={this.props.innerRef}
          key='Component'
          className={className}
        />,
        !!css && !next.className && <Style key='css' css={css} />
      ]
    }
  })

  Nano.styles = args
  Nano.displayName = typeof Component === 'string'
    ? `Nano(${Component})`
    : Component.displayName

  return Nano
}

const Style = ({ css }) =>
  <style dangerouslySetInnerHTML={{ __html: css }} />

module.exports = nano
module.exports.ThemeProvider = ThemeProvider
