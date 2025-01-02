import { Box, Modal, Stack, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import Button from "../button/Button";
import { useContext } from "react";
import { Auth } from "../context/AuthContext";
import { LOGOUT_STYLE } from './../../const/LOGOUT_STYLE';
export default function LogOut() {
    LogOut.propTypes = {
        isOpen: PropTypes.bool,
        handleClose: PropTypes.func
    }
    const auth = useContext(Auth);
    const handleLogOut = () => {
        auth.logoutUser();
        window.location.reload();
        handleClose();
    }
    const { openFormLogout,setOpenFormLogout } = useContext(Auth);
    const handleClose = () => setOpenFormLogout(false);    
    return (
        <>
            <Modal
                open={openFormLogout}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={LOGOUT_STYLE}>
                    <Typography sx={{fontWeight:"bold"}} px={4} mb={2} align="center" id="modal-modal-title" variant="h4" component="div">
                        Are you sure you want to log out?
                    </Typography>
                    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={2}>
                        <Button style={{display:"block", width:"100%", padding:"14px 10px"}} monochrome onClick={handleClose}>Cancel</Button>
                        <Button style={{display:"block", width:"100%", padding:"14px 10px"}} outline onClick={handleLogOut}>Log out</Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}
