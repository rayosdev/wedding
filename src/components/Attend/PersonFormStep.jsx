import React, { useState } from 'react'
import RadioGroup from './components/RadioGroup'
import './PersonFormStep.scss'

import { userAttendance, userEmail, userName } from '../../store'
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
        if(e.target.value.includes("yes")) userAttendance.value = true
        else userAttendance.value = false
        setShowNameAndEmail(true)
    }
    
    const handelUserInfo = (e) => {
        const felid = e.target.value
        if(felid.value != ""){
            if(felid.type == 'name') userName.value = felid.value
            else if(felid.type == 'name') userEmail.value = felid.value
        }
        if (userName.value != "" && userEmail.value != ""){
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
