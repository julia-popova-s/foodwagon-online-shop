import { FC } from 'react';

import { CityList } from './CityList';
import style from './cities.module.scss';

type CityListType = {
  links: string[];
  title: string;
};

export const CITY_LIST: CityListType = {
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

export const Cities: FC = () => {
  return (
    <div className={style.cities}>
      <div className="container">
        <CityList links={CITY_LIST.links} title={CITY_LIST.title} />
      </div>
    </div>
  );
};
