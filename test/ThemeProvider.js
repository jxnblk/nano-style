import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import styled, { ThemeProvider } from '../src'

test('renders', t => {
  const json = render(<ThemeProvider />).toJSON()
  t.snapshot(json)
})

test('provides theme as props.theme', t => {
  const Box = styled('div')(props => ({ color: props.theme.blue }))
  const theme = {
    blue: '#07c'
  }
  const json = render(
    <ThemeProvider theme={theme}>
      <Box />
    </ThemeProvider>
  ).toJSON()
  const [ div, style ] = json.children
  const css = style.props.dangerouslySetInnerHTML.__html
  t.true(div.props.className.length > 0)
  t.regex(css, /color:#07c/)
})

test('provides theme as a function', t => {
  const Box = styled('div')(props => ({ color: props.theme('blue') }))
  const theme = {
    blue: '#07c'
  }
  const json = render(
    <ThemeProvider theme={theme}>
      <Box />
    </ThemeProvider>
  ).toJSON()
  const [ div, style ] = json.children
  const css = style.props.dangerouslySetInnerHTML.__html
  t.true(div.props.className.length > 0)
  t.regex(css, /color:#07c/)
})
