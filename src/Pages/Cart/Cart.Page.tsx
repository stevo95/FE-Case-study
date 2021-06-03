import './Cart.Page.css';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import CartItem from '../../Components/CartItem.Component';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { Planet } from '../../Interfaces/planet.interface'


const CartPage: React.FC = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart);
  const history = useHistory();

  interface Map {
    [key: string]: number;
  };
  const itemMap: Map = {};

  for (const item of cartItems) {
    const id = item.id;
    if (itemMap[id]) itemMap[id]++;
    else itemMap[id] = 1;
  }

  const mappedItems = cartItems.map((item: Planet) => {
    let id = item.id;
    id.toString();
    if (itemMap[id] > 0) {
      const numOfItems = itemMap[id];
      const totalPrice = numOfItems * item.unit_price_incl_vat;
      itemMap[id] = 0;
      return (
      <CartItem key= {item.id} name = {item.name} unitPrice={item.unit_price_incl_vat} VAT={item.vat_category} quantity={numOfItems} total={totalPrice} />
      )
    }
  });

  function sendOrder():void {
    console.log(cartItems);
    history.push('/order');
  }

  function goBack() {
    history.goBack();
  }

  return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Cart</h1>
      </div>
      <div className="lg:w-2/3 w-full mx-auto overflow-auto">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th
                className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Item</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Quantity</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-right">Unit Price incl. VAT</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-right">VAT</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {mappedItems}


          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right">Total excl. VAT</td>
              <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 text-right">59.74 €</td>
            </tr>
            <tr>
              <td colSpan={4} className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right">VAT 10%</td>
              <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 text-right">2.79 €</td>
            </tr>
            <tr>
              <td colSpan={4} className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right">VAT 20%</td>
              <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 text-right">2.18 €</td>
            </tr>
            <tr>
              <th colSpan={4} className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right">Total</th>
              <th className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 text-right">64.71 €</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
        <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" onClick={goBack}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd" />
          </svg>
          Back
        </a>
        <a
          className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick = {sendOrder} >Send order</a>
      </div>
    </div>
  </section>
    

  );
};

export default CartPage;