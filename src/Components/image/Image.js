import {forwardRef, useState } from "react"
import images from "../../assets/Images/Images"
import styles from "./Image.module.scss"
import classNames from "classnames"
import PropTypes from 'prop-types'
export const Image = forwardRef(({src, alt,className, fallback = images.noImage, ...props},ref) => {
    const [_fallback, setFallBack] = useState('')
    Image.propTypes = {
        src : PropTypes.string,
        alt : PropTypes.string,
        className : PropTypes.string,
        fallback : PropTypes.string,
        ref : PropTypes.string,
    }
    return (
        <img 
            src={_fallback || src} 
            alt={alt} 
            ref={ref} 
            {...props} 
            onError={() => {
                setFallBack(fallback)
            }}
            className={classNames(styles.wrapper, className)}
        />
    )
})