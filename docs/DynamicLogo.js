import React from 'react'
import styled, { Style } from '../src'
import debounce from 'lodash.debounce'

const Slider = props =>
  <div>
    <label>
      {props.name}
    </label>
    <samp>{props.value}</samp>
    <input
      {...props}
      type='range'
      name={props.name}
      value={props.value}
      onChange={e => {
        const n = parseFloat(e.target.value)
        props.onChange({ [props.name]: n })
      }}
      style={{
        width: '100%'
      }}
    />
  </div>

const Svg = ({
  size,
  depth,
  ...props
}) =>
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='-12 -12 24 24'
    width={size}
    height={size}
    fill='none'
    stroke='currentcolor'
    {...props}
    style={{
      position: 'absolute',
      transform: `translateZ(${-depth}px)`
    }}
  />

Svg.defaultProps = {
  size: 512
}

const Spin = styled('g')({
  animationName: 'spin, color',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
}, props => ({
  animationDuration: props.duration + 's'
}))

const Fade = styled('g')({
  animationName: 'color',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
}, props => ({
  animationDuration: props.duration + 's'
}))

const keyframes = `
@keyframes spin {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
@keyframes color {
  0% { stroke: magenta }
  33% { stroke: cyan }
  66% { stroke: yellow }
  100% { stroke: magenta }
}
@keyframes wobble {
  0% { transform: rotate3d(0.02, 0.1, 0, 30deg) }
  50% { transform: rotate3d(0.1, 0.1, 0, 70deg) }
  100% { transform: rotate3d(0.02, 0.1, 0, 30deg) }
}
`

const Wobble = styled.div({
  marginLeft: '10vw',
  width: 512,
  height: 512,
  transformStyle: 'preserve-3d',
  transformOrigin: '50% 50%',
  animationName: 'wobble',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite'
}, props => ({
  animationDuration: props.duration + 's'
}))

class Scroller extends React.Component {
  state = {
    scroll: 0
  }
  handleScroll = debounce(e => {
    this.setState({ scroll: window.scrollY })
  }, 200)
  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }
  render () {
    const { scroll } = this.state
    const style = {
      '--scroll': scroll
    }
    return (
      <div style={style}>
        {this.props.children}
      </div>
    )
  }
}

export default class extends React.Component {
  state = {
    perspective: 1024,
    rotate: 60,
    x: 0.05,
    y: 0.1,
    z: 0.0,
    layers: [
      160,
      40,
      64
    ],
    size: 512
  }
  update = fn => this.setState(fn)

  render () {
    const {
      size,
      perspective,
      rotate,
      x,
      y,
      z,
      layers = []
    } = this.state

    return (
      <div>
        <Style css={keyframes} />
          <div
            style={{
              backgroundColor: '#101',
              padding: '64px',
              minHeight: '90vh',
              color: 'magenta',
              perspective: perspective + 'px',
            }}>
            <Wobble duration={48}>
              <Svg depth={layers[0]} stroke='cyan'>
                <Spin duration={16}>
                  <circle
                    r={6}
                    strokeWidth={2}
                    opacity={3/4}
                    strokeDasharray='32 16 8 4 24 48'
                    vectorEffect='non-scaling-stroke'
                  />
                </Spin>
              </Svg>
              <Svg depth={layers[1]}>
                <Spin duration={32}>
                  <circle
                    r={8}
                    opacity={3/4}
                    strokeWidth={4}
                    strokeDasharray='8 16 8 24 12 32'
                    vectorEffect='non-scaling-stroke'
                  />
                </Spin>
                <Spin duration={36}>
                  <circle
                    r={8}
                    opacity={1/8}
                    strokeWidth={4}
                    strokeDasharray='32 64 72 128'
                    vectorEffect='non-scaling-stroke'
                  />
                </Spin>
              </Svg>
              <Svg depth={layers[2]} >
                <Spin duration={64}>
                  <circle
                    r={11}
                    opacity={3/4}
                    strokeWidth={2}
                    // strokeDasharray='4 8 16 32 64 128'
                    strokeDasharray='4 8 16 64 48 32'
                    vectorEffect='non-scaling-stroke'
                  />
                </Spin>
                <Spin duration={68}>
                  <circle
                    r={11}
                    opacity={1/4}
                    strokeWidth={2}
                    strokeDasharray='64 48 32 96 128'
                    vectorEffect='non-scaling-stroke'
                  />
                </Spin>
              </Svg>
              <Svg depth={8}>
                <Fade duration={48}>
                  <circle
                    r={7}
                    opacity={2/4}
                    strokeWidth={16}
                    vectorEffect='non-scaling-stroke'
                  />
                </Fade>
              </Svg>
            </Wobble>
            {/*
            <div
              style={{
                width: 512,
                height: 512,
                transform: `rotate3d(${x}, ${y}, ${z}, ${rotate}deg)`,
              }}
            >
            </div>
            */}
          </div>
        {/*
        <Scroller>
        </Scroller>
        */}
        <div>
          <Slider
            name='rotate'
            max={360}
            value={rotate}
            onChange={this.update}
          />
          <Slider
            name='x'
            value={x}
            step={1/64}
            max={1}
            onChange={this.update}
          />
          <Slider
            name='y'
            value={y}
            step={1/64}
            max={1}
            onChange={this.update}
          />
          <Slider
            name='z'
            value={z}
            step={1/64}
            max={1}
            onChange={this.update}
          />
          {layers.map((layer, i) => (
            <Slider
              key={i}
              name={'layer' + i}
              value={layer}
              max={1024}
              onChange={obj => {
                this.update(s => ({
                  layers: [
                    ...s.layers.slice(0, i),
                    obj['layer' + i],
                    ...s.layers.slice(i + 1),
                  ]
                }))
              }}
            />
          ))}
        </div>
      </div>
    )
  }
}
