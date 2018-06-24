import React from 'react'
import { renderToString } from 'react-dom/server'
import PropTypes from 'prop-types'

export const hyphenate = s =>
  s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()

export const Context = React.createContext({})

export const Style = ({ css }) =>
  <style
    dangerouslySetInnerHTML={{
      __html: css
    }}
  />

export class Provider extends React.Component {
  static defaultProps = {
    theme: {}
  }
  initialRules = []
  didMount = false
  cache = {}
  count = 0

  state = {
    rules: []
  }

  get rules () {
    return this.didMount
      ? this.state.rules
      : this.initialRules
  }

  constructor (props) {
    super()
    renderToString(
      <Context.Provider
        value={{
          theme: props.theme,
          createRules: this.createRules
        }}>
        {props.children}
      </Context.Provider>
    )
  }

  componentDidMount () {
    this.setState({
      rules: this.initialRules
    }, () => {
      this.didMount = true
    })
  }

  createRules = (args) => {
    args = Array.isArray(args) ? args : [ args ]
    const classNames = args.map(style => this.parseStyle(style))
    return classNames.join(' ')
  }

  parseStyle = (obj, parents = []) => {
    const classNames = []
    for (const key in obj) {
      const value = obj[key]
      if (value === null || value === false) continue
      switch (typeof value) {
        case 'object':
          classNames.push(
            this.parseStyle(value, [ ...parents, key ])
          )
          continue
        case 'number':
          classNames.push(
            this.createRule(key, value + 'px', parents)
          )
          continue
        case 'string':
          classNames.push(
            this.createRule(key, value, parents)
          )
      }
    }
    return classNames.join(' ')
  }

  createRule = (key, value, parents = []) => {
    const declaration = [ hyphenate(key), value ].join(':')
    const id = [ ...parents, declaration ].join('')
    const cached = this.cache[id]
    if (cached) return cached
    const className = this.createClassName()
    this.addRule({ id, className, declaration, parents })
    return className
  }

  addRule = ({ id, className, declaration, parents }) => {
    const pseudos = parents.filter(key => /&:/.test(key))
      .map(selector => selector.replace('&', '.' + className))
    const atRule = parents.find(key => /^@/.test(key))
    const selector = pseudos.length
      ? pseudos.join(',')
      : '.' + className
    let rule = [ selector, '{', declaration, '}' ].join('')
    if (atRule) {
      rule = [ atRule, '{', rule, '}' ].join('')
    }
    this.cache[id] = className
    if (!this.didMount) {
      this.initialRules.push(rule)
      return
    }
    this.setState(state => ({
      rules: [
        ...state.rules,
        rule
      ]
    }))
  }

  createClassName = () => {
    return 'x' + (this.count++).toString(32)
  }

  render () {
    const { theme, children } = this.props
    const rules = this.rules
    const context = {
      theme,
      createRules: this.createRules
    }

    return (
      <React.Fragment>
        <Style css={rules.join('')} />
        <Context.Provider value={context}>
          {children}
        </Context.Provider>
        <pre children={JSON.stringify(rules, null, 2)} />
      </React.Fragment>
    )
  }
}

export const withStyle = Component => React.forwardRef((props, ref) =>
  <Context.Consumer>
    {ctx => <Component {...props} {...ctx} innerRef={ref} />}
  </Context.Consumer>
)

export const omit = (props, blacklist = []) => {
  const next = {}
  for (const key in props) {
    if (blacklist.includes(key)) continue
    next[key] = props[key]
  }
  return next
}

export const createStyles = (args, props) => Array.isArray(args)
  ? args.map(arg => typeof arg === 'function' ? arg(props) : arg)
  : args

const noop = () => {}
export const Base = withStyle(class Nano extends React.Component {
  static defaultProps = {
    theme: {}
  }

  static propTypes = {
    theme: PropTypes.object.isRequired,
    createRules: (props, name, component) => {
      if (name === 'createRules' && typeof props[name] !== 'function') {
        return new Error(
          `Nano Base component requires a parent Provider component`
        )
      }
    }
  }

  static getDerivedStateFromProps (props, state) {
    const { createRules = noop, css, className } = props
    const styles = createStyles(css, props)
    const combined = [
      className,
      createRules(styles)
    ].filter(Boolean).join(' ')
    if (combined === className) return null
    return {
      className: combined
    }
  }

  state = {
    className: this.props.className
  }

  render () {
    const {
      createRules,
      css,
      is: Comp = 'div',
      theme,
      innerRef,
      ...props
    } = this.props
    const { className } = this.state

    return <Comp {...props} className={className} ref={innerRef} />
  }
})

export const styled = (type) => (...args) => {
  const Styled = withStyle(props => {
    const cleaned = omit(props, Object.keys(Styled.propTypes || {}))
    return (
      <Base
        is={type}
        {...cleaned}
        css={createStyles(args, props)}
      />
    )
  })
  return Styled
}
