import React from 'react'
import { space, color } from 'styled-system'
import styled, { Style } from '../src'

const Spin = styled('g')({
  animationTimingFunction: 'linear',
  animationDuration: '8s',
  animationIterationCount: 'infinite'
}, props => ({
  animationName: 'spin' + props.variant,
}))

const Rotate = styled('g')(({ x, y, z, deg }) => ({
  transformStyle: 'preserve-3d',
  transform: `rotate3d(${x}, ${y}, ${z}, ${deg}deg)`
}))

const keyframes = `
@keyframes spin1 {
  0% {    transform: rotate3d(0.5, 1, 1, 0deg) }
  50% {   transform: rotate3d(0.5, 1, 1, 180deg) }
  100% {  transform: rotate3d(0.5, 1, 1, 360deg) }
}
@keyframes spin2 {
  0% {    transform: rotate3d(0, 1, 0, 0deg) }
  50% {   transform: rotate3d(0, 1, 0, 180deg) }
  100% {  transform: rotate3d(0, 1, 0, 360deg) }
}
@keyframes spin3 {
  0% {    transform: rotate3d(1, 1, 0.5, 0deg) }
  50% {   transform: rotate3d(1, 1, 0.5, 180deg) }
  100% {  transform: rotate3d(1, 1, 0.5, 360deg) }
}
@keyframes spin4 {
  0% {    transform: rotate3d(1, 0, 0, 0deg) }
  50% {   transform: rotate3d(1, 0, 0, 180deg) }
  100% {  transform: rotate3d(1, 0, 0, 360deg) }
}
@keyframes spin5 {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
`

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
    style={{
      perspective: '100vh'
    }}
  >
    <Style css={keyframes} />
    <Rotate
      x={1}
      y={1}
      z={0}
      deg={15}>
      <circle
        r={10}
        strokeWidth={2}
      />
      <Spin variant='5'>
        <circle
          r={11.5}
          strokeWidth={1/4}
          opacity={1/2}
          strokeDasharray='3 5 4 7 6 8'
        />
      </Spin>
      <path
        d={strike}
        strokeWidth={1/2}
        opacity={2/4}
      />
    </Rotate>
  </svg>
)(space, color)
