import React from 'react'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'
export default function MenuItem({title, to, icon}) {
    MenuItem.propTypes = {
        title: PropTypes.string,
        to:PropTypes.string,
        icon: PropTypes.node
    }
    const cx = classNames.bind(styles);
    return (
        <NavLink to={to} className={(nav) => cx('menu-item', {
            active: nav.isActive
        })}>
            {icon}
            <span className={cx('title')}>{title}</span>
        </NavLink>
    )
}
