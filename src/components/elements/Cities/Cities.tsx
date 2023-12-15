import { FC } from 'react';

import { CityList, CityListProps } from './CityList';
import style from './cities.module.scss';

export const CITY_LIST: CityListProps = {
  links: [
    'San Francisco',
    'Los Angeles',
    'New York City',
    'Chicago',
    'Columbus',
    'Miami',
    'Washington DC',
    'Orange County',
    'Phoenix',
    'New Mexico',
    'San Diego',
    'Seattle',
    'Atlanta',
    'Las Vegas',
    'Albuquerque',
    'East Bay',
    'Portland',
    'Charlotte',
    'Sacramento',
    'Long Beach',
    'Nashville',
    'Denver',
    'Oklahoma City',
    'New Orleans',
  ],
  title: 'Our top cities',
};

const Cities: FC = () => {
  return (
    <div className={style.cities}>
      <div className="container">
        <CityList links={CITY_LIST.links} title={CITY_LIST.title} />
      </div>
    </div>
  );
};

export default Cities;
