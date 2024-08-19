import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);
export default function Button({
    input,
    rightIcon,
    leftIcon,
    large,
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
        children,
        ...passProps,
    };
    const style = {
        marginTop: mt && `${mt}px`
    }
    let classes = cx("wrapper", {
        center,
        primary,
        monochrome,
        outline,
        disabled,
        large,
        fullWidth,
        small,
        mt
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
        monochrome: PropTypes.bool,
        disabled: PropTypes.bool,
        to: PropTypes.string,
        href: PropTypes.string,
        mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };
    return (
        <>
            <Component style={style} className={classes} {...props}>
                <span className={cx("title")}>{children}</span>
            </Component>
        </>
    );
}
