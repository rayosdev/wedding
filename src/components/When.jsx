import React, { useEffect, useRef, useState } from 'react'
import './When.scss'

import decorationSVG from '../assets/decoration-green.svg'

import JJ01Image from '../assets/J&J-01.jpg'
import JJ02Image from '../assets/J&J-02.jpg'
import JJ03Image from '../assets/J&J-03.jpg'
import JJ04Image from '../assets/J&J-04.jpg'
import JJ05Image from '../assets/J&J-05.jpg'

import { updateCountdown } from '../utils'


export default function When() {

    const firstRender = useRef(false)
    const [countdownString, setCountdownString] = useState("")
    const imageSequence = [JJ01Image, JJ02Image, JJ03Image, JJ04Image, JJ05Image]
    
    const dateInterval = useRef(null)

    useEffect(() => {
        if(dateInterval.current == null){ 
            dateInterval.current = setInterval(() => setCountdownString(updateCountdown()), 1000)
        }
    }, [])
    
    useEffect(() => {
    }, [countdownString])

    return (
        <section className="when">
            <div className="container">
                <h2>When?</h2>
                <p>August 3rd  at  15:00</p>

                <h3 className="when__countdown">
                    {countdownString}
                </h3>
                <p>... left until the party starts!</p>
            </div>
            <div className="when__background-decoration">
                <img className="when__background-decoration_image no-pointer-event" src={decorationSVG} alt="" />
            </div>
            <div className="when__bottom-image-sequence">
                {imageSequence.map(imgSrc => (
                    <div key={imgSrc} className="when__bottom-image-sequence_wrapper no-pointer-event">
                        <img src={imgSrc} alt="" />
                    </div>
                ))}
            </div>
        </section>
    )
}
