import React from 'react';
import AbAccordion from '@/components/inputfields/AbAccordion';
import AbInputField from '@/components/inputfields/AbInputField';
import AbButton from '@/components/inputfields/AbButton';

const PaymentForm = ({
  title,
  data,
  handleChange,
  handleSubmit,
  defaultExpanded,
}) => {
  return (
    <>
      <AbAccordion
        title={title}
        defaultExpanded={defaultExpanded}
      >
        <form onSubmit={handleSubmit}>
          <div className='tw-flex tw-justify-between tw-gap-2 tw-flex-wrap lg:tw-mx-10'>
            <div className='lg:tw-w-1/3'>
              <AbInputField
                label='Name on Card'
                type='text'
                name='cardName'
                value={data.nameOnCard}
                onChange={handleChange}
              />
            </div>
            <div className='lg:tw-w-1/3'>
              <AbInputField
                label='Card Number'
                type='number'
                name='cardNumber'
                value={data.cardNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='tw-flex tw-justify-between tw-flex-wrap tw-gap-2 lg:tw-mx-10 tw-my-2 sm:tw-my-5'>
            <div className='lg:tw-w-1/3'>
              <AbInputField
                label='CVC'
                type='number'
                name='cvc'
                value={data.cvc}
                onChange={handleChange}
              />
            </div>
            <div className='lg:tw-w-1/3'>
              <AbInputField
                // label='MM-YY'
                type='date'
                name='expiryDate'
                value={data.expiryDate}
                onChange={handleChange}
              //   inputProps={{
              //     inputMode: 'numeric',
              //     pattern: '\\d{2}-\\d{2}',
              //     placeholder: 'mm-yy',
              // }}
              />
            </div>
          </div>
          <div className='tw-flex tw-justify-end lg:tw-mr-10'>
            <div>
              <AbButton
                label='Save'
                contained={true}
                type='submit'
                className='tw-px-5'
              />

            </div>
          </div>
        </form>
      </AbAccordion>
    </>
  )
}

export default PaymentForm