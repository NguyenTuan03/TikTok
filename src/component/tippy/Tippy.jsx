/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import Tippy from "@tippyjs/react/headless";
import { forwardRef } from "react";
import "tippy.js/dist/tippy.css";
const ShowTippy = forwardRef(({ children, content, arrow = true, placement = "top" }, ref) => {
    return (
        <Tippy
            placement={placement}
            arrow={arrow}
            render={(attrs) => (
                <div className="box" tabIndex="-1" {...attrs}>
                    <div ref={ref}>
                        {content}
                    </div>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
});

export default ShowTippy;
