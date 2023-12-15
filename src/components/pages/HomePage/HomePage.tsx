import { FC, lazy } from 'react';

const AppDownLoad = lazy(() => import(/*webpackChunkName: "AppDownLoad"*/ '../../elements/AppDownLoad'));
const CallToAction = lazy(() => import(/*webpackChunkName: "CallToAction"*/ '../../elements/CallToAction'));
const FeaturedRestaurants = lazy(
  () => import(/*webpackChunkName: "FeaturedRestaurants"*/ '../../elements/FeaturedRestaurants'),
);
const Cities = lazy(() => import(/*webpackChunkName: "Cities"*/ '../../elements/Cities'));
const Details = lazy(() => import(/*webpackChunkName: "Details"*/ '../../elements/Details'));
const SearchFood = lazy(() => import(/*webpackChunkName: "SearchFood"*/ '../../elements/SearchFood'));
const PopularItems = lazy(() => import(/*webpackChunkName: "PopularItems"*/ '../../elements/PopularItems'));
const OrderAlgorithm = lazy(() => import(/*webpackChunkName: "OrderAlgorithm"*/ '../../elements/OrderAlgorithm'));
const FlashDeals = lazy(() => import(/*webpackChunkName: "FlashDeals"*/ '../../elements/FlashDeals'));
const FindFood = lazy(() => import(/*webpackChunkName: "FindFood"*/ '../../elements/FindFood'));

export const Home: FC = () => {
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
