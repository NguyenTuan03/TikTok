import PropTypes from "prop-types";

export default function GlobalStyle({ children }) {
    GlobalStyle.propTypes = {
        children: PropTypes.node,
    };
    return <>{children}</>;
}
