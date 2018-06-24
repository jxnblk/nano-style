import React from 'react'
import {
  ScopeProvider,
  SidebarLayout
} from '@compositor/x0/components'

export default class extends React.Component {
  render () {
    return (
      <ScopeProvider scope={{}}>
        <SidebarLayout
          {...this.props}
          title='nano-style'
        />
      </ScopeProvider>
    )
  }
}
