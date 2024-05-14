import React from 'react'
import './AttendForm.scss'
import PersonFormStep from './PersonFormStep' 

import decorationRightSVG from '../../assets/decoration-green--right.svg'
import decorationLeftSVG from '../../assets/decoration-green--left.svg'
import FormNavbar from './components/FormNavbar'

export default function AttendForm() {

  function handelSubmit(e) {
    e.preventDefault()
  }

  return (
    <>
      <div className="attend-form--wrapper">
        <form className="attend-form" onSubmit={handelSubmit}>
          <div className="attend-form__content">
            <h2>Will you attend?</h2>
            <p>
              We have limited space, so please let us know by signing up before June 2nd so we can plan accordingly
            </p>
            <PersonFormStep />
            <FormNavbar />
          </div>
        </form>
        <img src={decorationLeftSVG} alt="" className="attend-form__branch--left no-pointer-event"/>
        <img src={decorationRightSVG} alt="" className="attend-form__branch--right no-pointer-event"/>
      </div>
    </>
  )
}
