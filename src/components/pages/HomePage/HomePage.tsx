import { FC, lazy } from 'react';

import { useScrollTo } from '../../../hooks/useScrollTo';
import style from './home.module.scss';

const AppDownLoad = lazy(() => import(/*webpackChunkName: "AppDownLoad"*/ '../../blocks/AppDownLoad'));
const CallToAction = lazy(() => import(/*webpackChunkName: "CallToAction"*/ '../../blocks/CallToAction'));
const FeaturedRestaurants = lazy(
  () => import(/*webpackChunkName: "FeaturedRestaurants"*/ '../../blocks/FeaturedRestaurants'),
);
const Cities = lazy(() => import(/*webpackChunkName: "Cities"*/ '../../blocks/Cities'));
const Details = lazy(() => import(/*webpackChunkName: "Details"*/ '../../blocks/Details'));
const SearchFood = lazy(() => import(/*webpackChunkName: "SearchFood"*/ '../../blocks/SearchFood'));
const PopularItems = lazy(() => import(/*webpackChunkName: "PopularItems"*/ '../../blocks/PopularItems'));
const OrderAlgorithm = lazy(() => import(/*webpackChunkName: "OrderAlgorithm"*/ '../../blocks/OrderAlgorithm'));
const FlashDeals = lazy(() => import(/*webpackChunkName: "FlashDeals"*/ '../../blocks/FlashDeals'));
const FindFood = lazy(() => import(/*webpackChunkName: "FindFood"*/ '../../blocks/FindFood'));

export const Home: FC = () => {
  useScrollTo();
  return (
    <div className={style.homePage}>
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
    </div>
  );
};
