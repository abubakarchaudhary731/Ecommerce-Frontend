import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const AbRadioField = ({
    label,
    options,
    defaultValue,
    name,
    onChange
}) => {
    return (
        <FormControl component="fieldset">
            <h1 className='tw-text-xl tw-font-bold'> {label} </h1>
            <RadioGroup
                aria-label={label}
                name={name}
                defaultValue={defaultValue}
                onChange={onChange}
            >
                {options.map(option => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}

export default AbRadioField;
