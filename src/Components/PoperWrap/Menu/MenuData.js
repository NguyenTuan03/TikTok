import React from 'react'
import Button from '../../button/Button'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import PropTypes from 'prop-types'
const cx = classNames.bind(styles)
export default function MenuData({data, onClick, border}) { 
    const classes = cx('menu-items', {
        border
    })
    MenuData.propTypes = {
        data: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        border: PropTypes.bool
    }
    return (
      <>
          <Button className={classes} onClick={onClick} input={data.input} lefticon={data.icon} to={data.path}>
                {/* Cấp 1*/}
                {data.name}  
                {/* Cấp 2*/}
                {data.title}          
          </Button>
      </>
    )
}
