import React, { useEffect, useState } from 'react'

import RadioGroup from './components/RadioGroup'
import './PersonFormStep.scss'

import { useStore } from '../../store'
import FormInput from './components/FormInput'
import FormMultiInput from './components/FormMultiInput'

import GiftImage from '../../assets/gift-image.jpg'

import LogoTwint from '../../assets/logo-twint.jpg'
import LogoVipps from '../../assets/logo-vipps.jpg'
import LogoPaypal from '../../assets/logo-paypal.jpg'

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

    const {
        _userAttendance,
        _userName,
        _userEmail,
        _activeFormStep,
        _userHasCrew,
        _userCrewList,
        updateUserHasCrew,
        updateUserCrewList,
        updateUserAttendance,
        updateUserName,
        updateUserEmail,
        updateActiveFormStep,
    } = useStore()

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

    console.log(_activeFormStep)

    return (
        <>
            <div 
                className="attend-form--section-you" 
                style={['you', null].includes(_activeFormStep) ? {} : {display: 'none'}}
            >

                <div className="user-attend">
                    <RadioGroup 
                        {...radioGroupProps} 
                        handelChange={
                            e => e.target.value == 'attending:yes' ? 
                            updateUserAttendance(true) : 
                            updateUserAttendance(false)
                        } 
                        />
                </div>
                <div className="person-info" style={_userAttendance != null ? {} : {visibility: 'hidden'}}>
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
            >
                <RadioGroup 
                    {...radioGroupAloneOrGroup} 
                    handelChange={e => updateUserHasCrew(e.target.value == 'group' ? true : false)} 
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
                    onChange={e => console.log("test:::")}
                />
                <FormMultiInput 
                    type="text" 
                    name="prefrence:items" 
                    label=""
                    placeholder="e.g: nuts, milk, vegetarian"
                    legendText="There are food allergies or preferences we should be aware of"
                    addButtonText="add item"
                    onChange={e => console.log("test:::")}
                />
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
                    onChange={e => console.log("test:::")}
                />
            </div>
            <div 
                className="gift gift__container"
                style={['gift'].includes(_activeFormStep) ? {} : {display: 'none'}}
            >
                <img src={GiftImage} alt="" />

                <p style={_userAttendance ? {} : {display: 'none'}}>
                    Your presence at our wedding party is gift enough!
                    But if you wish to give something, a contribution to
                    our future would mean a lot to us.
                </p>
                <p style={_userAttendance == false ? {} : {display: 'none'}}>
                We’re sad you can’t make it.<br />
                If you wish to give us something,<br />
                a contribution to our savings would mean a lot to us.
                </p>

                <p>You could use one of the following services</p>
                <div className="gift__services">
                    <a target="_blank" href="https://qr.vipps.no/28/2/01/031/4799229116?v=1">
                        <img src={LogoVipps} alt="" />
                        <span>Vipps</span>
                    </a>
                    <a target="_blank" href="https://paypal.me/jaredisaksen?country.x=NO&locale.x=no_NO">
                        <img src={LogoPaypal} alt="" />
                        <span>PayPal</span>
                    </a>
                    <a target="_blank" href="twint://recipient=0797977686">
                        <img src={LogoTwint} alt="" />
                        <span>TWINT</span>
                    </a>
                </div>
                <p>or contact us if you want to contribute in some other way</p>
            </div>
            <div 
                className="thanks thanks__container"
                style={['thanks'].includes(_activeFormStep) ? {} : {display: 'none'}}
            >
                <img src={GiftImage} alt="" />

                <br/>
                <p style={_userAttendance ? {} : {display: 'none'}}>
                    We appreciate you taking time to fill this out.
                    Looking forward to seeing you soon
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


