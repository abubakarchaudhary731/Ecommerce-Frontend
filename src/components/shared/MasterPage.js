import AbButton from '@/components/inputfields/AbButton'
import Link from 'next/link'
import React from 'react'

const MasterPage = ({
    title,
    description1,
    description2,
    buttonLabel,
    handleSubmit,
    children,
    login,
    register
}) => {
    return (
        <>
            <div className='md:tw-flex tw-justify-center tw-items-center md:tw-h-screen tw-w-full md:tw-mt-[-80px] md:tw-gap-2 lg:tw-gap-10  tw-mt-10'>
                <div className='md:tw-basis-[50%] lg:tw-basis-[60%]'>
                    <h1 className='tw-text-2xl lg:tw-text-5xl tw-font-bold tw-text-primary tw-mb-3 md:tw-mb-6'> {title} </h1>
                    <p> {description1} <br /> {description2} </p>
                </div>
                <div className='md:tw-basis-[50%] lg:tw-basis-[40%] tw-my-5 md:tw-my-0 tw-rounded-xl tw-bg-whitee tw-shadow-lg'>
                    <div className='tw-p-10'>
                        <form className='tw-flex tw-flex-col tw-gap-5' onSubmit={handleSubmit}>
                            {children}
                            <div className='tw-w-24'>
                                <AbButton
                                    type='submit'
                                    label={buttonLabel}
                                    className='tw-px-3'
                                />
                            </div>
                        </form>
                    </div>
                    {login && <p className='tw-text-center tw-mb-4 tw-text-sm'> Don't have an account? <Link href='/register'> <i className='tw-text-primary'>Register</i> </Link> now </p>}
                    {register && <p className='tw-text-center tw-mb-4 tw-text-sm'> Already have an account <Link href='/login'> <i className='tw-text-primary'>Login</i> </Link> </p>}

                </div>
            </div>
        </>
    )
}

export default MasterPage