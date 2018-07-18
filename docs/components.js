import React from 'react'
import {
  space,
  color,
  fontSize,
  fontWeight,
  width,
  alignItems,
  justifyContent,
} from 'styled-system'
import { Base, styled } from '../src'

export const Box = styled.div(
  space,
  width,
  fontSize,
  color
)

Box.propTypes = {
  ...color.propTypes
}

export const Flex = styled(Box)(
  { display: 'flex' },
  alignItems,
  justifyContent
)

Flex.propTypes = {
  ...alignItems.propTypes,
  ...justifyContent.propTypes,
}

export const Container = styled(Box)({
  maxWidth: 768
})

Container.defaultProps = {
  mx: 'auto'
}

export const Text = styled.div(
  space,
  color,
  fontSize,
  fontWeight
)

Text.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
}

export const Heading = styled.h2({
  margin: 0
}, space, fontSize, fontWeight, color)

Heading.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
}

export const Pre = styled.pre({
  margin: 0,
  fontFamily: 'Menlo, monospace',
}, fontSize, space, color)

Pre.defaultProps = {
  fontSize: 14
}
Pre.propTypes = {
  ...fontSize.propTypes,
  ...space.propTypes,
  ...color.propTypes,
}

export const Button = styled.button({
  display: 'inline-block',
  appearance: 'none',
  textDecoration: 'none',
  border: 0,
  borderRadius: 4,
  fontFamily: 'inherit',
  fontWeight: 'bold',
  letterSpacing: '0.2em',
  textTransform: 'uppercase'
},
  space,
  fontSize,
  color,
)
Button.propTypes = {
  ...space.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
}
Button.defaultProps = {
  fontSize: 14,
  px: 3,
  py: 3,
  color: 'm0',
  bg: 'yellow'
}

export const h1 = props =>
  <Heading
    is='h1'
    mt={4}
    fontSize={6}
    {...props}
  />

export const h2 = props =>
  <Heading
    is='h2'
    mt={4}
    fontSize={5}
    {...props}
  />

export const h3 = props =>
  <Heading
    is='h3'
    mt={4}
    fontSize={4}
    {...props}
  />

export const h4 = props =>
  <Heading
    is='h4'
    mt={4}
    fontSize={3}
    {...props}
  />

export const p = props =>
  <Text
    is='p'
    {...props}
    mt={3}
    mb={4}
  />

export const a = props =>
  <Base
    is='a'
    {...props}
    color='c4'
    css={[
      color
    ]}
  />

export const inlineCode = props =>
  <Pre
    is='code'
    {...props}
    fontSize='inherit'
    color='m5'
    bg='yellow'
  />

export const code = props =>
  <Pre
    {...props}
    p={3}
    my={3}
    bg='m1'
    color='cyan'
  />

export const ul = styled.ul({
})
export const li = styled.li({
})
