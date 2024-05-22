import React, { useEffect } from 'react'
import './AttendForm.scss'
import PersonFormStep from './PersonFormStep' 

import decorationRightSVG from '../../assets/decoration-green--right.svg'
import decorationLeftSVG from '../../assets/decoration-green--left.svg'
import FormNavbar from './components/FormNavbar'
import { EFormPath, useStore } from '../../store'

export default function AttendForm() {


  const {
    _userAttendance,
    _userName,
    _userEmail,
    _activeFormStep,
    _formPath,
    _userHasCrew,
    updateFormPath
  } = useStore()

  const formPathHasCrewPhase = () => {
    if(_userHasCrew == false) updateFormPath(EFormPath.JUST_ME)
    if(_userHasCrew == true) updateFormPath(EFormPath.ME_AND_CREW)
  }

  useEffect(() => {
    if(_userAttendance == false) updateFormPath(EFormPath.CANT_COME)
    else {
      updateFormPath(null)
      if(_userHasCrew != null) formPathHasCrewPhase()
    }
    
    
  }, [_userAttendance])
  
  useEffect(() => {
    formPathHasCrewPhase()
    
  }, [_userHasCrew])
  

  function handelSubmit(e) {
    e.preventDefault()
  }

  return (
    <>
      <div className="attend-form--wrapper">
        <form className="attend-form" onSubmit={handelSubmit}>
          <div className="attend-form__content">
            {_activeFormStep == 'you' && 
              <h2>Will you attend?</h2>
            }
            {_activeFormStep == 'group' && 
              <h2>Yes, I’m attending</h2>
            }
            {(_activeFormStep == 'you' || _activeFormStep == 'group') && 
              <p>
                We have limited space, so please let us know by signing up before June 2nd so we can plan accordingly
              </p>
            }
            {_activeFormStep == 'food' && 
              <h2>Glorious food</h2>
            }
            {(_activeFormStep == 'food') && 
              <p>
                We will have a Potluck (a buffet where guests bring foods) Would you like to contribute?
              </p>
            }
            {(_activeFormStep == 'program') &&
              <>
                <h2>Add to the program</h2>
                <p>
                  Do you want to join in and entertain us <br/>e.g with a speech, a music number etc.?
                </p>
              </> 
            }
            {(_activeFormStep == 'gift') &&
              <>
                <h2>Wanna surprise us with a gift?</h2>
              </> 
            }
            {(_activeFormStep == 'thanks') &&
              <>
                <h2>Thank for your response</h2>
              </> 
            }
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
