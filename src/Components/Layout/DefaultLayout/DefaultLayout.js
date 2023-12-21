import React from 'react'
import SideBar from './SideBar/SideBar'
import Header from '../components/Header/Header'
import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
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
