import React from 'react'
import './GlobalStyle.scss'
import PropTypes from 'prop-types'
export default function GlobalStyle({children}) {
  GlobalStyle.propTypes = {
    children: PropTypes.node.isRequired
  }
  return (
    React.Children.only(children)
  )
}
