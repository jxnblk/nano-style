import React from 'react'
import connect from 'refunk'
import { space, width, color, propTypes } from 'styled-system'
import styled, { ThemeProvider } from '../src'

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

Hello.defaultProps = {
  p: 4
}

const Hi = styled(Hello)({
  fontSize: '64px',
}, {
  color: 'tomato'
})

// Hi.defaultProps = { p: 48 }

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
  <style key='style'
    dangerouslySetInnerHTML={{
      __html: `
        *{box-sizing:border-box}
        body{margin:0}
      `
    }}
  />,
  <ThemeProvider key='main' theme={theme}>
    <Root color='blue'>
      <Hello>Hello</Hello>
      <button
        onClick={e => { props.update(inc) }}
        children='+'
      />
      <Hi
        bg={colors[props.count % colors.length]}>
        Hi {props.count}
      </Hi>
      <Hello
        bg={colors[props.count % colors.length]}>
        Hello {props.count}
      </Hello>
    </Root>
  </ThemeProvider>
])

App.defaultProps = {
  count: 0
}

export default App
