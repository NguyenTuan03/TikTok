import Tippy from '@tippyjs/react/headless'
import React from 'react'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import Popper from '../Popper'
import MenuData from './MenuData'

const cx = classNames.bind(styles);
export default function Menu({items = [] , children}) {
  return (
    <Tippy
        delay={[0,500]}
        interactive 
        placement='bottom-end' 
        render={attr => (
            <div className={cx('menu')} tabIndex={-1} {...attr}>
                <Popper>
                    {items.map((item,i) => {
                        return <MenuData key={i} data={item}/>
                    })}
                </Popper>
            </div>
        )}>
        {children}
    </Tippy>
  )
}
