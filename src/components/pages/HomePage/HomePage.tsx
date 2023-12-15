import { FC, Suspense, lazy } from 'react';

import FindFood from '../../elements/FindFood/FindFood';
import Spinner from '../../ui/Spinner/Spinner';

const AppDownLoad = lazy(() => import('../../elements/AppDownLoad/AppDownLoad'));
const CallToAction = lazy(() => import('../../elements/CallToAction/CallToAction'));
const FeaturedRestaurants = lazy(() => import('../../elements/FeaturedRestaurants/FeaturedRestaurants'));
const Cities = lazy(() => import('../../elements/Cities/Cities'));
const Details = lazy(() => import('../../elements/Details/Details'));
const SearchFood = lazy(() => import('../../elements/SearchFood/SearchFood'));
const PopularItems = lazy(() => import('../../elements/PopularItems/PopularItems'));
const OrderAlgorithm = lazy(() => import('../../elements/OrderAlgorithm/OrderAlgorithm'));
const FlashDeals = lazy(() => import('../../elements/FlashDeals/FlashDeals'));

const Home: FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
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
    </Suspense>
  );
};

export default Home;
