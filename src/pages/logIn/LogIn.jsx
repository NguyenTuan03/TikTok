import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { FaQrcode } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLine } from "react-icons/fa";
import React, { useState } from "react";
import SystemLogin from "../../component/Auth/login/SystemLogin";
import SystemSignUp from "../../component/Auth/signup/SystemSignUp";
import { scrollbar } from "./../../style/scrollbar/ScrollBar";
import { loginStyle } from "../../style/LoginModal/LoginModal";
const scrollbarStyle = scrollbar;
const SIGNUP_MENU = [
    {
        id: 2,
        name: "Use phone/email/username",
        icon: <CiUser />,
        type: "signup",
    },
    {
        id: 3,
        name: "Continue with Facebook",
        icon: <FaFacebook />,
        type: "signup",
        disabled: true,
    },
    {
        id: 4,
        name: "Continue with Google",
        icon: <FcGoogle />,
        type: "signup",
        disabled: true,
    },
    {
        id: 5,
        name: "Continue with Twitter",
        icon: <FaTwitter />,
        type: "signup",
        disabled: true,
    },
];
const LOGIN_MENU = [
    {
        id: 1,
        name: "Use QR code",
        icon: <FaQrcode />,
        type: "login",
    },
    ...SIGNUP_MENU.map((item) => ({ ...item, type: "login" })),
    {
        id: 6,
        name: "Continue with Line",
        icon: <FaLine />,
        type: "login",
        disabled: true,
    },
    {
        id: 7,
        name: "Continue with Apple",
        icon: <FaApple />,
        type: "login",
        disabled: true,
    },
];
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
                            {isLogin
                                ? LOGIN_MENU.map((item) => {
                                      return (
                                          <React.Fragment key={item.id}>
                                              <button
                                                  onClick={() => {
                                                      setSelectedCategoryId({
                                                          id: item.id,
                                                          type: item.type,
                                                      });
                                                      setIsTerms(false);
                                                  }}
                                                  disabled={
                                                      item.disabled
                                                          ? true
                                                          : false
                                                  }
                                                  style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      border: "1px solid",
                                                      borderColor:
                                                          "rgba(22, 24, 35, 0.12)",
                                                      borderRadius: "8px",
                                                      marginBottom: "12px",
                                                      width: "100%",
                                                      height: "44px",
                                                      cursor: item.disabled
                                                          ? "not-allowed"
                                                          : "pointer",
                                                      "&:hover":
                                                          !item.disabled && {
                                                              border: "1px solid rgb(208 209 211)",
                                                              backgroundColor:
                                                                  "rgb(241 241 242)",
                                                          },
                                                      paddingLeft: "20px",
                                                  }}
                                              >
                                                  <Box>{item.icon}</Box>
                                                  <Box
                                                      style={{
                                                          flex: 1,
                                                          textAlign: "center",
                                                      }}
                                                  >
                                                      {item.name}
                                                  </Box>
                                              </button>
                                          </React.Fragment>
                                      );
                                  })
                                : SIGNUP_MENU.map((item) => {
                                      return (
                                          <React.Fragment key={item.id}>
                                              <button
                                                  onClick={() => {
                                                      setSelectedCategoryId({
                                                          id: item.id,
                                                          type: item.type,
                                                      });
                                                      setIsTerms(false);
                                                  }}
                                                  disabled={
                                                      item.disabled
                                                          ? true
                                                          : false
                                                  }
                                                  style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      border: "1px solid",
                                                      borderColor:
                                                          "rgba(22, 24, 35, 0.12)",
                                                      borderRadius: "8px",
                                                      marginBottom: "12px",
                                                      width: "100%",
                                                      height: "44px",
                                                      cursor: item.disabled
                                                          ? "not-allowed"
                                                          : "pointer",
                                                      "&:hover":
                                                          !item.disabled && {
                                                              border: "1px solid rgb(208 209 211)",
                                                              backgroundColor:
                                                                  "rgb(241 241 242)",
                                                          },
                                                      paddingLeft: "20px",
                                                  }}
                                              >
                                                  <Box>{item.icon}</Box>
                                                  <Box
                                                      style={{
                                                          flex: 1,
                                                          textAlign: "center",
                                                      }}
                                                  >
                                                      {item.name}
                                                  </Box>
                                              </button>
                                          </React.Fragment>
                                      );
                                  })}
                        </Box>
                    ) : (
                        <Box>{renderCategoryContent()}</Box>
                    )}
                    {
                        isTerms && 
                        <Typography
                            textAlign={"center"}
                            fontSize={"10px"}
                            mt={"20px"}
                            mb={2}
                            px={4}
                        >
                            By continuing with an account located in Vietnam, you
                            agree to our Terms of Service and acknowledge that you
                            have read our Privacy Policy.
                        </Typography>
                    }
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
                                setIsTerms(true)
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
