import React from 'react'
import './FormInput.scss'

export default function FormInput(props) {

    const {type, name, label, placeholder, autocomplete, value, onChange, onKeyDown} = {...props}



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
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        if(onKeyDown == null) e.preventDefault() 
                    }
                    onKeyDown ? onKeyDown(e) : () => {}
                    e.stopPropagation()
                }}
                placeholder={placeholder}
            />
        </div>
    )
}
