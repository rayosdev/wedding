import React from 'react'
import PropTypes from 'prop-types'
import './Header.scss'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

function Header(props) {

  const observeElement = useIntersectionObserver(() => {
    document.querySelector('header').style.visibility = 'visible'
  })

  return (
    <>
      <header className="header" ref={observeElement}>
            <div className="header__fixed-wrapper">
              <div className="header__content container">
                <h1>
                    <span>Jared & Jeannine</span>    
                    <span>Wedding Party</span>
                    <hr />
                    <span>August 3<sub>rd</sub></span>
                </h1>
              </div>
            </div>
        </header>
    </>
  )
}

Header.propTypes = {}

export default Header
