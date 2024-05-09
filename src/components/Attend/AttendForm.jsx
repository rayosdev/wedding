import React from 'react'
import './AttendForm.scss'
import PersonFormStep from './PersonFormStep'

export default function AttendForm() {
  return (
    <>
        <form className='attend-form'>
          <div className="attend-form__content">
            <h2>Will you attend?</h2>
            <PersonFormStep />
          </div>
        </form>
    </>
  )
}
