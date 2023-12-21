import React from 'react'
import Button from '../../Button/Button'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
export default function MenuData({data}) {
    const cx = classNames.bind(styles)
  return (
    <>
        <Button className={cx('menu-items')} lefticon={data.icon} to={data.path}>
            {data.name}
        </Button>
    </>
  )
}
