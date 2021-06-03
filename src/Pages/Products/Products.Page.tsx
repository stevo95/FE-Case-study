import ProductComponent from '../../Components/Product.Component'
import { useHistory } from 'react-router-dom';
import { getProducts } from '../../Services'
import './Products.Page.css';
import React from 'react';



const ProductsPage: React.FC = () => {
  const productsList = getProducts();
  const history = useHistory();
  interface Map {
    [key: string]: string;
  };
  const urlMap: Map = {
    '1':'https://dummyimage.com/420x260',
    '2':'https://dummyimage.com/420x261',
    '3':'https://dummyimage.com/420x262',
    '4':'https://dummyimage.com/420x263',
    '5':'https://dummyimage.com/420x264',
    '6':'https://dummyimage.com/420x265',
    '7':'https://dummyimage.com/420x266',
    '8':'https://dummyimage.com/420x267',
  };
  const mappedList = productsList.map(prod => {
    let id = prod.id;
    id.toString();
    return (
    <ProductComponent key= {prod.id} productName={prod.name} price = {prod.unit_price_incl_vat} url= {urlMap[id]} id = {prod.id}/>
    )});

    const handleClick = (): void => {
      history.push('/cart');
    };

  return (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='flex flex-col text-center w-full mb-20'>
          <h1 className='sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900'>Products</h1>
          <button className='text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={handleClick} >Go to cart</button>
        </div>
        <div className='flex flex-wrap -m-4'>
          {mappedList}
        </div>
      </div>
    </section>
    );
  };
  
  export default ProductsPage;