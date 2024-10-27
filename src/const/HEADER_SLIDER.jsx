export const HEADER_SLIDER = {
    position: "absolute",
    left: "13px",
    top: "-3px",
    width: "38px",
    color: "rgba(0,0,0,0.87)",
    "& .MuiSlider-rail": {
        backgroundColor: "#fff",
    },
    "& .MuiSlider-track": {
        border: "none",
        backgroundColor: "#fff",
    },
    "& .MuiSlider-thumb": {
        width: 12,
        height: 12,
        backgroundColor: "#fff",
        "&::before": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
        },
        "&:hover, &.Mui-focusVisible, &.Mui-active": {
            boxShadow: "none",
        },
    },
};
