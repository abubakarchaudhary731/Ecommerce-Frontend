import React from 'react'
import AppLayout from '@/components/theme/AppLayout'
import Main from './_componenets/Main'

const UserAddress = () => {
  return (
    <>
      <AppLayout>
        <Main />
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