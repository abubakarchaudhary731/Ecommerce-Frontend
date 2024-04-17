import { ShoppingBag } from 'iconsax-react'
import React from 'react'

const Main = () => {
    return (
        <>
            <div className='tw-flex tw-gap-2 tw-items-center'>
                <ShoppingBag className='tw-text-primary' />
                <p className='tw-font-bold tw-text-2xl'> Order Details </p>
            </div>
        </>
    )
}

export default Main