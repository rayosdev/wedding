import React, { useEffect, useRef } from 'react'
import './AttendForm.scss'
import PersonFormStep from './PersonFormStep' 

import decorationRightSVG from '../../assets/decoration-green--right.svg'
import decorationLeftSVG from '../../assets/decoration-green--left.svg'
import FormNavbar from './components/FormNavbar'
import { EFormPath, useStore } from '../../store'

export default function AttendForm() {

  const formRef = useRef(null)

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
      <div className="attend-form--wrapper" onClick={e => formRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
      })}>
        <form className="attend-form" onSubmit={handelSubmit} ref={formRef}>
          <div className="attend-form__content">
            {_activeFormStep == 'you' && 
              <h2>Will you attend?</h2>
            }
            {_activeFormStep == 'group' && 
              <h2>Yes, I’m attending</h2>
            }
            {(_activeFormStep == 'you' || _activeFormStep == 'group') && 
              <p>
                We have limited space, so please let us know by signing up before June 2<sup>nd</sup> so we can plan accordingly
              </p>
            }
            {_activeFormStep == 'food' && 
              <h2>Glorious food</h2>
            }
            {(_activeFormStep == 'food') && 
              <p>
                The food arrangements for the evening will be a type&nbsp;of Potluck <i>(people can bring food to share).</i>
              </p>
            }
            {(_activeFormStep == 'program') &&
              <>
                <h2>Add to the program</h2>
                <p>
                  If you would like to add to the program <br/>e.g with a speech, a music number etc. <br /> sign up below.
                </p>
              </> 
            }
            {(_activeFormStep == 'gift') &&
              <>
                <h2 className="header-text--gift">Wanna surprise us with a gift?</h2>
              </> 
            }
            {(_activeFormStep == 'done') &&
              <>
                <h2>Thank you!</h2>
              </> 
            }
            <PersonFormStep />
            <FormNavbar />
          </div>
        </form>
        <img loading="lazy" src={decorationLeftSVG} alt="" className="attend-form__branch--left no-pointer-event"/>
        <img loading="lazy" src={decorationRightSVG} alt="" className="attend-form__branch--right no-pointer-event"/>
      </div>
    </>
  )
}
