import { getDatabase, limitToLast, onValue, query, ref } from 'firebase/database';
import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useAppSelector } from '../../../store';
import { idSelector } from '../../../store/slices/user/slice';
import { OrderItem } from '../../../store/slices/user/types';
import { OrderCard } from '../../elements/OrderCard/OrderCard';
import style from './orderPage.module.scss';

export const OrderPage: FC = () => {
  const [data, setData] = useState<any>();

  const { pathname } = useLocation();

  const userId = useAppSelector(idSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getUserData = (userId: string) => {
    const recentOrdersRef = query(ref(getDatabase(), 'users/' + userId), limitToLast(10));
    onValue(recentOrdersRef, (snapshot) => {
      const data = snapshot.val();
      if (data != null) {
        const aa = Object.values(data).reverse();
        setData(aa);
      }
    });
  };

  useEffect(() => {
    if (userId) getUserData(userId);
  }, [userId]);
  console.log(data);
  return (
    <div className={style.productPage}>
      <div className="container">
        <h1 className={style.title}>Your orders</h1>
        <div className={style.product}>
          {data?.length &&
            data.map((props: OrderItem) => {
              return (
                <div key={uuidv4()}>
                  <OrderCard {...props} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
