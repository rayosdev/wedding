import React from 'react'
import './FormInput.scss'

export default function FormInput(props) {

    const {type, name, label, autocomplete, value, onChange} = {...props}

    let pattern = type == 'email' ? "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" : null

    return (
        <div className='form-input'>
            <label htmlFor={name}>{label}</label>
            <input 
                name={name} 
                type={type}
                autoComplete={autocomplete}
                pattern={pattern ? pattern : ''}
                onChange={onChange}
            />
        </div>
    )
}
