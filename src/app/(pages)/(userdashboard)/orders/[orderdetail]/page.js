import DashboardLayout from '@/components/layouts/DashboardLayout';
import AppLayout from '@/components/theme/AppLayout';
import React from 'react'
import Main from './_components/Main';

const OrderDetail = () => {
  return (
    <AppLayout>
        <DashboardLayout>
            <Main />
        </DashboardLayout>
    </AppLayout>
  )
}

export default OrderDetail

export function generateMetadata() {
    return {
        title: 'OrderDetail Page',
        description: 'OrderDetail Page',
    };
}