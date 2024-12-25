/* eslint-disable react/prop-types */
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
} from "@mui/material";

export default function Allow({stateAllowed}) {
    const [setAllowed] =stateAllowed;
    const handleChange = (e) => {
        if (e.target.checked) {
            setAllowed((prev) => {
                return prev.includes(e.target.value)
                    ? prev
                    : [...prev, e.target.value];
            });
        } else {
            setAllowed((prev) =>
                prev.filter((item) => item !== e.target.value)
            );
        }
    };    
    return (
        <Box>
            <Typography fontSize={"16px"}>Allow</Typography>
            <FormGroup
                row
                sx={{
                    "& .PrivateSwitchBase-input": {
                        position: "unset",
                        appearance: "unset",
                        display: "none",
                    },
                    "& .MuiFormControlLabel-label": {
                        fontSize: "16px",
                    },
                }}
                onChange={(e) => handleChange(e)}                
            >
                <FormControlLabel
                    value={"comment"}
                    control={<Checkbox />}
                    label="comment"
                />
                <FormControlLabel
                    value={"duet"}
                    control={<Checkbox />}
                    label="duet"
                />
                <FormControlLabel
                    value={"stitch"}
                    control={<Checkbox />}
                    label="stitch"
                />
            </FormGroup>
        </Box>
    );
}
