import React from 'react'
import AppLayout from '@/components/theme/AppLayout';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Main from './_components/Main';

const Wishlist = () => {
  return (
    <>
        <AppLayout>
            <DashboardLayout>
                <Main />
            </DashboardLayout>
        </AppLayout>
    </>
  )
}

export default Wishlist

export function generateMetadata() {
    return {
        title: 'Wishlist',
        description: 'Wishlist Page',
    };
}