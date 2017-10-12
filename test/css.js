import test from 'ava'
import React from 'react'
import PropTypes from 'prop-types'
import { create as render } from 'react-test-renderer'
import styled from '../src/css'

test('exports a function', t => {
  t.is(typeof styled, 'function')
  t.is(typeof styled('div'), 'function')
})

test('returns a component', t => {
  const Box = styled('div')``
  t.is(typeof Box, 'function')
  const json = render(<Box />).toJSON()
  t.snapshot(json)
})

test('returns a component with a className and style tag', t => {
  const Box = styled('div')`color:tomato`
  const json = render(<Box />).toJSON()
  const [ style, div ] = json
  t.true(Array.isArray(json))
  const css = style.props.dangerouslySetInnerHTML.__html
  t.regex(css, /color:tomato/)
  t.true(div.props.className.length > 0)
})

test('handles functional styles', t => {
  const Box = styled('div')`${props => `color:${props.color}`}`
  const json = render(<Box color='tomato' />).toJSON()
  const [ style, div ] = json
  const css = style.props.dangerouslySetInnerHTML.__html
  t.regex(css, /color:tomato/)
  t.true(div.props.className.length > 0)
})

test('handles functional styles that return objects', t => {
  const Box = styled('div')`${props => ({ color: props.color })}`
  const json = render(<Box color='tomato' />).toJSON()
  const [ style, div ] = json
  const css = style.props.dangerouslySetInnerHTML.__html
  t.regex(css, /color:tomato/)
  t.true(div.props.className.length > 0)
})

test('removes props defined as propTypes', t => {
  const Box = styled('div')`${props => ({ color: props.color })}`
  Box.propTypes = {
    color: PropTypes.string
  }
  const json = render(<Box color='tomato' />).toJSON()
  const [ style, div ] = json
  const css = style.props.dangerouslySetInnerHTML.__html
  t.falsy(div.props.color)
})

test('handles pseudoclasses', t => {
  const Box = styled('div')`
    &:hover {
      color: tomato;
    }
  `
  const [ style, div ] = render(<Box color='tomato' />).toJSON()
  const css = style.props.dangerouslySetInnerHTML.__html
  t.regex(css, /:hover\{color:tomato;\}/)
})

test('handles media queries', t => {
  const Box = styled('div')`
    @media print {
      color: tomato;
    }
  `
  const [ style, div ] = render(<Box color='tomato' />).toJSON()
  const css = style.props.dangerouslySetInnerHTML.__html
  t.regex(css, /media\sprint\{\.[a-z0-9]+\{color:tomato;\}/)
})

test('skips null values', t => {
  const Box = styled('div')`${props => ({
    color: 'tomato',
    backgroundColor: null
  })}`
  const [ style ] = render(<Box />).toJSON()
  const css = style.props.dangerouslySetInnerHTML.__html
  t.notRegex(css, /background/)
})
