import ContentLoader from 'react-content-loader';

export const Loader = (props) => (
  <ContentLoader
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    height={370}
    speed={2}
    viewBox="0 0 1114 370"
    width={1114}
    {...props}
  >
    <rect height="370" rx="16" ry="16" width="520" x="0" y="0" />
    <rect height="50" rx="8" ry="8" width="520" x="594" y="10" />
    <rect height="26" rx="8" ry="8" width="520" x="594" y="74" />
    <rect height="29" rx="8" ry="8" width="70" x="594" y="118" />
    <rect height="120" rx="8" ry="8" width="520" x="594" y="157" />
    <rect height="60" rx="8" ry="8" width="283" x="594" y="310" />
  </ContentLoader>
);
