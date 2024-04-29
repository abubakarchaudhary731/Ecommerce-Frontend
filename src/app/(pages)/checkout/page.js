import React from 'react'
import AppLayout from '@/components/theme/AppLayout'
import Main from './_components/Main'

const Checkout = () => {
  return (
    <>
        <AppLayout>
            <Main />
        </AppLayout>
    </>
  )
}

export default Checkout

export function generateMetadata() {
    return {
        title: 'Checkout',
        description: 'Checkout Page',
    };
}