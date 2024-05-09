import React from 'react'
import PropTypes from 'prop-types'
import './Header.scss'

function Header(props) {
  return (
    <>
        <header className="header">
            <div className="header__fixed-wrapper">
              <div className="header__content container">
                <h1>
                    <span>Jared & Jeannine</span>    
                    <span>Wedding Party</span>
                    <hr />
                    <span className="header__dafe">August 3<sub>rd</sub></span>
                </h1>
              </div>
            </div>
        </header>
    </>
  )
}

Header.propTypes = {}

export default Header
