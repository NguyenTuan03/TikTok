import React from 'react'
import classNames from 'classnames/bind'
import styles from './Popper.module.scss'
import PropTypes from 'prop-types'
const cx = classNames.bind(styles);
export default function Popper({className,children}) {
  Popper.propTypes = {
    children:PropTypes.node.isRequired,
    className: PropTypes.string
  }
  return (
    <div className={cx('PopperWrap', className)}>
        {children}
    </div>
  )
}
