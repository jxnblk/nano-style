import React from 'react'
import connect from 'refunk'
import { space, width, color, propTypes } from 'styled-system'
import css from '../src/css'
import styled, { ThemeProvider } from '../src'

const CSSHello = css('h1')`
  font-size: 32px;
  font-weight: 600;
  ${space}
  ${width}
  ${color}
`

CSSHello.propTypes = {
  ...propTypes.space,
  ...propTypes.width,
  ...propTypes.color
}

const Root = styled('div')({
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  lineHeight: '1.5',
  padding: '32px'
}, color)

Root.propTypes = {
  ...propTypes.color
}

const Hello = styled('h1')({
  fontSize: '32px',
  fontWeight: 600,
}, space, width, color)

Hello.propTypes = {
  ...propTypes.space,
  ...propTypes.width,
  ...propTypes.color
}

const dec = s => ({ count: s.count - 1 })
const inc = s => ({ count: s.count + 1 })

const colors = [
  '#f0f',
  '#0ff',
  '#ff0',
  '#f00',
  '#0f0',
  '#00f'
]

const theme = {
  space: [ 0, 4, 8, 16, 32, 64, 128 ],
  colors: {
    blue: '#07c'
  }
}

const App = connect(props => [
  <style dangerouslySetInnerHTML={{
    __html: `
      *{box-sizing:border-box}
      body{margin:0}
    `
  }} />,
  <ThemeProvider theme={theme}>
    <Root color='blue'>
      <Hello>Hello</Hello>
      <button
        onClick={e => { props.update(inc) }}
        children='+'
      />
      <Hello
        p={[ 1, 3 ]}
        width={[ 1, .5 ]}
        bg={colors[props.count % colors.length]}>
        Hello {props.count}
      </Hello>
      <CSSHello
        p={[ 1, 3 ]}
        width={[ 1, .5 ]}
        bg={colors[props.count % colors.length]}>
        Hello {props.count}
      </CSSHello>
    </Root>
  </ThemeProvider>
])

App.defaultProps = {
  count: 0
}

export default App
