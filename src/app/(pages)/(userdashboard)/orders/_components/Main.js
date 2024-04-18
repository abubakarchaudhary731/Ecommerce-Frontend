'use client'
import AbTable from '@/components/inputfields/AbTable'
import { ArrowRight, ShoppingBag } from 'iconsax-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Main = () => {
  const router = useRouter();
  const columns = [
    { key: 'order_number', label: 'Order Number' },
    { key: 'payment_method', label: 'Payment Method' },
    { key: 'order_status', label: 'Status' },
    { key: 'total_price', label: 'Total' },
    { key: 'created_at', label: 'Date Purchased' },
  ];
  const orders = [
    {
      order_number: 'ORD001',
      payment_method: 'Credit Card',
      order_status: 'Pending',
      total_price: '$150',
      created_at: '2024-04-15',
    },
    {
      order_number: 'ORD002',
      payment_method: 'PayPal',
      order_status: 'Shipped',
      total_price: '$200',
      created_at: '2024-04-10',
    },
    {
      order_number: 'ORD003',
      payment_method: 'Bank Transfer',
      order_status: 'Delivered',
      total_price: '$180',
      created_at: '2024-04-05',
    },
    // Add more orders as needed
  ];
  const handleIconClick = () => {
    router.push('/orderdetail');
  };
  return (
    <>
      <div className='tw-flex tw-gap-2 tw-items-center'>
        <span> <ShoppingBag className='tw-text-primary' /> </span>
        <p className='tw-font-bold tw-text-2xl'> My Orders </p>
      </div>

      <div className='tw-mt-5'>
        <AbTable
          data={orders}
          columns={columns}
          icon={<ArrowRight className='tw-text-primary' />}
          clickOnIcon={handleIconClick}
        />
      </div>
    </>
  )
}

export default Main