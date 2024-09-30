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
  errors,
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
                name='name_on_card'
                value={data.name_on_card}
                onChange={handleChange}
                error={errors ? errors.name_on_card : null}
              />
            </div>
            <div className='lg:tw-w-1/3'>
              <AbInputField
                label='Card Number'
                type='text'
                name='card_number'
                value={data.card_number}
                onChange={handleChange}
                error={errors ? errors.card_number : null}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '\\d{4}-\\d{4}-\\d{4}-\\d{4}',
                  placeholder: '05-25',
                }}
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
                error={errors ? errors.cvc : null}
              />
            </div>
            <div className='lg:tw-w-1/3'>
              <AbInputField
                label='Expiry Date'
                type='text'
                name='expiry_date'
                value={data.expiry_date}
                onChange={handleChange}
                error={errors ? errors.expiry_date : null}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '\\d{2}-\\d{2}',
                  placeholder: '05-25',
                }}
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