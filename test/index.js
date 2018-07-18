import browserEnv from 'browser-env'
browserEnv()

import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import TestUtils from 'react-dom/test-utils'
import {
  StyleProvider,
  Base,
  styled,
  withStyle,
  hyphenate,
  omit,
  Context,
  Style,
  createStyle,
} from '../src'

const renderJSON = el => render(el).toJSON()

test('renders a style tag', t => {
  const json = renderJSON(
    <StyleProvider>
      <Base css={{ color: 'tomato' }} />
    </StyleProvider>
  )
  const [ style ] = json
  const css = style.props.dangerouslySetInnerHTML.__html
  t.is(style.type, 'style')
  t.regex(css, /color:tomato/)
})

test('exports StyleProvider', t => {
  t.is(typeof StyleProvider, 'function')
})

test('StyleProvider renders', t => {
  const json = renderJSON(<StyleProvider />)
  t.snapshot(json)
})

test('exports Base', t => {
  t.is(typeof Base, 'object')
  t.is(typeof Base.render, 'function')
})

test('exports styled', t => {
  t.is(typeof styled, 'function')
})

test('styled returns a component', t => {
  const Box = styled('div')({})
  t.is(typeof Box, 'object')
  t.is(typeof Box.render, 'function')
})

test('exports withStyle', t => {
  t.is(typeof withStyle, 'function')
})

test('withStyle returns a component', t => {
  const Box = withStyle('div')
  t.is(typeof Box, 'object')
  t.is(typeof Box.render, 'function')
})

test('Base renders with styles', t => {
  const json = renderJSON(
    <StyleProvider>
      <Base
        css={{
          color: 'tomato',
          fontSize: 32
        }}
      />
    </StyleProvider>
  )
  t.snapshot(json)
})

test('Base renders with an array of styles', t => {
  const json = renderJSON(
    <StyleProvider>
      <Base
        css={[
          {
            color: 'tomato',
            fontSize: 32
          },
          { padding: 32 }
        ]}
      />
    </StyleProvider>
  )
  const [ style ] = json
  const css = style.props.dangerouslySetInnerHTML.__html
  t.snapshot(json)
  t.regex(css, /\{font-size:32px\}/)
  t.regex(css, /\{padding:32px\}/)
})

test('Base renders pseudoclass styles', t => {
  const json = renderJSON(
    <StyleProvider>
      <Base
        css={{
          color: 'tomato',
          fontSize: 32,
          '&:hover': {
            color: 'cyan'
          }
        }}
      />
    </StyleProvider>
  )
  const [ style ] = json
  const css = style.props.dangerouslySetInnerHTML.__html
  t.snapshot(json)
  t.regex(css, /:hover\{color:cyan\}/)
})

test('Base renders with media queries', t => {
  const json = renderJSON(
    <StyleProvider>
      <Base
        css={{
          fontSize: 32,
          '@media screen and (min-width:48em)': {
            fontSize: 48
          }
        }}
      />
    </StyleProvider>
  )
  const [ style ] = json
  const css = style.props.dangerouslySetInnerHTML.__html
  t.snapshot(json)
  t.regex(css, /@media screen/)
  t.regex(css, /font-size:48px/)
})

test('Base renders with null styles', t => {
  const json = renderJSON(
    <StyleProvider>
      <Base
        css={null}
      />
    </StyleProvider>
  )
  const [ style ] = json
  const css = style.props.dangerouslySetInnerHTML.__html
  t.snapshot(json)
  t.is(css, '')
})

test('Base renders with null values', t => {
  const json = renderJSON(
    <StyleProvider>
      <Base
        css={{ color: null }}
      />
    </StyleProvider>
  )
  const [ style ] = json
  const css = style.props.dangerouslySetInnerHTML.__html
  t.snapshot(json)
  t.is(css, '')
})

test('styled omits props defined as propTypes', t => {
  const Box = styled.div(props => ({
    color: props.color
  }))
  Box.propTypes = {
    color: () => {}
  }
  const json = renderJSON(
    <StyleProvider>
      <Box color='tomato' />
    </StyleProvider>
  )
  const [ style, box ] = json
  const css = style.props.dangerouslySetInnerHTML.__html
  t.snapshot(json)
  t.regex(css, /color:tomato/)
  t.is(box.props.color, undefined)
  t.is(typeof box.props.className, 'string')
})

test('moves rules to state on mount', t => {
  const instance = TestUtils.renderIntoDocument(
    <StyleProvider>
      <Base css={{ color: 'tomato' }} />
    </StyleProvider>
  )
  t.is(instance.state.rules.length, 1)
  instance.createRules({ color: 'blue' })
  t.is(instance.state.rules.length, 2)
})

test.todo('throws a prop type warning when no context is present')
