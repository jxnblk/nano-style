import React from 'react'
import { ThemeProvider } from 'theming'

const createTheme = theme => Object.assign(function (keys) {
  return keys.split('.')
    .reduce((a, b) => (a && a[b]) ? a[b] : null, theme)
}, theme)

const NanoProvider = ({
  theme,
  ...props
}) => (
  <ThemeProvider
    {...props}
    theme={createTheme(theme)}
  />
)

export default NanoProvider
