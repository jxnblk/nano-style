import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import {
  Provider,
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

test('renders', t => {
  const json = renderJSON(
    <Provider>
      <Base css={{ color: 'tomato' }} />
    </Provider>
  )
  console.log(json)
  const [ style ] = json
  t.is(style.type, 'style')
})
