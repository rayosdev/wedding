import React, { useState } from 'react'
import RadioGroup from './components/RadioGroup'
import './PersonFormStep.scss'

import { _userAttendance, _userEmail, _userName } from '../../store'
import FormInput from './components/FormInput'

const radioGroupProps = {
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


export default function PersonFormStep() {

    const [showNameAndEmail, setShowNameAndEmail] = useState(false)
    const [showGroupStatus, setShowGroupStatus] = useState(false)

    const handelChange = (e) => {
        if(e.target.value.includes("yes")) _userAttendance.value = true
        else _userAttendance.value = false
        setShowNameAndEmail(true)
    }
    
    const handelUserInfo = (e) => {
        return
        const felid = e.target.value
        if(felid.value != ""){
            if(felid.type == 'name') _userName.value = felid.value
            else if(felid.type == 'email') _userEmail.value = felid.value
        }
        if (_userName.value != "" && _userEmail.value != ""){
            setShowGroupStatus(true)
        }
    }


    return (
        <>
            <div className="user-attend">
                <RadioGroup 
                    {...radioGroupProps} 
                    handelChange={handelChange} 
                />
            </div>
            <div className="person-info" style={showNameAndEmail ? {} : {display: 'none'}}>
                <FormInput 
                    type="text" 
                    name="user:name" 
                    label="Name"
                    autocomplete="name"
                    onChange={handelUserInfo}
                />
                <FormInput 
                    type="email" 
                    name="user:emails" 
                    label="Email"
                    autocomplete="email"
                    onChange={handelUserInfo}
                />
            </div>
        </>
    )
}


