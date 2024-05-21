import React, { useState, useEffect } from 'react'
import './FormNavbar.scss'

import formIconFood from '../../../assets/attend-form/food.svg'
import formIconYou from '../../../assets/attend-form/you.svg'
import formIconGift from '../../../assets/attend-form/gift.svg'
import formIconProgram from '../../../assets/attend-form/program.svg'
import formIconGroup from '../../../assets/attend-form/group.svg'
import arrowPoint from '../../../assets/arrow-point.svg'

import { useStore, EFormPath } from '../../../store'

const menuButtons = [
    {
        imageSrc: formIconYou,
        text: "you"
    },
    {
        imageSrc: formIconGroup,
        text: "group"
    },
    {
        imageSrc: formIconFood,
        text: "food"
    },
    {
        imageSrc: formIconProgram,
        text: "program"
    },
    {
        imageSrc: formIconGift,
        text: "gift"
    },
]

export default function FormNavbar() {

    const {
        _activeFormStep,
        updateActiveFormStep,
        _formPath,
        updateFormPath
    } = useStore()

    const [activeFormStep, setActiveFormStep] = useState(_activeFormStep)
    const [filteredMenuButtons, setFilteredMenuButtons] = useState(menuButtons)

    useEffect(() => {

        console.log(_activeFormStep)
      
    }, [_activeFormStep])
    


    useEffect(() => {
        console
        switch (_formPath) {
            case EFormPath.CANT_COME:
                setFilteredMenuButtons(menuButtons.filter(item => {
                    return ['you', 'gift'].includes(item.text)
                }))
                break;
                
            case EFormPath.JUST_ME:
                setFilteredMenuButtons(menuButtons.filter(item => {
                    return ['you', 'food', 'program', 'gift'].includes(item.text)
                }))
                
                break;
                
            case EFormPath.ME_AND_CREW:
                setFilteredMenuButtons(menuButtons.filter(item => {
                    return ['you', 'food', 'group', 'program', 'gift'].includes(item.text)
                })) 
                break;
        
            default:
                setFilteredMenuButtons(menuButtons)
                break;
        }
    }, [_formPath])
    

    const handelFormNavButtonClicked = (e, name) => {

        let clickedButton = e.target 
        if (e.target.nodeName !== 'BUTTON') {
            clickedButton = e.target.parentElement
        }

        if(name == 'past' || name == 'next'){
            const currentIndex = filteredMenuButtons.findIndex(item => item.text == _activeFormStep)
            const direction = name == 'next' ? +1 : -1
            const newIndex = currentIndex + direction
            if((newIndex % filteredMenuButtons.length == 0 && newIndex != 0) || newIndex < 0) return
            updateActiveFormStep(filteredMenuButtons[newIndex].text)
        }else{
            updateActiveFormStep(name)
        }
        
    }

    


    return (
        <div className="attend-form-menu attend-form-menu__container"
            style={_activeFormStep != null ? {} : {display: 'none'}}
        >
            <button 
                className="attend-form-menu__button--past"
                style={_activeFormStep == menuButtons[0].text ? {visibility: 'hidden'} : {}}
                onClick={e => handelFormNavButtonClicked(e, 'past')}
            ><img src={arrowPoint} />Past</button>
            <ul>
                {filteredMenuButtons.map(button => (
                    <li 
                        key={button.text} 
                        className={`attend-form-menu__button-wrapper ${_activeFormStep == button.text ? 'active' : '' }`}
                    >
                        <button 
                            className="attend-form-menu__button"
                            onClick={e => handelFormNavButtonClicked(e, button.text)}
                        >
                            <img src={button.imageSrc} alt="" />
                            <span>{button.text}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <button 
                className="attend-form-menu__button--next"
                onClick={e => handelFormNavButtonClicked(e, 'next')}
            >Next <img src={arrowPoint} /></button>
        </div>
    )
}
