'use client'
import React from 'react'
import ProductCard from '@/components/shared/ProductCard'
import ProductData from '@/components/ProductData'
import { Heart } from 'iconsax-react'

const Main = () => {
  return (
    <>
      <div className='tw-flex tw-gap-2 tw-items-center'>
        <Heart className='tw-text-primary' style={{ fill: '#D23F57' }} />
        <p className='tw-font-bold tw-text-2xl'> WishList </p>
      </div>

      <div className=' tw-mt-5 tw-flex tw-justify-between tw-flex-wrap tw-gap-5'>
        {
          ProductData.map((item, index) => (
            <div key={index} className='tw-w-full sm:tw-w-[290px] xl:tw-w-[345px]'>
              <ProductCard
                item={item}
              />
            </div>
          ))
        }

      </div>
    </>
  )
}

export default Main