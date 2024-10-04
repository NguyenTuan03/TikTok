import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);
export default function  Button({
    input,
    rightIcon,
    leftIcon,
    large,
    hover,
    small,
    outline,
    primary,
    monochrome,
    fullWidth,
    disabled,
    center,
    to,
    href,
    children,
    mt,
    whitebg,
    ...passProps
}) {
    let Component = "button";
    const props = {
        input,
        rightIcon,
        leftIcon,
        outline,
        center,
        primary,
        monochrome,
        disabled,
        fullWidth,
        to,
        mt,
        href,
        whitebg,
        hover,
        children,
        ...passProps,
    };
    const style = {
        marginTop: mt && `${mt}px`,
        display: (leftIcon || rightIcon) ? "flex" : "inline-block",
        alignItems: (leftIcon || rightIcon) && "center" ,
    };
    let classes = cx("wrapper", {
        center,
        primary,
        monochrome,
        outline,
        disabled,
        hover,
        large,
        fullWidth,
        small,
        whitebg,
        mt,
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
        rightIcon: PropTypes.node,
        leftIcon: PropTypes.node,
        outline: PropTypes.bool,
        large: PropTypes.bool,
        fullWidth: PropTypes.bool,
        small: PropTypes.bool,
        center: PropTypes.bool,
        primary: PropTypes.bool,
        whitebg: PropTypes.bool,
        monochrome: PropTypes.bool,
        disabled: PropTypes.bool,
        hover: PropTypes.bool,
        to: PropTypes.string,
        href: PropTypes.string,
        mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };
    return (
        <>
            <Component style={style} className={classes} {...props}>
                {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
                <span className={cx("title")}>{children}</span>
                {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
            </Component>
        </>
    );
}
