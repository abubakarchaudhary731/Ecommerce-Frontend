import AppLayout from '@/components/theme/AppLayout'
import React from 'react'
import Main from './_components/Main'

const Cart = () => {
  return (
    <>
        <AppLayout>
            <Main />
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