import React from 'react'
import { space, color } from 'styled-system'
import styled from '../src'

const strike = [
  'M', 11, -11,
  'L', -11, 11
].join(' ')

export default styled(({
  size = 128,
  ...props
}) =>
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='-12 -12 24 24'
    width={size}
    height={size}
    fill='none'
    stroke='currentcolor'
  >
    <circle
      r={10}
      strokeWidth={2}
    />
    <circle
      r={11.5}
      strokeWidth={1/8}
      opacity={1/2}
    />
    <path
      d={strike}
      strokeWidth={1/2}
      opacity={2/4}
    />
  </svg>
)(space, color)
