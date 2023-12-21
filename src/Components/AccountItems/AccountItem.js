import React from 'react'
import classNames from 'classnames/bind'
import styles from './AccountItem.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faEllipsis} from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import PopperReport from '../PoperWrap/PopperReport/PopperReport'
import Popper from '../PoperWrap/Popper'
const cx = classNames.bind(styles)
export default function AccountItem() {
  return (
    <div className={cx('wrapper')}>
        <img className={cx('avatar')} src='https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/2f0debaa1e88b937620dbef621cb9d9b~c5_300x300.webp?x-expires=1703253600&x-signature=gs4d4SAxupQhVyb48d%2BdG4C%2BtOc%3D'/>
        <div className={cx('Info')}>
            <span className={cx('Name')}>
                <span>Hoaa</span>
                <FontAwesomeIcon className={cx('name-icon')} icon={faCircleCheck}/>
            </span>
            <span className={cx('user-name')}>Nguyen Anh Tuan</span>
        </div>
        <Tippy
            interactive 
            placement='bottom-end' 
            render={attr => (
                <div className={cx('menu')} tabIndex={-1} {...attr}>
                    <Popper>
                        <PopperReport/>
                    </Popper>
                </div>
            )}>     
            <div className={cx('report')}>
                <FontAwesomeIcon icon={faEllipsis}/>
            </div>
        </Tippy>
    </div>
  )
}
