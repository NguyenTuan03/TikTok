import React from 'react'
import {Link} from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './AccountItem.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faEllipsis} from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import PopperReport from '../PoperWrap/PopperReport/PopperReport'
import Popper from '../PoperWrap/PopperWrap/Popper'
import { Image } from '../image/Image'
import propTypes from 'prop-types'
const cx = classNames.bind(styles)
export default function AccountItem({data}) {
    AccountItem.propTypes = {
        data: propTypes.object
    }
    return (
    <Link to={`./@${data.nickname}`} className={cx('wrapper')}>
        <Image 
            alt={data.full_name}
            className={cx('avatar')} 
            src={data.avatar}
        />
        <div className={cx('Info')}>
            <span className={cx('Name')}>
                <span>{data.last_name}</span>
                {data.tick && <FontAwesomeIcon className={cx('name-icon')} icon={faCircleCheck}/>}
            </span>
            <span className={cx('user-name')}>{data.full_name}</span>
        </div>
        <Tippy
            delay={[0,300]}
            interactive 
            placement='bottom-end' 
            render={attr => (
                <div className={cx('menu')} tabIndex={-1} {...attr}>
                    <PopperReport/>
                </div>
            )}>     
            <div className={cx('report')}>
                <FontAwesomeIcon icon={faEllipsis}/>
            </div>
        </Tippy>
    </Link>
  )
}
