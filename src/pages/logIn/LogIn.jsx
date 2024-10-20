import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import SystemLogin from "../../component/Auth/login/SystemLogin";
import SystemSignUp from "../../component/Auth/signup/SystemSignUp";
import { scrollbar } from "./../../style/scrollbar/ScrollBar";
import { loginStyle } from "../../style/LoginModal/LoginModal";
import LoginModal from "./../../component/Auth/login/LoginModal";
import SignUpModal from "../../component/Auth/signup/SignUpModal";
const scrollbarStyle = scrollbar;
export default function LogIn({ isOpen, handleClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [selectedCategoryId, setSelectedCategoryId] = useState({});
    const [isTerms, setIsTerms] = useState(true);
    const renderCategoryContent = () => {
        if (selectedCategoryId.type === "login") {
            switch (selectedCategoryId.id) {
                case 2:
                    return <SystemLogin handleCloseModal={handleCloseModal} />;
                default:
                    return null;
            }
        } else if (selectedCategoryId.type === "signup") {
            switch (selectedCategoryId.id) {
                case 2:
                    return <SystemSignUp />;
                default:
                    return null;
            }
        }
    };
    const handleCloseModal = () => {
        handleClose();
        setIsLogin(true);
    };
    return (
        <Modal
            open={isOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    TransitionComponent: Fade,
                },
            }}
        >
            <Fade in={isOpen}>
                <Box width={"100%"} border={"none"} sx={loginStyle}>
                    <Typography
                        textAlign={"center"}
                        fontWeight={"bold"}
                        id="modal-modal-title"
                        variant="h3"
                        component="h1"
                        mb={"30px"}
                    >
                        {isLogin ? "Log in to" : "Sign up for"} TikTok
                    </Typography>
                    {!selectedCategoryId.id ? (
                        <Box height={"250px"} sx={scrollbarStyle} pr={2}>
                            {isLogin ? (
                                <LoginModal
                                    setSelectedCategoryId={
                                        setSelectedCategoryId
                                    }
                                    setIsTerms={setIsTerms}
                                />
                            ) : (
                                <SignUpModal
                                    setSelectedCategoryId={
                                        setSelectedCategoryId
                                    }
                                    setIsTerms={setIsTerms}
                                />
                            )}
                        </Box>
                    ) : (
                        <Box>{renderCategoryContent()}</Box>
                    )}
                    {isTerms && (
                        <Typography
                            textAlign={"center"}
                            fontSize={"10px"}
                            mt={"20px"}
                            mb={2}
                            px={4}
                        >
                            By continuing with an account located in Vietnam,
                            you agree to our Terms of Service and acknowledge
                            that you have read our Privacy Policy.
                        </Typography>
                    )}
                    <Typography
                        pt={2}
                        width={"100%"}
                        mt={"30px"}
                        fontSize={"12px"}
                        textAlign={"center"}
                        borderTop={"1px solid rgb(227 227 228)"}
                        sx={{ cursor: "pointer" }}
                    >
                        {isLogin
                            ? "Don't have an account?"
                            : "Already have an account?"}
                        <a
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setSelectedCategoryId({});
                                setIsTerms(true);
                            }}
                            style={{ color: "rgb(254 44 85)" }}
                        >
                            {isLogin ? " Sign up" : " Log in"}
                        </a>
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    );
}
LogIn.propTypes = {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
};
