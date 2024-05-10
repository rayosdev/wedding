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
            <PersonFormStep />
            <img src={branchWingsDecor} alt="" srcset="" />
          </div>
        </form>
    </>
  )
}
