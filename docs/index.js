import React from 'react'
import {
  Box,
  Flex,
  Container,
  Heading,
  Text,
  Pre,
  Button,
} from './components'
import Logo from './_logo'
import styled, { StyleProvider } from '../src'
// import Readme from '../readme.md'
import theme from './theme'

const ten = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

const Header = styled(Flex)({
  minHeight: '80vh'
})

export default class extends React.Component {
  render () {
    return (
      <Box color='magenta' bg='m0'>
        <Flex alignItems='center'>
          <Text p={2} fontWeight='bold'>
            nano-style
          </Text>
        </Flex>
        <Header
          alignItems='center'
          color='magenta'
          bg='m0'>
          <Container
            px={4}
            py={6}
            width={1}>
            <Logo
              size={256}
              color='c7'
            />
            <Heading
              is='h1'
              mt={4}
              mb={2}
              fontSize={5}>
              nano-style
            </Heading>
            <Text
              fontSize={3}
              fontWeight='bold'
              mb={4}>
              Inlined, functional CSS-in-JS for React
            </Text>
            <Pre>npm i nano-style</Pre>
            <Flex my={4}>
              <Button is='a'
                bg='yellow'
                href='https://github.com/jxnblk/nano-style'>
                GitHub
              </Button>
            </Flex>
          </Container>
        </Header>
        <Container px={4} py={5}>
          <Text>
            - Pure React with no side effects
            - Renders styles in an inline style tag
            - Server-side rendering with no additional setup
            - Works in iframes
            - Flexible API
            - Functional styles
            - Automatically removes props defined as propTypes
            - Theming support
            - 3 kB
            - Pure React with no side effects
            - Renders styles in an inline style tag
            - Server-side rendering with no additional setup
            - Works in iframes
            - Flexible API
            - Functional styles
            - Automatically removes props defined as propTypes
            - Theming support
            - 3 kB
          </Text>
        </Container>
      </Box>
    )
  }
}
// <Readme />
