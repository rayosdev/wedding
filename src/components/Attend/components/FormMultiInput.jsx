import React, { useRef, useState, useEffect } from 'react'
import './FormMultiInput.scss'
import FormInput from './FormInput'

import PlusIcon from '../../../assets/plus-icon.svg'

export default function FormMultiInput(props) {
    
    const {
        type, 
        name, 
        label,
        placeholder, 
        value, 
        onChange, 
        legendText, 
        addButtonText} = {...props}
    

    const hostRef = useRef(null)
    const listContainerRef = useRef(null)
    
    const [inputValues, setInputValues] = useState([""])

    useEffect(() => {
        if (listContainerRef.current && inputValues[inputValues.length - 1] == '') {
          listContainerRef.current.scrollTop = listContainerRef.current.scrollHeight - listContainerRef.current.clientHeight - 28;
        }
        onChange(inputValues)
    }, [inputValues]);
    

    const handleInputChange = (index, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
    }

    const handleAddButtonClick = (e) => {
        setInputValues([...inputValues, ''])
    }
    

    return (
        <>
            <fieldset 
                className="form-multi-input" 
                role="group" 
                aria-labelledby={`${name}-multi-input}`}
                ref={hostRef}
            >
                <legend id={`${name}-multi-input`}>{legendText}</legend>
                <ul ref={listContainerRef}>
                    {inputValues.map((element, index) => (
                        <li key={`${name}-${index}`}>
                            <FormInput 
                                type={type} 
                                name={`${name}-${index}`} 
                                id={`${name}-${index}`}
                                label={`${label} ${index + 1}`}
                                value={element}
                                placeholder={placeholder}
                                onChange={e => handleInputChange(index, e.target.value)}
                            />
                            <button
                                style={inputValues.length === 1 ? {visibility: 'hidden'} : {}}
                                className="form-multi-input__remove-button"
                                onClick={e => setInputValues(inputValues.filter((item, i) => i !== index))}
                            ></button>
                        </li>
                    ))}
                </ul>
                <button
                    className="form-multi-input__add-button"
                    disabled={inputValues[inputValues.length - 1] === ''}
                    type="button"
                    onClick={handleAddButtonClick}
                >
                    <img src={PlusIcon} />
                    <span>{addButtonText}</span>
                </button>
            </fieldset>
        </>
    )
}
