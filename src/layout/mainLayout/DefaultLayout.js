import React from 'react'
import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
import Header from '../components/header/Header'
import SideBar from '../components/sideBar/SideBar'
const cx = classNames.bind(styles)
export default function DefaultLayout({children}) {
  return (
    <div className={cx('wrapper')}>
        <Header/>
        <div className={cx('container')}>
            <SideBar/>
            <div className={cx('content')}>
                {children}
            </div>
        </div>
    </div>
  )
}
