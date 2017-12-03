import test from 'ava'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import PropTypes from 'prop-types'
import { create as render } from 'react-test-renderer'
import styled from '../src'
import system from 'styled-system'

test('exports a function', t => {
  t.is(typeof styled, 'function')
  t.is(typeof styled('div'), 'function')
})

test('returns a component', t => {
  const Box = styled('div')()
  t.is(typeof Box, 'function')
  const json = render(<Box />).toJSON()
  t.snapshot(json)
})

test('returns a component with a className and style tag', t => {
  const Box = styled('div')({ color: 'tomato' })
  const json = render(<Box />).toJSON()
  const [ div, style ] = json
  t.true(Array.isArray(json))
  const css = style.props.dangerouslySetInnerHTML.__html
  t.regex(css, /color:tomato/)
  t.true(div.props.className.length > 0)
})

test('handles functional styles', t => {
  const Box = styled('div')(props => ({ color: props.color }))
  const json = render(<Box color='tomato' />).toJSON()
  const [ div, style ] = json
  const css = style.props.dangerouslySetInnerHTML.__html
  t.regex(css, /color:tomato/)
  t.true(div.props.className.length > 0)
})

test('removes props defined as propTypes', t => {
  const Box = styled('div')(props => ({ color: props.color }))
  Box.propTypes = {
    color: PropTypes.string
  }
  const json = render(<Box color='tomato' />).toJSON()
  const [ div, style ] = json
  const css = style.props.dangerouslySetInnerHTML.__html
  t.truthy(div.props.className)
  t.falsy(div.props.color)
})

test('removes props defined as propTypes from extended components', t => {
  const Box = styled('div')(system.color)
  Box.propTypes = {
    ...system.propTypes.color
  }
  const Flex = styled(Box)(system.alignItems)
  Flex.propTypes = {
    ...system.propTypes.alignItems
  }
  const box = render(<Box color='tomato' />).toJSON()
  const flex = render(<Flex align='center' color='blue' />).toJSON()
  const [ div, a, b ] = flex
  t.truthy(div.props.className)
  t.falsy(div.props.align)
  t.falsy(div.props.color)
})

test('handles multiple arguments', t => {
  const color = props => ({ color: props.color })
  const Box = styled('div')({ display: 'inline-block' }, color)
  const json = render(<Box color='tomato' />).toJSON()
  const [ div, style ] = json
  const a = style.props.dangerouslySetInnerHTML.__html
  t.regex(a, /display:inline-block/)
  t.regex(a, /color:tomato/)
})

test('handles pseudoclasses', t => {
  const Box = styled('div')({
    '&:hover': {
      color: 'tomato'
    }
  })
  const [ div, style ] = render(<Box color='tomato' />).toJSON()
  const css = style.props.dangerouslySetInnerHTML.__html
  t.regex(css, /:hover\{color:tomato\}/)
})

test('handles media queries', t => {
  const Box = styled('div')({
    '@media print': {
      color: 'tomato'
    }
  })
  const [ div, style ] = render(<Box color='tomato' />).toJSON()
  const css = style.props.dangerouslySetInnerHTML.__html
  t.regex(css, /media\sprint\{\.[a-z0-9]+\{color:tomato\}/)
})

test('skips null values', t => {
  const Box = styled('div')({
    color: 'tomato',
    backgroundColor: null
  })
  const [ div, style ] = render(<Box />).toJSON()
  const css = style.props.dangerouslySetInnerHTML.__html
  t.notRegex(css, /background/)
})

test('renders server-side', t => {
  const Box = styled('div')({
    color: 'tomato'
  })
  const html = renderToStaticMarkup(<Box />)
  t.snapshot(html)
})
