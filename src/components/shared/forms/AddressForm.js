import React from 'react';
import AbAccordion from '@/components/inputfields/AbAccordion';
import AbInputField from '@/components/inputfields/AbInputField';
import AbButton from '@/components/inputfields/AbButton';

const AddressForm = ({
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
                        <div className='lg:tw-w-64'>
                            <AbInputField
                                label='Country'
                                type='text'
                                name='country'
                                value={data.country}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='lg:tw-w-64'>
                            <AbInputField
                                label='State'
                                type='text'
                                name='state'
                                value={data.state}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='lg:tw-w-64'>
                            <AbInputField
                                label='City'
                                type='text'
                                name='city'
                                value={data.city}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='tw-flex tw-justify-between tw-flex-wrap tw-gap-2 lg:tw-mx-10 tw-my-2 sm:tw-my-5'>
                        <div className='lg:tw-w-64'>
                            <AbInputField
                                label='Area'
                                type='text'
                                name='area'
                                value={data.area}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='lg:tw-w-64'>
                            <AbInputField
                                label='Postal Code'
                                type='number'
                                name='postalCode'
                                value={data.postal_code}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='lg:tw-w-64'>
                            <AbInputField
                                label='Phone Number'
                                type='text'
                                name='phone'
                                value={data.phone}
                                onChange={handleChange}
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

export default AddressForm