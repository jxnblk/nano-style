import React from 'react'
import { renderToString } from 'react-dom/server'
import PropTypes from 'prop-types'
import tags from 'html-tags'
import shortid from 'shortid'
import sdbm from 'sdbm'

const id = (seed) => {
  return sdbm(seed).toString(36)
  return shortid.generate()
}

export const hyphenate = s =>
  s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()

export const Style = ({ css }) =>
  <style
    dangerouslySetInnerHTML={{
      __html: css
    }}
  />

export const omit = (props, blacklist = []) => {
  const next = {}
  for (const key in props) {
    if (blacklist.indexOf(key) > -1) continue
    next[key] = props[key]
  }
  return next
}

export const Base = class Nano extends React.Component {
  static defaultProps = {
    theme: {}
  }

  static propTypes = {
    theme: PropTypes.object.isRequired,
  }

  // id = id()
  count = 0
  cache = {}

  state = {
    rules: [],
  }

  createRules = (obj, parents = []) => {
    const styles = []
    for (const key in obj) {
      const value = obj[key]
      if (value === null || value === false) continue
      switch (typeof value) {
        case 'object':
          styles.push(
            this.createRules(value, [ ...parents, key ])
          )
          continue
        case 'number':
          styles.push(
            this.createRule(key, value + 'px', parents)
          )
          continue
        case 'string':
          styles.push(
            this.createRule(key, value, parents)
          )
      }
    }
    const className = styles.map(style => style.className).join(' ')
    const rules = styles.map(style => style.rules).join('')
    return { className, rules }
  }

  createRule = (key, value, parents = []) => {
    const declaration = [ hyphenate(key), value ].join(':')
    const id = [ ...parents, declaration ].join('')
    const cached = this.cache[id]
    if (cached) return cached
    const className = (key + value + parents.join(''))
      .replace(/[&:@\s]/g, '')
    //this.createClassName(key + value + parents)
    const rules = this.addRule({ id, className, declaration, parents })
    return { rules, className }
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
    // console.log(rule)
    return rule
    /*
    this.setState(state => ({
      rules: [
        ...state.rules,
        rule
      ]
    }))
    */
  }

  createClassName = (seed) => {
    return seed
    return 'x' + id(seed)
    return 'x' + id(seed) + '_' + (this.count++).toString(32)
  }

  render () {
    const {
      is: Comp = 'div',
      css,
      theme,
      ...props
    } = this.props
    const { className, rules } = this.createRules(css)

    return (
      <React.Fragment>
        <Style css={rules} />
        <Comp {...props} className={className} />
      </React.Fragment>
    )
  }
}

/*
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

tags.forEach(tag => {
  styled[tag] = styled(tag)
})

export default styled
*/
