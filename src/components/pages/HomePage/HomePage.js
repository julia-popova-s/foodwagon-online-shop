import {
  CardBigList,
  Cities,
  DiscountBox,
  FindFood,
  InstallApp,
  OrderAlgorithm,
  PopularItems,
  ReadyToOrder,
  Restaurants,
  SearchFood,
} from '../../elements';

function Home() {
  return (
    <>
      <FindFood />
      <DiscountBox />
      <OrderAlgorithm />
      <PopularItems />
      <Restaurants />
      <SearchFood />
      <InstallApp />
      <CardBigList />
      <ReadyToOrder />
      <Cities />
    </>
  );
}
export default Home;
