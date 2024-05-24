import React, { useEffect, useState, useRef } from 'react'
import anime from 'animejs'

import RadioGroup from './components/RadioGroup'
import './PersonFormStep.scss'

import { useStore } from '../../store'
import FormInput from './components/FormInput'
import FormMultiInput from './components/FormMultiInput'

import GiftImage from '../../assets/gift-image.jpg'

import LogoTwint from '../../assets/logo-twint.jpg'
import LogoVipps from '../../assets/logo-vipps.jpg'
import LogoPaypal from '../../assets/logo-paypal.jpg'

import QrCodeVipps from '../../assets/qr-code.jpg'

const radioGroupProps = {
    legendText: "Your attendance status",
    legendTextHidden: true,
    inputsName: "is-attending",
    buttons: [
        {
            inputId: "is-attending:yes",
            inputValue: "attending:yes",
            labelFor: "is-attending:yes",
            labelText: "Yes I’m coming"
        },
        {
            inputId: "is-attending:no",
            inputValue: "attending:no",
            labelFor: "is-attending:no",
            labelText: "I can’t come"
        }
    ]
}

const radioGroupAloneOrGroup = {
    legendText: "Guests attending with you?",
    legendTextHidden: true,
    inputsName: "is-alone-or-group",
    buttons: [
        {
            inputId: "is-group",
            inputValue: "group",
            labelFor: "is-group",
            labelText: "I’m bringing others"
        },
        {
            inputId: "is-alone",
            inputValue: "alone",
            labelFor: "is-alone",
            labelText: "I’m party of one"
        }
    ]
}



