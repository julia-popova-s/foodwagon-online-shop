import { Map, ObjectManager, Placemark, YMaps } from '@pbe/react-yandex-maps'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getCoords } from '../../../utils/getCurrentPosition'
import style from './balloon.css'

const center = [59.94971367493227, 30.35151817345885]

const balloon = `<div class=${style.balloon}>
    <div class=${style.balloon__contact}>Your location</div>
    <div class=${style.balloon__address}>6537 Andreane Port, Severn</div>
  </div>`

export const Maps = () => {
  const { placemarks } = useSelector((state) => state.restaurants)
  const [geolocation, setGeolocation] = useState(null)

  useEffect(() => {
    getCoords().then(({ lat, long }) => setGeolocation([lat, long]))
  }, [])
  return (
    <YMaps
      query={{
        load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
        ns: 'use-load-option',
      }}
    >
      <Map
        defaultState={{
          center,
          controls: ['zoomControl', 'fullscreenControl'],
          zoom: 10,
        }}
        className="map"
      >
        <Placemark
          options={{
            iconImageHref: `${process.env.PUBLIC_URL}/images/find-food/search-panel/location.svg`,
            iconImageOffset: [0, 0],
            iconImageSize: [40, 40],
            iconLayout: 'default#image',
          }}
          properties={{
            balloonContent: balloon,
          }}
          defaultGeometry={geolocation}
        />
        <ObjectManager
          objects={{
            openBalloonOnClick: true,
            preset: 'islands#redDotIcon',
          }}
          options={{
            clusterize: false,
            gridSize: 150,
          }}
          features={placemarks}
          modules={['objectManager.addon.objectsBalloon', 'objectManager.addon.objectsHint']}
        />
      </Map>
    </YMaps>
  )
}
