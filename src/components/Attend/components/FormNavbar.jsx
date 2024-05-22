import React, { useState, useEffect } from 'react'
import { firestore, collection, addDoc } from '../../../../firebaseConfig'
import './FormNavbar.scss'

import formIconFood from '../../../assets/attend-form/food.svg'
import formIconYou from '../../../assets/attend-form/you.svg'
import formIconGift from '../../../assets/attend-form/gift.svg'
import formIconProgram from '../../../assets/attend-form/program.svg'
import formIconGroup from '../../../assets/attend-form/group.svg'
import formIcondone from '../../../assets/attend-form/done.svg'
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
    {
        imageSrc: formIcondone,
        text: "done"
    },
]

export default function FormNavbar() {

    const {
        _activeFormStep,
        _userAttendance,
        _userName,
        _userEmail,
        _formPath,
        _userHasCrew,
        _userCrewList,
        _bringFoodList,
        _foodPreferenceAllergies,
        _programItem,
        _programTimePreference,
        _userPathHistory,
        updateUserHasCrew,
        updateUserCrewList,
        updateBringFoodList,
        updateFoodPreferenceAllergies,
        updateProgramItem,
        updateProgramTimePreference,
        updateUserAttendance,
        updateUserName,
        updateUserEmail,
        updateActiveFormStep,
        updateUserPathHistory
    } = useStore()

    const [activeFormStep, setActiveFormStep] = useState(_activeFormStep)
    const [filteredMenuButtons, setFilteredMenuButtons] = useState(menuButtons)

    const addNewPerson = async () => {
        let data = {
            name: _userName,
            email: _userEmail,
            attending: _userAttendance,
            group: _userCrewList,
            bringFood: _bringFoodList,
            preferenceAllergy: _foodPreferenceAllergies,
            programItem: _programItem,
            programTimePreference: _programTimePreference
        }
        if(_userAttendance == false) data = {
            name: _userName,
            email: _userEmail,
            attending: _userAttendance
        }
        try {
            const docRef = await addDoc(collection(firestore, 'users'), data)
            console.log("Document written with ID: ", docRef.id)
        } catch (e) {
            console.error("Error adding document: ", e)
        }
    }

    useEffect(() => {

        if (_activeFormStep == 'done' && _userPathHistory.includes('done') == false) addNewPerson()
        updateUserPathHistory([..._userPathHistory, _activeFormStep])
    
    }, [_activeFormStep])

    useEffect(() => {

        updateUserPathHistory([])
        
    
    }, [_userAttendance])
    


    useEffect(() => {
        switch (_formPath) {
            case EFormPath.CANT_COME:
                setFilteredMenuButtons(menuButtons.filter(item => {
                    return ['you', 'gift', 'done'].includes(item.text)
                }))
                break;
                
            case EFormPath.JUST_ME:
                setFilteredMenuButtons(menuButtons.filter(item => {
                    return ['you', 'food', 'program', 'gift', 'done'].includes(item.text)
                }))
                
                break;
                
            case EFormPath.ME_AND_CREW:
                setFilteredMenuButtons(menuButtons.filter(item => {
                    return ['you', 'food', 'group', 'program', 'gift', 'done'].includes(item.text)
                })) 
                break;
        
            default:
                setFilteredMenuButtons(menuButtons)
                break;
        }
    }, [_formPath])
    

    const handelFormNavButtonClicked = (e, name) => {
        e.preventDefault()

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

    const showOrHide = (type) => {
        switch (type) {
            case 'you':
                return true
                break;
            case 'group':
                if(_userHasCrew) return true
                break;
            case 'food':
                if(_userHasCrew == false) return true
                if(_userCrewList[0] != '') return true
                break;
            case 'program':
                if(
                    _userAttendance && 
                    (_userCrewList[0] != '' || _userHasCrew == false) &&
                    _userPathHistory.includes('food')
                ) return true
                
                break;
            case 'gift':
                if(_formPath == EFormPath.CANT_COME && (_userName?.length > 0 && _userEmail?.length > 0)) return true
                if(
                    _userAttendance && 
                    (_userCrewList[0] != '' || _userHasCrew == false) &&
                    _userPathHistory.includes('program')
                ) return true
                break;
            case 'done':
                if(_formPath == EFormPath.CANT_COME && _userPathHistory.includes('gift')) return true
                if(
                    _userAttendance && 
                    (_userCrewList[0] != '' || _userHasCrew == false) &&
                    _userPathHistory.includes('gift')
                ) return true
                break;
            case 'next':
                if(
                    _activeFormStep == 'you' && 
                    (_userName?.length > 0 && _userEmail?.length > 0) &&
                    (_userHasCrew != null || _userAttendance == false)
                ) return true
                if(_activeFormStep == 'group' && _userCrewList[0] != '') return true
                if(['food', 'program', 'gift'].includes(_activeFormStep)) return true
                break;
        
            default:
                break;
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
                        style={showOrHide(button.text) ? {} : {visibility: 'hidden'}}
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
                style={showOrHide('next') ? {} : {visibility: 'hidden'}}
                onClick={e => handelFormNavButtonClicked(e, 'next')}
            >Next <img src={arrowPoint} /></button>
        </div>
    )
}
