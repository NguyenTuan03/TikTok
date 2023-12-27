import React, { useContext } from 'react'
import classnames from 'classnames/bind'
import styles from './Button.module.scss'
import {Link} from 'react-router-dom'
import {ThemeContext} from '../changeTheme/ChangeTheme.js'
import propsTypes from 'prop-types'
const cx = classnames.bind(styles)
export default function Button({input,righticon, lefticon, large, small,outline,primary,to,href,children,onClick,...passProps}) {
    const {toggleTheme} = useContext(ThemeContext);
    let Comp = 'button'
    const props = {
      input,
      righticon,
      lefticon,
      outline,
      primary,
      to,
      href,
      children,
      onClick,
      ...passProps,
    }
    let classes = cx('wrapper', {
      primary,
      outline,
      small,
      large,
      
    })
    if (to) {
      props.to = to
      Comp = Link
    }
    else if (href) {
      props.href = href
      Comp = 'a'
    }
    Button.propsTypes = {
      children: propsTypes.node.isRequired,
      input: propsTypes.node,
      righticon: propsTypes.node,
      lefticon: propsTypes.node,
      outline: propsTypes.bool,
      primary: propsTypes.bool,
      to: propsTypes.string,
      href: propsTypes.string,
      onClick: propsTypes.func,
    }
    return (
        <>
            <Comp className ={classes} {...props}>
                {lefticon && <span className={cx('icon')}>{lefticon}</span>}
                <span className={cx('title')}>{children}</span>
                {righticon && <span className={cx('icon')}>{righticon}</span>}
                {input && <span className={cx('input')}>
                             {<input type='checkbox' className='input-dark' onChange={toggleTheme}/>}
                          </span>
                }
            </Comp>
        </>
    )
}
