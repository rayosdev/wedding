import React from 'react'
import PropTypes from 'prop-types'
import Header from './components/Header'
import Attend from './components/Attend'
import When from './components/When'

function Layout(props) {
  return (
    <>
    <Header />
    <Attend />
    <When />
    </>
  )
}

Layout.propTypes = {}

export default Layout
