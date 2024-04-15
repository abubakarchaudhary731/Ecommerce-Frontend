import React from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import AppLayout from '@/components/theme/AppLayout'
import Main from './_componenets/Main'

const UserAddress = () => {
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

export default UserAddress

export function generateMetadata() {
  return {
      title: 'User Addresses',
      description: 'User Addresses Page',
  };
}