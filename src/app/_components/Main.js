'use client';
import React from 'react'
import Banner from './Banner'
import ProductCard from '@/components/shared/ProductCard';
import ProductListing from './ProductListing';

const Main = () => {
  return (
    <>
        <Banner />
        <div>
          <ProductListing />
        </div>
    </>
  )
}

export default Main