import { getDatabase, limitToLast, onValue, query, ref } from 'firebase/database';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useScrollTo } from '../../../hooks/useScrollTo';
import { RouteNames } from '../../../router';
import { useAppSelector } from '../../../store';
import { idSelector, isAuthSelector } from '../../../store/slices/user/slice';
import { Order } from '../../../store/slices/user/types';
import { OrderCard } from '../../elements/OrderCard';
import style from './orderPage.module.scss';

export const OrderPage: FC = () => {
  const [data, setData] = useState<any>();

  const userId = useAppSelector(idSelector);
  const isAuth = useAppSelector(isAuthSelector);

  useScrollTo();

  const getUserData = (userId: string) => {
    const recentOrdersRef = query(ref(getDatabase(), 'users/' + userId), limitToLast(10));
    onValue(recentOrdersRef, (snapshot) => {
      const data = snapshot.val();
      if (data != null) {
        setData(Object.values(data).reverse());
      }
    });
  };

  useEffect(() => {
    if (userId) getUserData(userId);
  }, [userId]);

  return (
    <div className={style.productPage}>
      <div className="container">
        <h1 className={style.title}>Your orders</h1>
        <div className={style.product}>
          {!isAuth && (
            <div className={style.productPage__message}>
              You are not authorized. To access your personal account you need{' '}
              <Link className={style.productPage__link} to={RouteNames.LOGIN}>
                log in
              </Link>
            </div>
          )}

          {isAuth &&
            data?.length &&
            data.map((props: Order) => {
              return (
                <div key={uuidv4()}>
                  <OrderCard {...props} />
                </div>
              );
            })}

          {isAuth && !data?.length && (
            <div className={style.productPage__message}>
              Do you want to be the first among your friends to try our new product?{' '}
              <Link className={style.productPage__link} to={RouteNames.HOME}>
                Place your order now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
