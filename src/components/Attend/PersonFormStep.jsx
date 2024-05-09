import React from 'react'
import RadioGroup from './components/RadioGroup'

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

    const handelClick = (e) => console.log("test__", e)

    return (
        <>
            <RadioGroup {...radioGroupProps} handelClick={handelClick} />
        </>
    )
}
