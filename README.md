
# nano-style

Inlined, functional CSS-in-JS for React

[![Build Status][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
![gzip bundle size][size-badge]

[build-badge]: https://img.shields.io/travis/jxnblk/nano-style/master.svg?style=flat-square
[build]: https://travis-ci.org/jxnblk/nano-style
[coverage-badge]: https://img.shields.io/codecov/c/github/jxnblk/nano-style.svg?style=flat-square
[coverage]: https://codecov.io/github/jxnblk/nano-style
[size-badge]: https://img.shields.io/badge/gzip%20size-3.2%20kB-brightgreen.svg?style=flat-square

```sh
npm i nano-style
```

- Pure React with no side effects
- Renders styles in an inline style tag
- Server-side rendering with no additional setup
- Works in iframes
- Flexible API
- Functional styles
- Automatically removes props defined as propTypes
- Theming support
- 3 kB

## Getting Started

Include the `Provider` component at the top level of your application.

```jsx
import React from 'react'
import { Provider as NanoProvider } from 'nano-style'

export default class App extends React.Component {
  render () {
    return (
      <NanoProvider>
        {/* application elements */}
      </NanoProvider>
    )
  }
}
```

To create style components, use the `Base` component or the `styled` higher-order component.

```jsx
// example with Base component
import React from 'react'
import { Base } from 'nano-style'

const Heading = props =>
  <Base
    is='h2'
    {...props}
    css={{
      margin: 0,
      fontSize: 48
    }}
  />

export default Heading
```

Alternatively, the same component can be created with the `styled` function.

```jsx
// example with `styled` function
import React from 'react'
import { styled } from 'nano-style'

const Heading = styled.h2({
  margin: 0,
  fontSize: 48
})
```

### Functional Styles

In addition to style objects, functions can be passed to the Base component or `styled` function.

```jsx
// example with Base component
import React from 'react'
import { Base } from 'nano-style'

const color = props => ({
  color: props.color
})

const Heading = props =>
  <Base
    is='h2'
    {...props}
    css={[
      {
        margin: 0,
        fontSize: 48
      },
      color
    ]}
  />

export default Heading
```

```jsx
// example with `styled` functon
import { styled } from 'nano-style'

const color = props => ({
  color: props.color
})

const Heading = styled.h2({
  margin: 0,
  fontSize: 48
}, color)

export default Heading
```

### Theming

A `theme` object can be supplied to the `Provider` component and used in nano-style components.

```jsx
import React from 'react'
import { Provider } from 'nano-style'

const theme = {
  colors: {
    blue: '#08c'
  }
}

export default class App extends React.Component {
  render () {
    return (
      <Provider theme={theme}>
        {/* elements */}
      </Provider>
    )
  }
}
```

```jsx
import React from 'react'
import { Base } from 'nano-style'

const color = props => ({
  color: props.theme.colors[props.color] || props.color
})

const Heading = props =>
  <Base
    is='h2'
    {...props}
    css={[
      {
        margin: 0,
        fontSize: 48
      },
      color
    ]}
  />
```



## API

### `Provider`

The Provider component renders and caches CSS rules and also provides a `theme` object via React context.

```js
import { Provider } from 'nano-style'
```

#### Props

- `theme` object that is provided via context to Base components

### `Base`

The Base component provides a very React-like API for creating style components.

```jsx
import { Base } from 'nano-style'
```

#### Props

- `css` object or array of style objects or functions
- `is` sets the underlying HTML element or React component to render
- `innerRef` passes refs to underlying element

### `styled`

The `styled` function is a [higher-order component][hoc] that works similarly to [styled-components][sc] and [emotion][emotion].
This function uses the `Base` component to return a new component.

```js
import { styled } from 'nano-style'

const Button = styled.button(props => ({
  fontFamily: 'inherit',
  fontSize: '14px',
  fontWeight: props.theme.bold,
  lineHeight: 16/14,
  display: 'inline-block',
  margin: 0,
  paddingLeft: props.theme.space[3] + 'px',
  paddingRight: props.theme.space[3] + 'px',
  paddingTop: props.theme.space[2] + 'px',
  paddingBottom: props.theme.space[2] + 'px',
  verticalAlign: 'middle',
  textAlign: 'center',
  textDecoration: 'none',
  borderRadius: props.theme.radius,
  border: 0,
  appearance: 'none',
  color: 'white',
  backgroundColor: props.theme.colors.blue,
  '&:hover': {
    boxShadow: `inset 0 0 0 999px ${darken(1/8)}`
  },
  '&:focus': {
    outline: 0,
    boxShadow: `0 0 0 2px ${props.theme.colors.blue}`
  },
  '&:active': {
    boxShadow: `inset 0 0 8px ${darken(1/4)}`
  },
  '&:disabled': {
    opacity: 1/4
  }
}))
```

### `withStyle`

The `withStyle` [higher-order component][hoc] provides nano-style context to the returned component. It adds the following props:

- `theme` the theme context object
- `createRules` function to create CSS rules, returns a `className` string


## How it works

Using `React.Fragment`, nano-style's Provider component renders a `<style>` tag before its child elements.
Each nano-style component creates a CSS rule with context from the Provider, and the Provider renders and caches the style.

[hoc]: http://www.reactjs.org/docs/higher-order-components.html
[sc]: https://github.com/styled-components/styled-components
[emotion]: https://github.com/emotion-js/emotion

[MIT License](LICENSE.md)
