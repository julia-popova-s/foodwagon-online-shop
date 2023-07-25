import ContentLoader from 'react-content-loader'

export const LoaderRight = (props) => (
  <ContentLoader
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    height={301}
    speed={2}
    viewBox="0 0 700 301"
    width={700}
    {...props}
  >
    <rect height="50" rx="8" ry="8" width="700" x="0" y="10" />
    <rect height="26" rx="8" ry="8" width="700" x="0" y="74" />
    <rect height="29" rx="8" ry="8" width="70" x="0" y="115" />
    <rect height="72" rx="8" ry="8" width="700" x="0" y="154" />
    <rect height="60" rx="8" ry="8" width="283" x="0" y="241" />
  </ContentLoader>
)
