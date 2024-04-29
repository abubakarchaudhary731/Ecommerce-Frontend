'use client';
import React from 'react'
import Banner from './Banner'
import ProductListing from './ProductListing';
import { useSelector } from 'react-redux';

const Main = () => {
  const { products } = useSelector((state) => state.Products);
  return (
    <>
      <Banner />
      <div>
        <ProductListing 
          products={products}
        />
      </div>
    </>
  )
}

export default Main