'use client';
import React, { useEffect } from 'react'
import Banner from './Banner'
import ProductListing from './ProductListing';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '@/reduxtoolkit/slices/products/ProductSlice';

const Main = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.Products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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