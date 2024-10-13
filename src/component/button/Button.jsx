/* eslint-disable react/prop-types */
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);
export default function  Button({
    input,
    righticon,
    lefticon,
    large,
    hover,
    small,
    outline,
    primary,
    monochrome,
    fullwidth,
    disabled,
    center,
    to,
    href,
    children,
    mt,
    whitebg,
    width,
    height,
    color,
    ...passProps
}) {
    let Component = "button";
    const props = {
        input,
        righticon,
        lefticon,
        outline,
        center,
        monochrome,
        disabled,
        fullwidth,
        to,
        mt,
        href,
        color,
        whitebg,
        hover,
        children,
        ...passProps,
    };
    const style = {
        marginTop: mt && `${mt}px`,
        display: (lefticon || righticon) ? "flex" : "inline-block",
        alignItems: (lefticon || righticon) && "center" ,
        color: color && `${color} !important`,
        width: width && `${width}`,
        height: height && `${height}`
    };
    let classes = cx("wrapper", {
        center,
        primary,
        monochrome,
        outline,
        disabled,
        hover,
        large,
        fullwidth,
        small,
        whitebg,
        mt,
        Link
    });
    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = "a";
    }
    Button.propTypes = {
        children: PropTypes.node.isRequired,
        input: PropTypes.node,
        righticon: PropTypes.node,
        lefticon: PropTypes.node,
        outline: PropTypes.bool,
        large: PropTypes.bool,
        fullwidth: PropTypes.bool,
        center: PropTypes.bool,
        whitebg: PropTypes.bool,
        monochrome: PropTypes.bool,
        disabled: PropTypes.bool,
        hover: PropTypes.bool,
        to: PropTypes.string,
        primary: PropTypes.bool,
        href: PropTypes.string,
        mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        width: PropTypes.string,
        height: PropTypes.string,
        color: PropTypes.string,
    };
    return (
        <>
            <Component style={style} className={classes} {...props}>
                {lefticon && <span className={cx("icon")}>{lefticon}</span>}
                <span className={cx("title")}>{children}</span>
                {righticon && <span className={cx("icon")}>{righticon}</span>}
            </Component>
        </>
    );
}
