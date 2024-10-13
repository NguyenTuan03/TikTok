import { Box, Modal, Stack, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import Button from "../button/Button";
import { useContext } from "react";
import { Auth } from "../accountItem/AuthContext";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    borderRadius:"8px",
    p: 3,
};
export default function LogOut({isOpen, handleClose}) {
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
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography sx={{fontWeight:"bold"}} p={"0 50px"} mb={2} align="center" id="modal-modal-title" variant="h4" component="span">
                    Are you sure you want to log out?
                </Typography>
                <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={2}>
                    <Button monochrome fullwidth onClick={handleClose}>Cancel</Button>
                    <Button fullwidth outline onClick={handleLogOut}>Log out</Button>
                </Stack>
            </Box>
        </Modal>
    );
}
