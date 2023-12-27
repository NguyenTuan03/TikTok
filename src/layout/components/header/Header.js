import React, { useContext} from 'react'
import Button from '../../../Components/button/Button.js';

import 'tippy.js/dist/tippy.css'; 
import HeadlessTippy from '@tippyjs/react';

import classNames from 'classnames/bind'
import styles from './Header.module.scss'

import images from '../../../assets/Images/Images.js'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faEllipsisVertical, faLanguage, faCircleQuestion, faKeyboard, faUser, faVideo, faGear, faCoins, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'

import { Link, useNavigate } from 'react-router-dom';
import Menu from '../../../Components/PoperWrap/Menu/Menu.js';
import 'tippy.js/animations/scale.css';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
import { ThemeContext } from '../../../Components/changeTheme/ChangeTheme.js';
import { InboxIcon, UpLoadIcon } from '../../../Components/icons/Icon.js';
import { Image } from '../../../Components/image/Image.js';
import SearchBar from '../SearchBar/SearchBar.js';
import routesConfig from '../../../config/Routes.js'


const cx = classNames.bind(styles)
const currenUser = true;
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage}/>,
        name: 'English',
        children: {
            title:'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt'
                }
            ]
        }   
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion}/>,
        name: 'Feedback and Help',
        path: './feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}/>,
        name: 'Keyboard shortcuts',
    },
    {
        icon: <FontAwesomeIcon icon={faMoon}/>,
        name: 'Dark mode',
        input: <input type='checkbox'/>
    }
];
const USER_MENU  = [
    {
        icon: <FontAwesomeIcon icon={faUser}/>,
        name: 'view profile',
        path: './@Ttuan'
    },
    {
        icon: <FontAwesomeIcon icon={faCoins}/>,
        name: 'Get coins',
        path: './coin'
    },  
    {
        icon: <FontAwesomeIcon icon={faVideo}/>,
        name: 'Live studio',
        path: './studio'
    },  
    {
        icon: <FontAwesomeIcon icon={faGear}/>,
        name: 'Settings',
        path: './settings'
    },  
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket}/>,
        name: 'Log out',
        path: './logout',
        border: true
    },  
]
export default function Header() {
  const {theme} = useContext(ThemeContext);
  const nav = useNavigate(); 
  return (
    <header className={cx('container')}>
        <div className={cx('inner') + ' d-flex justify-content-between align-items-center'}>
            {/* Logo */}
            <div className={cx('logo')} onClick={() => nav(routesConfig.home)}>
                {(theme) ? <img className={cx('logo')} src={images.darkLogo} alt='TikTok'/> : <img className={cx('logo')} src={images.logo} alt='TikTok'/>}
            </div>
            {/* Search */}
            <SearchBar/>
            {/* Actions */}
            <div className={cx('actions') + ' d-flex align-items-center'}>
                {currenUser ? (
                        <div className={cx('current-user') + ' d-flex align-items-center'}>
                            <Link to={routesConfig.upload} className={cx('upload-btn') + ' border border-1 me-4 fs-4'}>
                                <FontAwesomeIcon className='me-2' icon={faPlus}/>
                                Tải lên
                            </Link>    
                            <HeadlessTippy delay={[0,200]} placement='bottom' content='Message'>
                                <button className={cx('cloud-icon')}>
                                    <UpLoadIcon />
                                </button>
                            </HeadlessTippy>
                            <HeadlessTippy delay={[0,200]} placement='bottom' content='Inbox'>
                                <button className={cx('message-icon')}>
                                    <InboxIcon />
                                </button>
                            </HeadlessTippy>
                        </div>
                    ) : (
                    <>
                        <Link to={'./upload'} className={cx('upload-btn') + ' border border-1 me-4 fs-4'}>
                            <FontAwesomeIcon className='me-2' icon={faPlus}/>
                            Tải lên
                        </Link>
                        <Button primary="true">
                            Login
                        </Button>
                    </>
                )}                
                    <>
                        <Menu items = {currenUser ? USER_MENU : MENU_ITEMS}>
                            {currenUser ? (
                                    <Image 
                                        className={cx('user-avatar')} 
                                        src='https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/5df85a846efbc97e38030a793178f94e~c5_720x720.jpeg?lk3s=a5d48078&x-expires=1703858400&x-signature=CwcO0gfSHoID7ZTCeLoyoqmKhak%3D'
                                        alt='Nguyen Anh Tuan' 
                                        // fallback='https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png'
                                    />  
                                ) : (
                                    <button className={cx('menu-btn') + ' p-2 border-0 ms-5 fs-4 align-items-center'}>
                                    <FontAwesomeIcon icon={faEllipsisVertical}/>
                                    </button>
                                )
                            }
                        </Menu>
                    </>
            </div>
        </div>
    </header>
  )
}
