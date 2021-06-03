import React from 'react';
// import './CartItem.Components.css';

interface Props {
  name: string,
  unitPrice: number;
  VAT: number;
  quantity: number;
  total: number;
}

const CartItem: React.FC<Props> = ({
  name,
  unitPrice,
  VAT,
  quantity,
  total
}) => {

  function changeHandler() {
    // handle value change
  }

  return (
    <tr>
      <td className="px-4 py-3">{name}</td>
      <td className="px-4 py-3">
        <input name="quantity" 
              type="number" 
              className="w-12 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-right outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out" 
              value={quantity}
              onChange={changeHandler}/>
                <svg xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 inline ml-3" 
                    fill="none" viewBox="0 0 24 24" 
                    stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
        </td>
      <td className="px-4 py-3 text-right">{unitPrice} €</td>
      <td className="px-4 py-3 text-right">{VAT}%</td>
      <td className="px-4 py-3 text-lg text-gray-900 text-right">{total} €</td>
    </tr>
  );
};

export default CartItem;
