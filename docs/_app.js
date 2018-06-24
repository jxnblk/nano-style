import React from 'react'
import {
  ScopeProvider,
} from '@compositor/x0/components'
import styled, { StyleProvider } from '../src'
import * as scope from './components'
import theme from './theme'

const Root = styled.div({
  lineHeight: '1.5'
})

class Layout extends React.Component {
  render () {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}

export default class extends React.Component {
  render () {
    return (
      <StyleProvider theme={theme}>
        <ScopeProvider scope={scope}>
          <Root>
            <Layout {...this.props} />
          </Root>
        </ScopeProvider>
      </StyleProvider>
    )
  }
}
