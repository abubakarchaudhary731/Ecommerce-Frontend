import React from 'react'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'
import RanderSnakbar from '../layouts/RanderSnakbar'

const AppLayout = (props) => {
    return (
        <>
            <RanderSnakbar />
            <Header />
            <div className='tw-px-5 md:tw-px-12 xl:tw-px-24 tw-pt-20'>
                {props.children}
            </div>
            <Footer />
        </>
    )
}

export default AppLayout