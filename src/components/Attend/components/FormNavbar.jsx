import React from 'react'
import './FormNavbar.scss'

import formIconFood from '../../../assets/attend-form/food.svg'
import formIconYou from '../../../assets/attend-form/you.svg'
import formIconGift from '../../../assets/attend-form/gift.svg'
import formIconProgram from '../../../assets/attend-form/program.svg'
import formIconGroup from '../../../assets/attend-form/group.svg'

import arrowPoint from '../../../assets/arrow-point.svg'

export default function FormNavbar() {

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

    const handelFormNavButtonClicked = (e) => {
        
    }


    return (
        <div className="attend-form-menu attend-form-menu__container">
            <button className="attend-form-menu__button--past"><img src={arrowPoint} />Past</button>
            <ul>
                {menuButtons.map(button => (
                    <li key={button.text} className="attend-form-menu__button-wrapper">
                        <button className="attend-form-menu__button">
                            <img src={button.imageSrc} alt="" />
                            <span>{button.text}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <button className="attend-form-menu__button--next">Next <img src={arrowPoint} /></button>
        </div>
    )
}
