import React from 'react'
import ContentLoader from 'react-content-loader'

export const Loader = ({ height, width }) => (
  <ContentLoader
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    height={height}
    speed={2}
    viewBox={`0 0 ${width} ${height}`}
    width={width}
  >
    <rect height={height} rx="16" ry="16" width={width} x="0" y="0" />
    {/* <rect x="0" y="270" rx="16" ry="16" width="356" height="26" />
    <rect x="0" y="320" rx="16" ry="16" width="286" height="29" /> */}
  </ContentLoader>
)
