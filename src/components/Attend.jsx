import React from 'react'
import './Attend.scss'
import AttendForm from './Attend/AttendForm'
import useIntersectionObserver from '../hooks/useIntersectionObserver'





export default function Attend() {

  const observeElement = useIntersectionObserver(() => {
    document.querySelector('header').style.visibility = 'visible'
  })

  return (
    <section className="attend" ref={observeElement}>
      <div className="container">
        <AttendForm />
      </div>
    </section>
  )
}
