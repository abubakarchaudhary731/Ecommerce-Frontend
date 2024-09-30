import React from 'react';
import AbAccordion from '@/components/inputfields/AbAccordion';
import AbInputField from '@/components/inputfields/AbInputField';
import AbButton from '@/components/inputfields/AbButton';
import AbSelectField from '@/components/inputfields/AbSelectField';

const pakistanStates = [
    { value: 'punjab', label: 'Punjab' },
    { value: 'sindh', label: 'Sindh' },
    { value: 'khyber-pakhtunkhwa', label: 'Khyber Pakhtunkhwah' },
    { value: 'balochistan', label: 'Balochistan' },
    { value: 'gilgitbaltistan', label: 'Gilgit Baltistan' },
];

const AddressForm = ({
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
                        <div className='lg:tw-w-64'>
                            <AbSelectField
                                label='Country'
                                name='country'
                                value={data.country}
                                onChange={handleChange}
                                error={errors.country}
                                options={[
                                    { value: 'pakistan', label: 'Pakistan' }
                                ]}
                            />
                        </div>
                        <div className='lg:tw-w-64'>
                            <AbSelectField
                                label='State'
                                name='state'
                                value={data.state}
                                onChange={handleChange}
                                error={errors.state}
                                options={pakistanStates}
                            />
                        </div>
                        <div className='lg:tw-w-64'>
                            <AbInputField
                                label='City'
                                type='text'
                                name='city'
                                value={data.city}
                                error={errors.city}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='tw-flex tw-justify-between tw-flex-wrap tw-gap-2 lg:tw-mx-10 tw-my-2 sm:tw-my-5'>
                        <div className='lg:tw-w-64'>
                            <AbInputField
                                label='Address'
                                type='text'
                                name='area'
                                value={data.area}
                                error={errors.area}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='lg:tw-w-64'>
                            <AbInputField
                                label='Postal Code'
                                type='number'
                                name='postal_code'
                                value={data.postal_code}
                                error={errors.postal_code}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='lg:tw-w-64'>
                            <AbInputField
                                label='Phone Number'
                                type='number'
                                name='phone'
                                value={data.phone}
                                error={errors.phone}
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