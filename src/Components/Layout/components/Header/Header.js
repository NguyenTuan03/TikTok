import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import Button from '../../../Button/Button.js';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; 
import classNames from 'classnames/bind'
import images from '../../../../assets/Images/Images.js'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass,faCircleXmark,faPlus, faPaperPlane, faMessage, faSpinner, faL, faSignIn, faEllipsisVertical, faLanguage, faQuestion, faCircleQuestion, faKeyboard} from '@fortawesome/free-solid-svg-icons'
import Popper from '../../../PoperWrap/Popper.js';
import AccountItem from '../../../AccountItems/AccountItem.js';
import { Link } from 'react-router-dom';
import Menu from '../../../PoperWrap/Menu/Menu.js';

const cx = classNames.bind(styles)
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage}/>,
        name: 'English'
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion}/>,
        name: 'Feedback and Help',
        path: './feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}/>,
        name: 'Keyboard shortcuts',
    }
];

export default function Header() {
  const [searchResult,setSearchResult] = useState([])
  useEffect(() => {
    setTimeout(() => {
      setSearchResult([1,2,3])
    },0)
  }, []);
  return (
    <header className={cx('container')}>
        <div className={cx('inner') + ' d-flex justify-content-between align-items-center'}>
            <img src={images.logo} alt='TikTok'/>
            <Tippy  interactive render={attr => (
                <div className={cx('search-result')} tabIndex={-1} {...attr}>
                    <Popper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        <AccountItem/>
                        <AccountItem/>
                        <AccountItem/>
                        <AccountItem/>
                        <AccountItem/>
                        <AccountItem/>
                    </Popper>
                </div>
            )}>
              <div className={cx('search') + ' position-relative d-flex align-items-center'}>
                  <input className={cx('search-input') + ' flex-grow-1'} placeholder='Search here...'/>
                  <FontAwesomeIcon className={cx('loading')} icon={faSpinner}/>
                  <button className={cx('clear')}>
                      <FontAwesomeIcon icon={faCircleXmark}/>
                  </button>
                  <button className={cx('search-btn')}>
                      <FontAwesomeIcon icon={faMagnifyingGlass}/>
                  </button>
              </div>
            </Tippy>
            <div className={cx('actions') + ' d-flex align-items-center'}>
                <Link to={'./upload'} className={cx('upload-btn') + ' border border-1 me-4 fs-4 bg-white'}>
                    <FontAwesomeIcon className='me-2' icon={faPlus}/>
                    Tải lên
                </Link>
                <Button primary="true">
                    Login
                </Button>
                <Menu items = {MENU_ITEMS}>
                    <button className={cx('menu-btn' + ' p-2 text-dark border-0 ms-5 fs-4 align-items-center bg-white')}>
                       <FontAwesomeIcon icon={faEllipsisVertical}/>
                    </button>
                </Menu>
            </div>
        </div>
    </header>
  )
}