export default function PersonFormStep() {

    const [showNameAndEmail, setShowNameAndEmail] = useState(false)
    const [showAloneOrGroup, setShowAloneOrGroup] = useState(false)

    const [isMobileOrTablet, setIsMobileOrTablet] = useState(null)
    const [showVippsModal, setShowVippsModal] = useState(false)
    const [showTwintModal, setShowTwintModal] = useState(false)

    const hasCrewRef = useRef(null)


    const {
        _userAttendance,
        _userName,
        _userEmail,
        _activeFormStep,
        _userHasCrew,
        _userCrewList,
        _bringFoodList,
        _foodPreferenceAllergies,
        _programItem,
        _programTimePreference,
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
    } = useStore()

    useEffect(() => {
        setIsMobileOrTablet(/Mobil|Tablet|iPad|iPhone|Android/i.test(navigator.userAgent))
    }, [])
    

    useEffect(() => {

        if(_activeFormStep == 'you' && _userHasCrew){
            updateActiveFormStep('group')
        }
        else if (_activeFormStep == 'group' && _userHasCrew == false){
            updateActiveFormStep('you')
        }
    
    }, [_userHasCrew])

    useEffect(() => {

        if(
            (_userEmail != null && _userEmail != "") && 
            (_userName != null && _userName != "")
        ) {
            if(_userAttendance){
                setShowAloneOrGroup(true)
            }else{
                setShowAloneOrGroup(false)
            }
        }
    
    }, [_userName, _userEmail, _userAttendance])
    
    
    const handelUserInfo = (e, type) => {
        if(type == 'name') updateUserName(e.target.value)
        if(type == 'email') updateUserEmail(e.target.value)
    }

    const setFocus = (selector) => {
        setTimeout(() => {
            document.querySelector(selector)?.focus()
        }, 100)
    }
    
    useEffect(() => {
        console.log("crew true", _userHasCrew)
        if (_userHasCrew && ['you'].includes(_activeFormStep)){
            anime({
                targets: hasCrewRef.current,
                translateY: [215, 0],
                opacity: [0, 1],
                duration: 400,
                easing: 'easeInOutQuad',
            })
        } else if (_userHasCrew == false && ['group'].includes(_activeFormStep)) {
            anime({
                targets: hasCrewRef.current,
                translateY: [-215, 0],
                opacity: [0, 1],
                duration: 400,
                easing: 'easeInOutQuad',
            })
        }
    }, [_userHasCrew])
    
    
    useEffect(() => {
        if(showVippsModal || showTwintModal){
            document.body.style.overflow = 'hidden'
            if(isMobileOrTablet == false) document.body.style.borderRight = 'solid 10px black'
        } else {
            document.body.style.overflow = 'auto'
            if (isMobileOrTablet == false) document.body.style.borderRight = 'none'
        }
    }, [showVippsModal, showTwintModal])
    

    

    return (
        <>
            {showVippsModal &&
                <div 
                    className="attend-form__modal attend-form__modal-vipps fade-in-container"
                    onClick={e => setShowVippsModal(false)}
                >
                    <img src={QrCodeVipps} alt="qr-code for vipps" />
                    <button>Close</button>
                </div>
            }
            {showTwintModal &&
                <div 
                    className="attend-form__modal attend-form__modal-twint fade-in-container"
                >
                    <div className="attend-form__modal-twint--instructions">
                        <div className="attend-form__modal-twint--instructions-text">
                            <ol>
                                <li>Open TWINT app, select 'Send'</li>
                                <li>
                                    Select Jeannine or enter her mobile number:  
                                    <span
                                        onClick={e => {
                                            e.preventDefault()
                                            navigator.clipboard.writeText('+41 79 79 776 86').then(() => {
                                                e.target.classList.add('show-copied-message')
                                                setTimeout(() => e.target.classList.remove('show-copied-message'), 2000)
                                            })
                                        }}
                                    >
                                        +41 79 79 776 86
                                    </span>
                                </li>
                                <li>Enter amount, add a message</li>
                                <li>Press ‘Send’</li>
                            </ol>
                        </div>
                    </div>
                    <button onClick={e => setShowTwintModal(false)}>Close</button>
                    <div onClick={e => setShowTwintModal(false)} className="attend-form__modal-twint--backdrop"></div>
                </div>
            }
            <div 
                className="attend-form--section-you" 
                style={['you', null].includes(_activeFormStep) ? {} : {display: 'none'}}
            >

                <div className="user-attend fade-in-container">
                    <RadioGroup 
                        {...radioGroupProps} 
                        handelChange={
                            e => {e.target.value == 'attending:yes' ? 
                                updateUserAttendance(true) : 
                                updateUserAttendance(false)
                                
                                setFocus('input[name="user:name"]')
                            }
                        } 
                        />
                </div>
                <div 
                    className={`person-info ${_userAttendance != null ? 'fade-in-container' : ''}`} 
                    style={_userAttendance != null ? {} : {visibility: 'hidden'}}
                >
                    <FormInput 
                        type="text" 
                        name="user:name" 
                        label="Name"
                        autocomplete="name"
                        onChange={e => handelUserInfo(e, 'name')}
                        />
                    <FormInput 
                        type="email" 
                        name="user:email" 
                        label="Email"
                        autocomplete="email"
                        onChange={e => handelUserInfo(e, 'email')}
                        />
                </div>
            </div>
            <div 
                className="alone-or-group" 
                style={{
                    ...(showAloneOrGroup ? {} : {visibility: 'hidden'}),
                    ...(['you', 'group'].includes(_activeFormStep) ? {} : {display: 'none'})
                }}
                ref={hasCrewRef}
            >
                <RadioGroup 
                    {...radioGroupAloneOrGroup} 
                    handelChange={e => {
                        updateUserHasCrew(e.target.value == 'group' ? true : false)
                        if (e.target.value == 'group') setFocus('input[name="group:members-0"]')
                    }} 
                />
            </div>
            <div 
                className="attend-form--section-group"
                style={['group'].includes(_activeFormStep) ? {} : {display: 'none'}}
            >
                <FormMultiInput 
                    type="text" 
                    name="group:members" 
                    label=""
                    placeholder="persons name"
                    legendText="What are the names of the people you are bringing?"
                    addButtonText="add person"
                    onChange={e => updateUserCrewList(e)}
                />
            </div>
            <div 
                className="attend-form--section-food"
                style={['food'].includes(_activeFormStep) ? {} : {display: 'none'}}
            >
                <FormMultiInput 
                    type="text" 
                    name="food:items" 
                    label=""
                    placeholder="food name"
                    legendText="I want to bring something"
                    addButtonText="add food item"
                    onChange={e => updateBringFoodList(e)}
                />
                <div 
                    onClick={_e => document.querySelector('.attend-form--section-food').scrollTo({
                        top: 220,
                        behavior: 'smooth'
                    })}
                >
                <FormMultiInput 
                    type="text" 
                    name="preference:items" 
                    label=""
                    placeholder="e.g: nuts, milk, vegetarian"
                    legendText="There are food allergies or preferences we should be aware of"
                    addButtonText="add item"
                    onChange={e => {
                        updateFoodPreferenceAllergies(e)
                        document.querySelector('.attend-form--section-food').scrollTo({
                            top: 220,
                            behavior: 'smooth'
                        })
                    }}
                />
                </div>
            </div>
            <div 
                className="attend-form--section-program"
                style={['program'].includes(_activeFormStep) ? {} : {display: 'none'}}
            >
                <FormMultiInput 
                    type="text" 
                    name="program:items" 
                    label=""
                    placeholder="program item"
                    legendText="Yes, count me in!"
                    addButtonText="add item"
                    sideMenuPlaceholder="preferred time"
                    sideMenu={["no preference", 'at start', 'at middle', 'at end']}
                    onChange={e => {updateProgramItem(e[0]); updateProgramTimePreference(e[1])}}
                />
            </div>
            <div 
                className="gift gift__container"
                style={['gift'].includes(_activeFormStep) ? {} : {display: 'none'}}
            >
                <img src={GiftImage} alt="" />

                <p style={_userAttendance ? {} : {display: 'none'}}>
                    Your presence at our wedding party is gift enough! However, if you wish to give something, a contribution to our future would mean a lot to us.
                </p>
                <p style={_userAttendance == false ? {} : {display: 'none'}}>
                We’re sad you can’t make it.<br />
                If you wish to give something,<br />
                a contribution to our future would mean a lot to us.
                </p>

                <p>You could use one of the following services</p>
                <div className="gift__services">
                    {isMobileOrTablet ? 
                        <a 
                        target="_blank" 
                        href="https://qr.vipps.no/28/2/01/031/4799229116?v=1"
                        >
                            <img src={LogoVipps} alt="" />
                            <span>Vipps</span>
                        </a>
                        :
                        <button
                            onClick={_e => setShowVippsModal(true)}
                        >
                            <img src={LogoVipps} alt="" />
                            <span>Vipps</span>
                        </button>
                    }
                    <a target="_blank" href="https://paypal.me/jaredisaksen?country.x=NO&locale.x=no_NO">
                        <img src={LogoPaypal} alt="" />
                        <span>PayPal</span>
                    </a>
                    <button
                        onClick={_e => setShowTwintModal(true)}
                    >
                        <img src={LogoTwint} alt="" />
                        <span>TWINT</span>
                    </button>
                </div>
                <p>or <a href="#footer-contact">contact us</a> if you want to contribute in some other transfer method</p>
            </div>
            <div 
                className="done done__container"
                style={['done'].includes(_activeFormStep) ? {} : {display: 'none'}}
            >
                <img src={GiftImage} alt="" />

                <br/>
                <p style={_userAttendance ? {} : {display: 'none'}}>
                    We appreciate you taking time to fill this out and
                    look forward to seeing you soon
                    <br/>
                    <br/><i>Kind Regards</i>
                    <br/><i>Mr & Ms Isaksen</i>
                </p>
                <p style={_userAttendance == false ? {} : {display: 'none'}}>
                    We appreciate you taking time to fill this out.
                    Hope to see you soon.
                    <br/>
                    <br/><i>Kind Regards</i>
                    <br/><i>Mr & Ms Isaksen</i>
                </p>
            </div>
        </>
    )
}


