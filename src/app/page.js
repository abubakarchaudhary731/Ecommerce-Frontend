import React from 'react'
import AppLayout from '@/components/theme/AppLayout'
import Main from '@/app/_components/Main'

const Home = () => {
  return (
    <>
      <AppLayout>
        <Main />
      </AppLayout>
    </>
  )
}

export default Home

export function generateMetadata() {
  return {
      title: 'Home Page',
      description: 'Home Page',
  };
}