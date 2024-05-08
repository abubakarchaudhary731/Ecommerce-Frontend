'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AbTable from '@/components/inputfields/AbTable'
import { orderHistory } from '@/reduxtoolkit/slices/order/ConfirmOrderSlice'
import { ArrowRight, ShoppingBag } from 'iconsax-react'
import { useDispatch, useSelector } from 'react-redux'

const Main = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { orders } = useSelector((state) => state.Orders);
  const { token } = useSelector((state) => state.LoginUser);

  // ***************** Render Data Using UseEffect ************************ //
  useEffect(() => {
    if (token) {
      dispatch(orderHistory());
    }
  }, [dispatch]);

  // ****************** Table Columns ******************** //
  const columns = [
    { key: 'order_number', label: 'Order Number' },
    { key: 'payment_method', label: 'Payment Method' },
    { key: 'order_status', label: 'Status' },
    { key: 'total_price', label: 'Total (Pkr)' },
    { key: 'created_at', label: 'Date Purchased' },
  ];

  const handleIconClick = (id) => {
    router.push(`/orders/${id}`);
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