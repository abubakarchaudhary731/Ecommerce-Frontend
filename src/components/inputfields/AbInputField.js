import React from 'react';
import { FormHelperText, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';

const AbInputField = ({
    value,
    onChange,
    label,
    name,
    variant,
    id,
    type,
    error,
    icon,
    handleClick,
    color,
    required = false,
    fullWidth = true,
    style,
}) => {
    const inputProps = {
        endAdornment: icon ? (
            <IconButton edge="end" onClick={handleClick}>
                {icon}
            </IconButton>
        ) : (
            <></>
        ),
    };
    return (
        <TextField
            sx={style}
            id={id ? id : ""}
            label={label}
            value={value}
            variant={variant ? variant : "standard"}
            name={name}
            required={required}
            error={error ? true : false}
            onChange={onChange}
            fullWidth={fullWidth}
            helperText={error ? (
                <FormHelperText error>{error}</FormHelperText>
            ) : ''}
            type={type}
            color={color}
            InputProps={inputProps}
            size="small"
        />
    );
}

export default AbInputField