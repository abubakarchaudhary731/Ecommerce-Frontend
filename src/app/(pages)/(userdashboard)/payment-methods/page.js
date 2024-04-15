import React from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import AppLayout from '@/components/theme/AppLayout'
import Main from './_components/Main'

const PaymentMethod = () => {
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

export default PaymentMethod

export function generateMetadata() {
  return {
    title: 'PaymentMethod',
    description: 'PaymentMethod Page',
  };
}