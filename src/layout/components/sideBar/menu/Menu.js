import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
export default function Menu({children}) {
    const cx = classNames.bind(styles)
    Menu.propTypes = {
        children: PropTypes.node.isRequired
    }
    return (
        <nav className={cx('wrapper')}>
            {children}
        </nav>
    )
}
