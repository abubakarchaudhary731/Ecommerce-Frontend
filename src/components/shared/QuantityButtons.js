import React from 'react'

const QuantityButtons = ({
    quantity,
    handleAddition,
    handleSubtraction
}) => {
    return (
        <>
            <div className='tw-flex tw-gap-2 tw-items-center'>
                <button className='tw-w-8 tw-text-2xl tw-border tw-border-primary tw-rounded-lg hover:tw-bg-primary hover:tw-text-whitee' onClick={handleSubtraction}>-</button>
                <p className='tw-font-bold tw-text-lg tw-px-3'>{quantity}</p>
                <button className='tw-w-8 tw-text-2xl tw-border tw-border-primary tw-rounded-lg hover:tw-bg-primary hover:tw-text-whitee' onClick={handleAddition}>+</button>
            </div>
        </>
    )
}

export default QuantityButtons