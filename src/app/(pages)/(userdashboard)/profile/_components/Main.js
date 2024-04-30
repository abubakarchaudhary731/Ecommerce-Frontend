'use client'
import React, { useState } from 'react';
import AbButton from '@/components/inputfields/AbButton';
import { ProfileCircle } from 'iconsax-react';
import Image from 'next/image';
import AbTable from '@/components/inputfields/AbTable';
import AbModal from '@/components/inputfields/AbModal';
import AbInputField from '@/components/inputfields/AbInputField';
import { useSelector } from 'react-redux';

const Main = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const { user } = useSelector((state) => state.LoginUser);

  const column = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
  ];
  
  return (
    <>
      <div className='tw-flex tw-justify-between tw-items-center'>
        <div className='tw-flex tw-gap-2 tw-items-center'>
          <ProfileCircle className='tw-text-primary' />
          <p className='tw-text-2xl tw-font-bold'> My Profile </p>
        </div>
        <div>
          <AbButton type='button' label='Edit Profile' className='tw-px-3' handleClick={handleOpen} />
        </div>
      </div>

      <div className='2xl:tw-flex tw-mt-5 tw-gap-5'>
        <div className='2xl:tw-basis-[50%] tw-bg-whitee tw-rounded-xl tw-py-3 tw-px-8'>
          <div className='tw-flex tw-gap-4 tw-items-center'>
            <Image
              src='/images/static/emelie2.jpeg'
              alt='profile'
              width={90}
              height={90}
              className='tw-rounded-full '
            />
            <div>
              <p className='tw-font-bold tw-text-lg'> {user.name} </p>
              <p className='tw-text-sm tw-text-icon'>{user.email}</p>
            </div>
          </div>
        </div>

        <div className='2xl:tw-basis-[50%] tw-mt-5 2xl:tw-mt-0 tw-flex tw-gap-5 tw-justify-between tw-flex-wrap 2xl:tw-flex-nowrap'>
          {[
            { count: '30', label: 'Orders' },
            { count: '10', label: 'Awaiting Payments' },
            { count: '3', label: 'Awaiting Shipments' },
            { count: '5', label: 'Delivered' },
          ].map((item, index) => (
            <div
              key={index}
              className='tw-bg-whitee tw-rounded-xl tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-40 2xl:tw-h-full tw-h-32'
            >
              <p className='tw-text-3xl tw-font-bold tw-text-primary'>{item.count}</p>
              <p className='tw-text-center'>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      {/* *************************** Table ************************* */}
      <div className='tw-mt-5'>
        <AbTable
          data={[user]}
          columns={column}
        />
      </div>

      <AbModal
        title='Edit Profile'
        open={openModal}
        handleClose={handleClose}
      >
        <div className='tw-p-5'>
          <form className='tw-flex tw-flex-col tw-gap-4 md:tw-min-w-96'>
            <AbInputField
              name='name'
              label='Name'
              type='text'
            />
            <AbInputField
              name='email'
              label='Email'
              type='email'
            />
            <AbButton type='submit' label='Update Profile' className='tw-px-3' />
          </form>
        </div>
      </AbModal>
    </>
  );
};

export default Main;
