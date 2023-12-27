import Tippy from '@tippyjs/react/headless'
import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import Popper from '../PopperWrap/Popper'
import MenuData from './MenuData'
import 'tippy.js/animations/scale.css';
import HeaderMenu from './HeaderMenu'
import PropTypes from 'prop-types'
const cx = classNames.bind(styles);
export default function Menu({items = [] , hideOnClick = false, children}) {
    const [listMenu, setListMenu] = useState([{data: items}])
    const curMenu = listMenu[listMenu.length - 1];    
    Menu.propTypes = {
        items: PropTypes.array,
        hide: PropTypes.bool,
        children: PropTypes.node.isRequired
    }
    return (
    <Tippy  
        hideOnClick={hideOnClick}
        onHide={() => setListMenu([listMenu[0]])}
        delay={[0,500]}
        interactive 
        placement='bottom-end' 
        render={attr => (
            <div className={cx('menu')} tabIndex={-1} {...attr}>
                <Popper>
                    {listMenu.length > 1 && <HeaderMenu backBtn={() => {
                        setListMenu(prev => prev.slice(0, listMenu.length-1))
                    }} title={curMenu.title}/>}
                    <div className={cx('menu-body')}>
                        {curMenu.data.map((item,i) => {
                            const isParent =  !!item.children;
                            return <MenuData border={item.border} key={i} data={item} onClick={() => {
                                if (isParent) {
                                    setListMenu(prev => [...prev, item.children]) 
                                }
                            }}/>
                        })}
                    </div>
                </Popper>
            </div>
        )}>
        {children}
    </Tippy>
  )
}
