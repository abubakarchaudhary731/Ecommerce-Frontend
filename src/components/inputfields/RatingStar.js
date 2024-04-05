import React from 'react';
import { Rating } from '@mui/material';

const RatingStar = ({
  label,
  name,
  value,
  onChange,
  readOnly = false
}) => {
  return (
    <>
      <div className='tw-flex tw-gap-2 tw-items-center'>
        <Rating
          name={name}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
        />
        <p className='tw-text-sm'> {label} </p>
      </div>
    </>
  )
}

export default RatingStar;
