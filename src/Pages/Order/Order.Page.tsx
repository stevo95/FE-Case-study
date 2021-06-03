import './Order.Page.css';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { Planet } from '../../Interfaces/planet.interface';
import { clearCart } from '../../redux/cartSlice';

const OrderPage: React.FC = () => {
  const [order, setOrder] = useState<Planet[] | []>([]);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart);
  const history = useHistory();
  interface Map {
    [key: string]: number;
  };
  const itemMap: Map = {};
  let totalPrice = 0;

  for (const item of cartItems) {
    const id = item.id;
    if (itemMap[id]) itemMap[id]++;
    else itemMap[id] = 1;
  }

  useEffect(() => {
    if (cartItems.length > 0 && order.length === 0) {
      setOrder(cartItems);
    } else if (order.length > 0){
      dispatch(clearCart());
    }
  }, []);

  function continueShopping() {
    history.push('/products');
  }

  const mappedItems = order.map((item: Planet, idx: number) => {
    let cssClassName = '';
    if (idx === 0) cssClassName = 'px-4 py-3';
    else cssClassName = 'border-t-2 border-gray-200 px-4 py-3';
    let id = item.id;
    id.toString();
    if (itemMap[id] > 0) {
      const numOfItems = itemMap[id];
      totalPrice += numOfItems * item.unit_price_incl_vat;
      itemMap[id] = 0;
      return (
        <tr key={id}>
          <td className={cssClassName}>{numOfItems}x</td>
          <td className={cssClassName}>{item.name}</td>
        </tr>
      )
    }
  });

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Thank you for your order</h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-auto mx-auto text-left whitespace-no-wrap">
            <tbody>
              {mappedItems}
            </tbody>
          </table>
        </div>
        <p className="lg:w-2/3 mx-auto mt-10 leading-relaxed text-center">Please send us the payment of <span className="text-3xl">{totalPrice} €</span> to our bitcoin address.</p>
        <p className="text-center mt-20">
          <button className="text-white bg-indigo-500 border-0 py-3 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={continueShopping}>Continue shopping</button>
        </p>
      </div>
    </section>
  );
};

export default OrderPage;