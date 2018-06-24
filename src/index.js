import React from 'react'
import { renderToString } from 'react-dom/server'

export const hyphenate = s =>
  s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()

export const Context = React.createContext({
  createRules: () => {},
  theme: {}
})

export const Style = ({ css }) =>
  <style
    dangerouslySetInnerHTML={{
      __html: css
    }}
  />

export class Provider extends React.Component {
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
          console.log('todo nested', key, value)
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
      rule = [ media, '{', rule, '}' ].join('')
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

export const withStyle = Component => props =>
  <Context.Consumer>
    {ctx => <Component {...props} {...ctx} />}
  </Context.Consumer>

export const Base = withStyle(class extends React.Component {
  static defaultProps = {
    theme: {}
  }

  static getDerivedStateFromProps (props, state) {
    const { createRules, css, className } = props
    const combined = [
      className,
      createRules(css)
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
      ...props
    } = this.props
    const { className } = this.state
    // const Comp = is |
    return <Comp {...props} className={className} />
  }
})

// const styled = ...
