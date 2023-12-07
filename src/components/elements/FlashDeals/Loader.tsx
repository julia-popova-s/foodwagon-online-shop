import { FC } from 'react';
import ContentLoader from 'react-content-loader';

export const Loader:FC = (props) => (
  <ContentLoader
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    height={415}
    speed={2}
    viewBox="0 0 357 415"
    width={357}
    {...props}
  >
    <rect height="301" rx="16" ry="16" width="357" x="0" y="0" />
    <rect height="26" rx="8" ry="8" width="204" x="0" y="333" />
    <rect height="42" rx="8" ry="8" width="204" x="0" y="373" />
  </ContentLoader>
);
