import style from './cities.module.scss'
import { CityList } from './CityList'

export const CITY_LIST = {
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
}

export function Cities() {
  return (
    <div className={style.cities}>
      <div className="container">
        <CityList links={CITY_LIST.links} title={CITY_LIST.title} />
      </div>
    </div>
  )
}
