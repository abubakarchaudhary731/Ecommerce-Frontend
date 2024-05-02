import React from 'react';
import FormControl from '@mui/material/FormControl';
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
                {options?.length > 0 ? (
                    options.map((option, index) => {
                        const address = option.address + ", " + option.city + " " + option.state + " (" + option.postal_code + ") " + " - " + option.phone
                        return (
                            <FormControlLabel
                                key={index}
                                value={option.id}
                                control={<Radio />}
                                label={option.label ?? address}
                            />
                        )
                    })
                ) : <div className='tw-text-xl tw-my-5'> No Recent Data </div>
                }
            </RadioGroup>
        </FormControl>
    );
}

export default AbRadioField;
