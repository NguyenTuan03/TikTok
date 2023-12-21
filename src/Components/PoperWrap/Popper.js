import React from 'react'
import classNames from 'classnames/bind'
import styles from './Popper.module.scss'

const cx = classNames.bind(styles);
export default function Popper({children}) {
  return (
    <div className={cx('PopperWrap')}>
        {children}
    </div>
  )
}
