import ContentLoader from 'react-content-loader';

export const Loader = (props) => (
  <ContentLoader
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    height={525}
    speed={2}
    viewBox="0 0 343 525"
    width={357}
    {...props}
  >
    <rect height="228" rx="16" ry="16" width="343" x="0" y="0" />
    <rect height="53" rx="8" ry="8" width="343" x="0" y="244" />
    <rect height="26" rx="8" ry="8" width="343" x="0" y="305" />
    <rect height="26" rx="8" ry="8" width="70" x="0" y="339" />
    <rect height="60" rx="8" ry="8" width="343" x="0" y="390" />
  </ContentLoader>
);
