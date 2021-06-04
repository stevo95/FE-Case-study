import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import CartItem from '../../Components/CartItem.Component';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { Planet } from '../../Interfaces/planet.interface'
import { createOrder } from '../../redux/orderSlice';
import { clearCart } from '../../redux/cartSlice';


const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart);
  const [mappedCartItems, setMappedCartItems] = useState<any>();
  const [total, setTotal] = useState(0);
  const [totalExclVat, setTotalExclVat] = useState(0);
  const [vatTen, setVatTen] = useState(0);
  const [vatTwenty, setVatTwenty] = useState(0);
  const [vatTwentyFive, setVatTwentyFive] = useState(0);
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

  useEffect(() => {
    let tempTotal = 0;
    let tempTotalExclVat = 0;
    let tempVatTen = 0;
    let tempVatTwenty = 0;
    let tempVatTwentyFive = 0;
    for (const item of cartItems) {
      tempTotal += item.unit_price_incl_vat;
      tempTotalExclVat += (item.unit_price_incl_vat / (100 + item.vat_category)) * 100;
      if (item.vat_category === 10) tempVatTen += item.unit_price_incl_vat - (item.unit_price_incl_vat / (100 + item.vat_category)) * 100;
      if (item.vat_category === 20) tempVatTwenty += item.unit_price_incl_vat - (item.unit_price_incl_vat / (100 + item.vat_category)) * 100;
      if (item.vat_category === 25) tempVatTwentyFive += item.unit_price_incl_vat - (item.unit_price_incl_vat / (100 + item.vat_category)) * 100;
    }
    setTotal(Math.round(tempTotal * 100) / 100);
    setTotalExclVat(Math.round(tempTotalExclVat * 100) / 100);
    setVatTen(Math.round(tempVatTen * 100) / 100);
    setVatTwenty(Math.round(tempVatTwenty * 100) / 100);
    setVatTwentyFive(Math.round(tempVatTwentyFive * 100) / 100);
  }, [cartItems]);

  useEffect(() => {
    const mappedItems = cartItems.map((item: Planet) => {
      let id = item.id;
      id.toString();
      if (itemMap[id] > 0) {
        const numOfItems = itemMap[id];
        let totalPrice = (numOfItems * item.unit_price_incl_vat);
        totalPrice = Math.round(totalPrice*100) / 100;
        itemMap[id] = 0;
        return <CartItem 
            id= {item.id} 
            key= {item.id} 
            name = {item.name} 
            unitPrice={item.unit_price_incl_vat} 
            VAT={item.vat_category} 
            quantity={numOfItems} 
            total={totalPrice} 
          />;
      }
    });
    setMappedCartItems(mappedItems);
  }, [cartItems]);

  function sendOrder():void {
    dispatch(createOrder(cartItems));
    console.log(cartItems);
    dispatch(clearCart());
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
            {mappedCartItems}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right">Total excl. VAT</td>
              <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 text-right">{totalExclVat} €</td>
            </tr>
            <tr>
              <td colSpan={4} className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right">VAT 10%</td>
              <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 text-right">{vatTen} €</td>
            </tr>
            <tr>
              <td colSpan={4} className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right">VAT 20%</td>
              <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 text-right">{vatTwenty} €</td>
            </tr>
            <tr>
              <td colSpan={4} className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right">VAT 25%</td>
              <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 text-right">{vatTwentyFive} €</td>
            </tr>
            <tr>
              <th colSpan={4} className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right">Total</th>
              <th className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 text-right">{total} €</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
        <button className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" onClick={goBack}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd" />
          </svg>
          Back
        </button>
        <button
          className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick = {sendOrder} >Send order</button>
      </div>
    </div>
  </section>
    

  );
};

export default CartPage;