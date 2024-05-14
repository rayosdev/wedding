import React from 'react'
import './EndSection.scss'

import JJ01Src from '../assets/J&J-end-01.jpg'
import JJ02Src from '../assets/J&J-end-02.jpg'
import branchSrc from '../assets/end-branch.svg'

export default function EndSection() {
    return (
        <section className="end">
            <div className="container">
                <h2>“We’re looking forward to celebrate with you”</h2>
            </div>
            <div className="end__image-wrapper">
                <img src={branchSrc} alt="" className="no-pointer-event" />
                <div className="end__image-wrapper_container">
                    <img src={JJ01Src} alt="" className="no-pointer-event" />
                    <img src={JJ02Src} alt="" className="no-pointer-event" />
                </div>
            </div>
        </section>
    )
}
