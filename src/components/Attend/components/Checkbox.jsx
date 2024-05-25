import React, { useEffect } from 'react'
import './Checkbox.scss'

const defaultProps = {
    inputsName: "is-attending",
    inputId: "is-attending:yes",
    inputValue: "yes attending",
    labelFor: "is-attending:yes",
    labelText: "Yes I’m coming"
}

export default function Checkbox(props) {

    const { labelText, labelFor, inputId, inputsName, inputValue, handelChange } = { ...defaultProps, ...props }

    return (
        <div 
            className="checkbox" key={inputId}
            onClick={e => handelChange(e)}
        >
            <label htmlFor={labelFor}>
                <input
                    id={inputId}
                    type="checkbox"
                    name={inputsName}
                    checked={inputValue}
                    onChange={e =>{
                        console.log(e.target.checked)
                        handelChange(e) 
                    }}
                />
                <span>{labelText}</span>
            </label>
        </div>
    )
}
