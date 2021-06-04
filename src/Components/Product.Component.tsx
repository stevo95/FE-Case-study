import React from 'react';
import { updateCart } from '../redux/cartSlice';
import { getProductById } from '../Services';
import { useAppDispatch } from '../redux/hooks';
import { useHistory } from 'react-router-dom';

interface Props {
  productName: string;
  url: string | undefined;
  price: number;
  id: number;
}

const ProductComponent: React.FC<Props> = ({
  productName,
  url,
  price,
  id,
}) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  function addToCart() {
    const product = getProductById(id);
    if (product !== undefined) {
      dispatch(updateCart(product));
      history.push('/cart');
    }
  };

  return (
    <div className='lg:w-1/4 md:w-1/2 p-4 w-full'>
      <button className='block relative h-48 rounded overflow-hidden'>
        <img alt='ecommerce' className='object-cover object-center w-full h-full block'
          src={url}/>
      </button>
      <div className='mt-4'>
        <h2 className='text-gray-900 title-font text-lg font-medium'>{productName}</h2>
        <div className='flex flex-wrap items-center mt-2'>
          <p className='flex-1'>{price} €</p>
          <button className='text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={addToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductComponent;
