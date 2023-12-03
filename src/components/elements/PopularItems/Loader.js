import ContentLoader from 'react-content-loader';

import style from './popularItems.module.scss';

export const Loader = (props) => (
  <ContentLoader
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    height={469}
    speed={2}
    viewBox="0 0 283 469"
    width={283}
    {...props}
    className={style.loader}
  >
    <rect height="239" rx="16" ry="16" width="283" x="0" y="0" />
    <rect height="53" rx="8" ry="8" width="283" x="0" y="255" />
    <rect height="26" rx="8" ry="8" width="283" x="0" y="316" />
    <rect height="26" rx="8" ry="8" width="70" x="0" y="350" />
    <rect height="60" rx="8" ry="8" width="283" x="0" y="409" />
  </ContentLoader>
);
