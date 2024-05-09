import React from 'react'
import PropTypes from 'prop-types'
import Header from './components/Header'
import Attend from './components/Attend'

function Layout(props) {
  return (
    <>
    <Header />
    <Attend />
    </>
  )
}

Layout.propTypes = {}

export default Layout
