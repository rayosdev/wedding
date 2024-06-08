import React from 'react'
import './Attend.scss'
import AttendForm from './Attend/AttendForm'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

import decorationRightSVG from '../assets/decoration-green--right.svg'
import decorationLeftSVG from '../assets/decoration-green--left.svg'

import { useStore } from '../store'



export default function Attend() {

  const {
    updateActiveFormStep,
    updateFormPath,
    updateGiftShowFromNav,
    updateUserPathHistory
  } = useStore()

  const observeElement = useIntersectionObserver(() => {
    document.querySelector('header').style.visibility = 'visible'
  })

  return (
    <section className="attend" ref={observeElement}>
      <nav className="nav-section">
        <ul>
          <li><a href='' onClick={e => { e.preventDefault()
            document.querySelector("#root > section.attend > div.container > div > form")
              .scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
            updateGiftShowFromNav(false)
          }}>Attend?</a></li>
          <li><a href='' onClick={e => { e.preventDefault()
            document.querySelector("#root > section.attend > div.container > div > form")
              .scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
            updateActiveFormStep('you')
            // updateFormPath(null)
            updateGiftShowFromNav(true)
          }}>Gifts</a></li>
          <li><a href='' onClick={e => { e.preventDefault()
            document.querySelector("#when > div.container > h2")
              .scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
          }}>When</a></li>
          <li><a href='' onClick={e => { e.preventDefault()
            document.querySelector("#root > section.where > div.container > h2")
              .scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
          }}>Where</a></li>
        </ul>
      </nav>
      <div className="container">
        <AttendForm />
      </div>
      <div className="decoration-container">
        <img loading="lazy" src={decorationLeftSVG} alt="" className="attend__branch--left no-pointer-event"/>
        <img loading="lazy" src={decorationRightSVG} alt="" className="attend__branch--right no-pointer-event"/>
      </div>
    </section>
  )
}
