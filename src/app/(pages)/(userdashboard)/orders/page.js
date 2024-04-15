import DashboardLayout from '@/components/layouts/DashboardLayout';
import AppLayout from '@/components/theme/AppLayout';
import React from 'react'
import Main from './_components/Main';

const Order = () => {
  return (
    <AppLayout>
        <DashboardLayout>
            <Main />
        </DashboardLayout>
    </AppLayout>
  )
}

export default Order

export function generateMetadata() {
    return {
        title: 'Order Page',
        description: 'Order Page',
    };
}