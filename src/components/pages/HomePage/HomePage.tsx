import { FC } from 'react';

import {
  AppDownLoad,
  CallToAction,
  Cities,
  Details,
  FeaturedRestaurants,
  FindFood,
  FlashDeals,
  OrderAlgorithm,
  PopularItems,
  SearchFood,
} from '../../elements';

const Home: FC = () => {
  return (
    <>
      <FindFood />
      <FlashDeals />
      <OrderAlgorithm />
      <PopularItems />
      <FeaturedRestaurants />
      <SearchFood />
      <AppDownLoad />
      <Details />
      <CallToAction />
      <Cities />
    </>
  );
};

export default Home;
