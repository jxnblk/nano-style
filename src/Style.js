import React from 'react'

const Style = ({ css, ...props }) =>
  <style {...props} dangerouslySetInnerHTML={{ __html: css }} />

export default Style
