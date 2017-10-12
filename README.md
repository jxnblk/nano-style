
# nano-style

React functional CSS-in-JS

[![Build Status][build-badge]][build]
[![Coverage][coverage-badge]][coverage]

[build-badge]: https://img.shields.io/travis/jxnblk/nano-style/master.svg?style=flat-square
[build]: https://travis-ci.org/jxnblk/nano-style
[coverage-badge]: https://img.shields.io/codecov/c/github/jxnblk/nano-style.svg?style=flat-square
[coverage]: https://codecov.io/github/jxnblk/nano-style

```sh
npm i nano-style
```

- Use object literals **or** CSS syntax
- Functional styles
- Theming support
- Universal rendering with no additional setup
- Removes props defined as propTypes from rendered HTML


## Usage

### Object Literal Syntax

```js
import styled from 'nano-style'

const Button = styled('button')(props => ({
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

### CSS Syntax

```js
import styled from 'nano-style'

const Button = styled('button')`
  font-family: inherit;
  font-size: 14px;
  font-weight: ${props => props.theme.bold};
  line-height: ${16/14};
  display: inline-block;
  margin: 0;
  padding-left: ${props => props.theme.space[3] + 'px'};
  padding-right: ${props => props.theme.space[3] + 'px'};
  padding-top: ${props => props.theme.space[2] + 'px'};
  padding-bottom: ${props => props.theme.space[2] + 'px'};
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  border-radius: ${props => props.theme.radius};
  border: 0;
  appearance: none;
  color: white;
  background-color: props.theme.colors.blue;

  &:hover {
    box-shadow: inset 0 0 0 999px ${darken(1/8)};
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.blue};
  }

  &:active {
    box-shadow: inset 0 0 8px ${darken(1/4)};
  }

  &:disabled {
    opacity: 1/4
  }
`
```

## How it works

Using React 16's ability to return arrays of elements,
nano-style generates CSS during component rendering
and inserts CSS into a `<style>` element inlined with the component.
The returned array looks something like this:

```jsx
return [
  <Style css={css} />,
  <Component {...props} />
]
```

### Caveats

Currently, this approach does not attempt to deduplicate repeated CSS when a single component
is rendered in multiple instances.
While this does work, it may present some slight performance issues when a component
is used multiple times in a page.

MIT License
