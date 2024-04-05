import AppLayout from '@/components/theme/AppLayout'
import React from 'react'

const Cart = () => {
  return (
    <>
        <AppLayout>
            <div>Cart</div>
        </AppLayout>
    </>
  )
}

export default Cart

export function generateMetadata() {
    return {
        title: 'Cart Page',
        description: 'Cart Page',
    };
}