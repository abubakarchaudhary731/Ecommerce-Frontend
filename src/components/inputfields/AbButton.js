import React from 'react';

const AbButton = ({
    type,
    className,
    handleClick,
    label,
    contained,
}) => {
    // Determine button style based on the 'contained' prop
    const buttonStyle = contained
        ? 'tw-bg-primary tw-text-white'
        : 'tw-bg-transparent tw-text-primary hover:tw-bg-primary hover:tw-text-white';

    return (
        <>
            <button
                type={type}
                className={`${className} tw-w-full tw-border-2 tw-border-primary tw-py-2 tw-font-bold tw-rounded-lg ${buttonStyle}`}
                onClick={handleClick}
            >
                {label}
            </button>
        </>
    );
};

export default AbButton;
