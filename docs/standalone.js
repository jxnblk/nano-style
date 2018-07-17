import React from 'react'
import { Base } from '../src/standalone'

const Root = props =>
  <Base
    {...props}
    css={{
      padding: '32px',
      backgroundColor: 'magenta'
    }}
  />

const Heading = props =>
  <Base
    is='h1'
    {...props}
    css={{
      fontSize: props.fontSize || '32px',
      margin: 0,
      color: props.color,
      '&:hover': {
        color: 'black'
      }
    }}
  />

const Text = props =>
  <Base
    {...props}
    css={{
    }}
  />

export default () =>
  <Root>
    <Heading is='h2' color='cyan'>h2</Heading>
    <Heading fontSize='64px'>Standalone</Heading>
    <Text>
      The standalone module doesn't require a StyleProvider
      and doesn't attempt to dedupe styles, ideal for stream rendering
    </Text>
  </Root>
