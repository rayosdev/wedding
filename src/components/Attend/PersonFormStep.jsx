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
import PuertoRicanFlag from '../../assets/puerto-rico-flag.svg'
import Checkbox from './components/Checkbox'

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
    const giftCheckboxRef = useRef(null)
    const doneCoupleImageRef = useRef(null)
    const doneCoupleFirstImageRef = useRef(null)


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
        _giveGift,
        _userPathHistory,
        updateUserHasCrew,
        updateUserCrewList,
        updateBringFoodList,
        updateFoodPreferenceAllergies,
        updateProgramItem,
        updateProgramTimePreference,
        updateGiveGift,
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
        if (_giveGift && ['gift'].includes(_activeFormStep)){
            anime({
                targets: giftCheckboxRef.current,
                translateY: [115, 0],
                opacity: [0, 1],
                duration: 400,
                easing: 'easeInOutQuad',
            })
        } else if (_giveGift == false && ['gift'].includes(_activeFormStep)) {
            anime({
                targets: giftCheckboxRef.current,
                translateY: [-115, 0],
                opacity: [0, 1],
                duration: 400,
                easing: 'easeInOutQuad',
            })
        
        }
    
    }, [_giveGift])


    useEffect(() => {
        if(showVippsModal || showTwintModal){
            document.body.style.overflow = 'hidden'
            if (isMobileOrTablet == false) {
                document.body.style.borderRight = 'solid 10px black'
                document.querySelector('header').style.visibility = 'hidden'
            }
        } else {
            document.body.style.overflow = 'auto'
            if (isMobileOrTablet == false) {
                document.body.style.borderRight = 'none'
                document.querySelector('header').style.visibility = 'visible'
            }
        }
    }, [showVippsModal, showTwintModal])

    
    
    useEffect(() => {
        let fromWidth = _giveGift ? '110px' : '150px' 
        if(_activeFormStep == 'done'){
            anime({
                targets: doneCoupleImageRef.current,
                width: [fromWidth, isMobileOrTablet ? '170px' : '250px'],
                duration: 400,
                easing: 'easeInOutQuad',
            })
        }
        if (_userPathHistory.at(-1) == 'done'){
            anime({
                targets: doneCoupleFirstImageRef.current,
                width: [isMobileOrTablet ? '170px' : '250px', fromWidth],
                duration: 400,
                easing: 'easeInOutQuad',
            })
        }
    }, [_activeFormStep])
    

    // console.log(_activeFormStep)

    return (
        <>
            {showVippsModal &&
                <div
                    className="attend-form__modal attend-form__modal-vipps fade-in-container"
                    onClick={e => setShowVippsModal(false)}
                >
                    <img loading="lazy" src={QrCodeVipps} alt="qr-code for vipps" />
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
                            e => {
                                e.target.value == 'attending:yes' ?
                                updateUserAttendance(true) :
                                updateUserAttendance(false)
                                setFocus('input[name="user:name"]')
                            }
                        } 
                        />
                </div>
                <div
                    className={`person-info ${_userAttendance != null ? 'fade-in-container' : ''}`}
                    style={_userAttendance != null ? {} : { visibility: 'hidden' }}
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
                className={`alone-or-group ${showAloneOrGroup ? "fade-in-container" : ''}`}
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
                    addButtonText="add more"
                    onChange={e => updateUserCrewList(e)}
                />
            </div>
            <div 
                className="attend-form--section-food"
                style={['food'].includes(_activeFormStep) ? {} : {display: 'none'}}
            >
                {/* <FormMultiInput 
                    type="text" 
                    name="food:items" 
                    label=""
                    placeholder="food name"
                    legendText="I want to bring something"
                    addButtonText="add more"
                    onChange={e => updateBringFoodList(e)}
                /> */}
                <p>If you would like to bring some sort of food contact Jeanne Isaksen  </p>
                <div className="content">
                    <div className="content__item item">
                        <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.0004 0.666992H1.80039C1.03039 0.666992 0.407391 1.29699 0.407391 2.06699L0.400391 10.467C0.400391 11.237 1.03039 11.867 1.80039 11.867H13.0004C13.7704 11.867 14.4004 11.237 14.4004 10.467V2.06699C14.4004 1.29699 13.7704 0.666992 13.0004 0.666992ZM13.0004 3.46699L7.40039 6.96699L1.80039 3.46699V2.06699L7.40039 5.56699L13.0004 2.06699V3.46699Z"
                                fill="#515d3c" />
                        </svg>
                        <p className="item__type">Email:</p>
                        <a href="mailto:ibdjwi@gmail.com?subject=Wedding%20food">
                            ibdjwi@gmail.com </a>
                    </div>
                    <div className="content__item item">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_1650_4592)">
                                <path
                                    d="M5.2734 0.535156C4.86497 0.535156 4.47326 0.694456 4.18445 0.978011C3.89565 1.26157 3.7334 1.64615 3.7334 2.04716V15.1512C3.7334 15.5522 3.89565 15.9367 4.18445 16.2203C4.47326 16.5039 4.86497 16.6632 5.2734 16.6632H12.4601C12.8685 16.6632 13.2602 16.5039 13.549 16.2203C13.8378 15.9367 14.0001 15.5522 14.0001 15.1512V2.04716C14.0001 1.64615 13.8378 1.26157 13.549 0.978011C13.2602 0.694456 12.8685 0.535156 12.4601 0.535156H5.2734ZM7.84007 12.6312H9.8934C10.0295 12.6312 10.1601 12.6843 10.2564 12.7788C10.3526 12.8733 10.4067 13.0015 10.4067 13.1352C10.4067 13.2688 10.3526 13.397 10.2564 13.4915C10.1601 13.5861 10.0295 13.6392 9.8934 13.6392H7.84007C7.70392 13.6392 7.57335 13.5861 7.47708 13.4915C7.38081 13.397 7.32673 13.2688 7.32673 13.1352C7.32673 13.0015 7.38081 12.8733 7.47708 12.7788C7.57335 12.6843 7.70392 12.6312 7.84007 12.6312Z"
                                    fill="#515d3c" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1650_4592">
                                    <rect width="16.8" height="16.8" fill="white" transform="translate(0 0.200195)" />
                                </clipPath>
                            </defs>
                        </svg>
                        <p className="item__type">Mobile/WhatsApp:</p>
                        <a href="tel:+47 41 30 33 46">
                            +47 41 30 33 46
                        </a>
                    </div>
                </div>
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
                    addButtonText="add more"
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
                    addButtonText="add more"
                    sideMenuPlaceholder="preferred time"
                    sideMenu={["no preference", 'at start', 'at middle', 'at end']}
                    onChange={e => { updateProgramItem(e[0]); updateProgramTimePreference(e[1]) }}
                />
            </div>
            <div 
                className="gift gift__container"
                style={['gift'].includes(_activeFormStep) ? {} : {display: 'none'}}
            >
                <img ref={doneCoupleFirstImageRef} id="gift-couple-image" loading="lazy" src={GiftImage} alt="" />

                <div style={_giveGift == false ? {} : { display: 'none' }} className="fade-in-container">
                    <p style={_userAttendance ? {} : {display: 'none'}}>
                        Your presence at our wedding party is gift enough!
                        But if you wish to give something here’s what would
                        mean the world to us:
                    </p>
                    <p style={_userAttendance == false ? {} : {display: 'none'}}>
                        We’re sad you can’t make it.<br />
                        <br />
                        If you wish to give something here’s is what would
                        mean a lot to us:
                    </p>
                </div>

                <div ref={giftCheckboxRef} className="fade-in-container">
                    <Checkbox 
                        inputsName="is-give-gift"
                        inputId="is-give-gift:yes"
                        inputValue={_giveGift}
                        labelFor="is-give-gift:yes"
                        labelText="Click box for further&nbsp;details"
                        handelChange={e => {
                            updateGiveGift(!_giveGift)
                        }}
                    />
                </div>
                
                <div style={_giveGift ? {} : { display: 'none' }} className="checked-content fade-in-container">
                    <p>
                        Because of limited suitcase-space when traveling back to Switzerland, instead of things, we’d love it if you would chip in to help us finance our Honeymoon trip to Puerto&nbsp;Rico.&nbsp;🌴&nbsp;<span>&nbsp;<img style={{ height: '1.1rem', transform: 'translateY(3px) translateX(3px)' }} src={PuertoRicanFlag} alt="puerto rican flag icon" /></span>
                    </p>
                    <p>You could use one of the following services:</p>
                
                    <div className="gift__services fade-in-container">
                        {isMobileOrTablet ?
                            <a
                                target="_blank"
                                href="https://qr.vipps.no/28/2/01/031/4799229116?v=1"
                            >
                                <img loading="lazy" src={LogoVipps} alt="" />
                                <span>Vipps</span>
                            </a>
                            :
                            <button
                                onClick={_e => setShowVippsModal(true)}
                            >
                                <img loading="lazy" src={LogoVipps} alt="" />
                                <span>Vipps</span>
                            </button>
                        }
                        <a target="_blank" href="https://paypal.me/jaredisaksen?country.x=NO&locale.x=no_NO">
                            <img loading="lazy" src={LogoPaypal} alt="" />
                            <span>PayPal</span>
                        </a>
                        <button
                            onClick={_e => setShowTwintModal(true)}
                        >
                            <img loading="lazy" src={LogoTwint} alt="" />
                            <span>TWINT</span>
                        </button>
                    </div>
                    <p style={{marginBottom: '0'}}>Any contribution big or small, is most welcome. </p>
                </div>
            </div>
            <div 
                className="done done__container"
                style={['done'].includes(_activeFormStep) ? {} : {display: 'none'}}
            >
                <img ref={doneCoupleImageRef} src={GiftImage} alt="" />

                <br/>
                <div className="fade-in-container">
                    <p style={_userAttendance ? {} : {display: 'none'}}>
                        We appreciate you taking time to fill this out and
                        look forward to seeing you soon
                        <br/>
                        <br/><i>Kind Regards</i>
                        <br/><i>Mr. & Mrs. Isaksen</i>
                    </p>
                    <p style={_userAttendance == false ? {} : {display: 'none'}}>
                        We appreciate you taking time to fill this&nbsp;out.<br/>
                        Hope to see you soon.
                        <br/>
                        <br/><i>Kind Regards,</i>
                        <br/><i>Mr. & Mrs. Isaksen</i>
                    </p>
                </div>
            </div>
        </>
    )
}


