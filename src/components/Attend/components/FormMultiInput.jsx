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
        sideMenuPlaceholder,
        sideMenu,
        addButtonText} = {...props}
    

    const hostRef = useRef(null)
    const listContainerRef = useRef(null)
    
    const [inputValues, setInputValues] = useState([""])
    const [timeValues, setTimeValues] = useState([])

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

    const handleSelectChange = (index, value) => {
        const newTimeValues = [...timeValues];
        newTimeValues[index] = value;
        setTimeValues(newTimeValues);
    }

    const handleAddButtonClick = (e) => {
        setInputValues([...inputValues, ''])
    }
    

    return (
        <>
            <fieldset 
                className={`
                    form-multi-input 
                    ${sideMenu ? 'side-menu' : ''}
                    ${inputValues.length === 1 ? '' : 'more-items'}
                `} 
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
                            {sideMenu && 
                                
                                <select
                                    name={`${name}-time-${index}`}
                                    id={`${name}-time-${index}`}
                                    value={timeValues[0] != null ? timeValues[index] : null}
                                    placeholder={sideMenuPlaceholder}
                                    onChange={e => handleSelectChange(index, e.target.value)}
                                    style={timeValues[0] == null ? {color: 'var(--text-gray)'} : {}}
                                >
                                    {timeValues[0] == null &&
                                        <option 
                                            value={sideMenuPlaceholder}
                                        >{sideMenuPlaceholder}</option>
                                    }
                                    {sideMenu.map((option, idx) => (
                                        <option key={idx} value={option}>{option}</option>
                                    ))}
                                </select>
                            }
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
