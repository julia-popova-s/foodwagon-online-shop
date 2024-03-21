import { FC } from 'react';
import ContentLoader from 'react-content-loader';

export const Loader: FC = (props) => (
  <ContentLoader
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    height={463}
    speed={2}
    viewBox="0 0 357 463"
    width={357}
    {...props}
  >
    <rect height="301" rx="16" ry="16" width="357" x="0" y="0" />
    <rect height="50" rx="8" ry="8" width="50" x="0" y="325" />
    <rect height="50" rx="8" ry="8" width="283" x="74" y="325" />
    <rect height="42" rx="16" ry="16" width="132" x="0" y="421" />
  </ContentLoader>
);
