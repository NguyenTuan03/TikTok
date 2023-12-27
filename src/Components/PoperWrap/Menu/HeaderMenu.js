import React from 'react'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
const cx = classNames.bind(styles);
export default function HeaderMenu({title, backBtn}) {
  HeaderMenu.propTypes = {
    title: PropTypes.string.isRequired,
    backBtn: PropTypes.func.isRequired
  }
  return (
    <div className={cx('header-menu')}>
        <span className={cx('back-icon')}>
            <FontAwesomeIcon icon={faChevronLeft} onClick={backBtn}/>
        </span>
        <h4 className={cx('title') }>{title}</h4>
    </div>
  )
}
