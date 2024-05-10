import React from 'react'
import './RadioGroup.scss'

const defaultProps = {
    legendText: "Your attendance status",
    legendTextHidden: true,
    inputsName: "is-attending",
    buttons: [
        {
            inputId: "is-attending:yes",
            inputValue: "yes attending",
            labelFor: "is-attending:yes",
            labelText: "Yes I’m coming"
        },
        {
            inputId: "is-attending:no",
            inputValue: "not attending",
            labelFor: "is-attending:no",
            labelText: "I can’t come"
        }
    ]
}

export default function RadioGroup(props) {

    const { legendText, legendTextHidden, inputsName, buttons, handelChange } = { ...defaultProps, ...props }
        
    return (
        <fieldset className="radio-group">
            <legend className={`${legendTextHidden ? 'hidden' : ''}`}>
                {legendText}
            </legend>
            {buttons.map(button => (

                <div className="radio-group__button" key={button.inputId}>
                    <label htmlFor={button.labelFor}>
                        <input 
                            id={button.inputId} 
                            type="radio" 
                            name={inputsName} 
                            value={button.inputValue}
                            onChange={handelChange} 
                        />
                        <span>{button.labelText}</span>
                    </label>

                </div>
            ))}
            <div 
                id={`${inputsName}:error-message`} 
                aria-live="polite" 
                aria-relevant="additions removals"
                className="radio-group__error-message"></div>
        </fieldset>
    )
}
