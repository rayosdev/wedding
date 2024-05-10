import React from 'react'
import PropTypes from 'prop-types'
import Header from './components/Header'
import Attend from './components/Attend'
import When from './components/When'
import Where from './components/Where'
import EndSection from './components/EndSection'

function Layout(props) {
  return (
    <>
      <Header />
      <Attend />
      <When />
      <Where />
      <EndSection />
    </>
  )
}

Layout.propTypes = {}

export default Layout
