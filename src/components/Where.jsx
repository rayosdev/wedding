import React from 'react'
import './Where.scss'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

import pappaSrc from '../assets/pappa-contact.jpg'
import branchSrc from '../assets/decoration.svg'
import churchSrc from '../assets/church.jpg'
import mapSrc from '../assets/map.jpg'
import locationPinGreenSrc from '../assets/location-pin-green.svg'
import locationPinWhiteSrc from '../assets/location-pin-white.svg'

export default function Where() {


    const observeElement = useIntersectionObserver(() => {
        document.querySelector('header').style.visibility = 'hidden'
    })

    return (
        <section className="where" ref={observeElement}>
            <div className="container">
                <h2>Where?</h2>
                <div className="where__text-content">
                    <p>
                        <b>
                            The Church of Jesus Christ
                            of Latter-day Saints
                        </b><br/>
                        <span>
                            Ulefossvegen 2<br />
                            3730 Skien<br />
                            Norway
                        </span>
                    </p>
                    <div className="where__text-content__contact-info content">
                        <div className="content__pappa-contact">
                            <img loading="lazy" src={pappaSrc} alt="" className="no-pointer-event" />
                        </div>

                        <p className="content__top-text">
                            If you need help with directions feel free to contact Rolf Isaksen
                        </p>

                        <div className="content__item-container">
                            <div className="content__item item">
                                <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.0004 0.666992H1.80039C1.03039 0.666992 0.407391 1.29699 0.407391 2.06699L0.400391 10.467C0.400391 11.237 1.03039 11.867 1.80039 11.867H13.0004C13.7704 11.867 14.4004 11.237 14.4004 10.467V2.06699C14.4004 1.29699 13.7704 0.666992 13.0004 0.666992ZM13.0004 3.46699L7.40039 6.96699L1.80039 3.46699V2.06699L7.40039 5.56699L13.0004 2.06699V3.46699Z"
                                        fill="#515D3C" />
                                </svg>
                                <p className="item__type">Email:</p>
                                <a href="mailto:rolfidarisaksen@gmail.com?subject=Wedding%20questions">
                                rolfidarisaksen@gmail.com </a>
                            </div>
                            <div className="content__item item">
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_1650_4592)">
                                        <path
                                            d="M5.2734 0.535156C4.86497 0.535156 4.47326 0.694456 4.18445 0.978011C3.89565 1.26157 3.7334 1.64615 3.7334 2.04716V15.1512C3.7334 15.5522 3.89565 15.9367 4.18445 16.2203C4.47326 16.5039 4.86497 16.6632 5.2734 16.6632H12.4601C12.8685 16.6632 13.2602 16.5039 13.549 16.2203C13.8378 15.9367 14.0001 15.5522 14.0001 15.1512V2.04716C14.0001 1.64615 13.8378 1.26157 13.549 0.978011C13.2602 0.694456 12.8685 0.535156 12.4601 0.535156H5.2734ZM7.84007 12.6312H9.8934C10.0295 12.6312 10.1601 12.6843 10.2564 12.7788C10.3526 12.8733 10.4067 13.0015 10.4067 13.1352C10.4067 13.2688 10.3526 13.397 10.2564 13.4915C10.1601 13.5861 10.0295 13.6392 9.8934 13.6392H7.84007C7.70392 13.6392 7.57335 13.5861 7.47708 13.4915C7.38081 13.397 7.32673 13.2688 7.32673 13.1352C7.32673 13.0015 7.38081 12.8733 7.47708 12.7788C7.57335 12.6843 7.70392 12.6312 7.84007 12.6312Z"
                                            fill="#515D3C" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1650_4592">
                                            <rect width="16.8" height="16.8" fill="white" transform="translate(0 0.200195)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p className="item__type">Mobile/WhatsApp:</p>
                                <a href="tel:+47 915 62 746">
                                    +47 915 62 746
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="where__decoration-branch">
                <img loading="lazy" src={branchSrc} alt="" className="no-pointer-event" />
            </div>
            <div className="where__church-image">
                <img loading="lazy" src={churchSrc} alt="" className="no-pointer-event" />
            </div>
            <div className="where__map-image">
                {/* <div className="where__map-image_content"> */}
                <a className="where__map-image_content" target="_blank" href="https://www.google.com/maps/place/Ulefossvegen+2,+3730+Skien/@59.1979251,9.6070981,17z/data=!4m6!3m5!1s0x464721261ec6fc21:0x9399ea4507bd7bfc!8m2!3d59.1974755!4d9.6099327!16s%2Fg%2F11cp951t8k?entry=tts&g_ep=EgoyMDI0MDUwNS4wKgBIAVAD">
                        <span>Location</span>
                        <img loading="lazy" className="where__map-image_location-pin-white no-pointer-event" src={locationPinWhiteSrc} alt="" />
                    </a>
                {/* </div> */}
                <img loading="lazy" className="where__map-image_main no-pointer-event" src={mapSrc} alt="" />
                <img loading="lazy" className="where__map-image_location-pin-green no-pointer-event" src={locationPinGreenSrc} alt="" />
            </div>
            <a className="where__map-image_sub-link" target="_blank" href="https://www.google.com/maps/place/Ulefossvegen+2,+3730+Skien/@59.1979251,9.6070981,17z/data=!4m6!3m5!1s0x464721261ec6fc21:0x9399ea4507bd7bfc!8m2!3d59.1974755!4d9.6099327!16s%2Fg%2F11cp951t8k?entry=tts&g_ep=EgoyMDI0MDUwNS4wKgBIAVAD">
                Ulefossvegen 2, 3730 Skien
            </a>
        </section>
    )
}
