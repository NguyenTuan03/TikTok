/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
export default function ShowTippy({ children, content, arrow = true,placement="top"  }) {
    return (
        <>
            <Tippy                                          
                placement={placement}
                arrow={arrow} 
                render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        <Box>
                            {content}
                        </Box>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </>
    );
}
