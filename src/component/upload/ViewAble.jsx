/* eslint-disable react/prop-types */
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";

export default function ViewAble({stateStatus}) {
    const [status, setStatus] = stateStatus;

    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    return (
        <Box>
            <Typography fontSize={"16px"}>Who can watch this video</Typography>
            <FormControl sx={{ mt: 1, minWidth: 340,border:"none", padding:0,outline:"none", "& .MuiSelect-select": {
                padding:"10px",
                outline: "none",
                border:"none",
                backgroundColor:"rgba(0, 0, 0, .05)",                
                ":hover": {
                    border:"transparent",
                }
            } }}>
                <Select
                    value={status}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{fontSize: "16px" , padding:0}}
                >                    
                    <MenuItem sx={{padding:"14px", fontSize:"16px"}} value={"public"}>Everyone</MenuItem>
                    <MenuItem sx={{padding:"14px", fontSize:"16px"}} value={"friends"}>Friends</MenuItem>
                    <MenuItem sx={{padding:"14px", fontSize:"16px"}} value={"private"}>Only you</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
