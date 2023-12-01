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

function Home() {
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
}
export default Home;
