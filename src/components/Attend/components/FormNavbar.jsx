import React, { useState } from 'react'
import './FormNavbar.scss'

import formIconFood from '../../../assets/attend-form/food.svg'
import formIconYou from '../../../assets/attend-form/you.svg'
import formIconGift from '../../../assets/attend-form/gift.svg'
import formIconProgram from '../../../assets/attend-form/program.svg'
import formIconGroup from '../../../assets/attend-form/group.svg'

import arrowPoint from '../../../assets/arrow-point.svg'

export default function FormNavbar() {

    const [activeFormStep, setActiveFormStep] = useState('')

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

    const handelFormNavButtonClicked = (e, name) => {
        let clickedButton = e.target 
        if (e.target.nodeName !== 'BUTTON') {
            clickedButton = e.target.parentElement
        }

        if(name == 'past' && name == 'next'){

        }else{
            setActiveFormStep(name)
        }
        
    }


    return (
        <div className="attend-form-menu attend-form-menu__container">
            <button 
                className="attend-form-menu__button--past"
                onClick={e => handelFormNavButtonClicked(e, 'past')}
            ><img src={arrowPoint} />Past</button>
            <ul>
                {menuButtons.map(button => (
                    <li key={button.text} className={`attend-form-menu__button-wrapper ${activeFormStep == button.text ? 'active' : '' }`}>
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
