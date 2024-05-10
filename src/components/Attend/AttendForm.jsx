import React from 'react'
import './AttendForm.scss'
import PersonFormStep from './PersonFormStep'
import branchWingsDecor from '../../assets/decor-branch-wings.svg' 

export default function AttendForm() {
  return (
    <>
        <form className='attend-form'>
          <div className="attend-form__content">
            <h2>Will you attend?</h2>
            <p>Please let us know</p>
            <PersonFormStep />
            <img src={branchWingsDecor} alt="" />
          </div>
        </form>
    </>
  )
}
