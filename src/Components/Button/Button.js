import React from 'react'
import classnames from 'classnames/bind'
import styles from './Button.module.scss'
import {Link} from 'react-router-dom'
const cx = classnames.bind(styles)
export default function Button({righticon, lefticon, large, small, outline, primary, to, href, children, onClick,...passProps}) {
    let Comp = 'button'
    const props = {
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
      large
    })
    if (to) {
      props.to = to
      Comp = Link
    }
    else if (href) {
      props.href = href
      Comp = 'a'
    }
    return (
        <>
            <Comp className ={classes} {...props}>
                {lefticon && <span className={cx('icon')}>{lefticon}</span>}
                <span className={cx('title')}>{children}</span>
                {righticon && <span className={cx('icon')}>{righticon}</span>}
            </Comp>
        </>
    )
}
