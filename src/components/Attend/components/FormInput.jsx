import React from 'react'
import './FormInput.scss'

export default function FormInput(props) {

    const {type, name, label, placeholder, autocomplete, value, onChange} = {...props}

    let pattern = type == 'email' 
        ? new RegExp("\b[A - Z0 -9._ % +-] + @[A - Z0 - 9. -] +\.[A - Z]{ 2, }\b/i")
        : null
    
    return (
        <div className='form-input'>
            <label htmlFor={name}>{label}</label>
            <input
                value={value}
                name={name} 
                type={type}
                autoComplete={autocomplete}
                pattern={pattern != null ? pattern : undefined}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}
