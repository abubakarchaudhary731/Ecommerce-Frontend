import React from 'react';
import Link from 'next/link';
import { Container } from '@mui/material';
import CopyRight from '@/components/shared/CopyRight';
import MailForm from '@/components/shared/forms/MailForm';

const Footer = () => {
  return (
    <>
      <div className='tw-w-full tw-bg-secondary tw-text-whitee'>
        <Container maxWidth="xl">
          <div className="tw-flex tw-py-10 tw-flex-col md:tw-flex-row tw-gap-4 md:tw-gap-0 tw-flex-wrap">
            <div className="tw-flex-1">
              <h2 className='tw-font-bold tw-text-2xl'> AB Store </h2>
              <p className='tw-mt-2'> The customer is at the heart of our unique business model, which includes design. </p>
            </div>
            <div className="tw-flex-1 md:tw-text-center">
              <h2 className='tw-font-bold tw-text-xl'>SHOPPING</h2>
              <div className='tw-flex tw-flex-col tw-gap-2 tw-mt-2'>
                <Link href='/'>Home</Link>
                <Link href='/products'>Products</Link>
                <Link href='#'>Shop</Link>
                <Link href='#'>Sale</Link>
              </div>
            </div>
            <div className="tw-flex-1 md:tw-text-center">
              <h2 className='tw-font-bold tw-text-xl'>SHOPPING</h2>
              <div className='tw-flex tw-flex-col tw-gap-2 tw-mt-2'>
                <Link href='/'>Home</Link>
                <Link href='/products'>Products</Link>
                <Link href='#'>Shop</Link>
                <Link href='#'>Sale</Link>
              </div>
            </div>
            <div className="tw-flex-1">
              <h2 className='tw-font-bold tw-text-xl'> New Letter </h2>
              <p className='tw-mt-2'>Be the first to know about new arrivals, look books, sales & promos!</p>
              <MailForm />
            </div>
          </div>

          <hr />

          <div className="tw-text-center tw-py-5">
            <CopyRight />
          </div>

        </Container>
      </div>
    </>
  )
}

export default Footer