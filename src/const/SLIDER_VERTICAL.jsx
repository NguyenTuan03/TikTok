export const SLIDER_VERTICAL = {
    position:"absolute",
    top:"50%",
    left:"50%",
    height:"70%",
    transform:"translate(-50%, -50%)",
    '& input[type="range"]': {
        WebkitAppearance: "slider-vertical",
    },
    '& .MuiSlider-rail': {
        backgroundColor:"#fff"
    },
    '& .MuiSlider-track': {
        border:"none",
        backgroundColor:"#fff"
    },
    '& .MuiSlider-thumb': {
        width:"14px",
        height:"14px",
        backgroundColor:"#fff"
    },
    '& .Mui-active': {
        boxShadow:"none !important",
    },
    '& .Mui-focusVisible': {
        boxShadow:"none !important",
    }
}