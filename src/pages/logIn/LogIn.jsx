import { Backdrop, Box, Fade, Modal, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { FaQrcode } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLine } from "react-icons/fa";
import { useState } from "react";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "380px",
    minHeight: "420px",
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "8px",
    boxShadow: 24,
    pt: 4,
    pb: 3,
};
const stack = {
    height: "44px",
    border: "1px solid",
    borderColor: "rgba(22, 24, 35, 0.12)",
    borderRadius: "8px",
    marginBottom: "12px",
    padding: "0 12px",
};
const SIGNUP_MENU = [
    {
        id: 2,
        name: "Use phone/email/username",
        icon: <CiUser />,
    },
    {
        id: 3,
        name: "Continue with Facebook",
        icon: <FaFacebook />,
    },
    {
        id: 4,
        name: "Continue with Google",
        icon: <FcGoogle />,
    },
    {
        id: 5,
        name: "Continue with Twitter",
        icon: <FaTwitter />,
    },
];
const LOGIN_MENU = [
    {
        id: 1,
        name: "Use QR code",
        icon: <FaQrcode />,
    },
    ...SIGNUP_MENU,
    {
        id: 6,
        name: "Continue with Line",
        icon: <FaLine />,
    },
    {
        id: 7,
        name: "Continue with Apple",
        icon: <FaApple />,
    },
];
export default function LogIn({ isOpen, handleClose }) {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
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
            <Box border={"none"}  sx={style}>
                <Typography
                    textAlign={"center"}
                    fontWeight={"bold"}
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                    mb={"50px"}
                >
                    {isLogin ? "Log in to" : "Sign up for"} TikTok
                </Typography>
                <Box height={"250px"} sx={{ overflowY: "scroll" }} px={4}>
                    {isLogin
                        ? LOGIN_MENU.map((item) => {
                              return (
                                  <>
                                      <Stack
                                          key={item.id}
                                          direction={"row"}
                                          alignItems={"center"}
                                          style={stack}
                                          sx={{
                                              cursor: "pointer",
                                              ":hover": {
                                                  border: "1px solid rgb(208 209 211)",
                                                  backgroundColor:
                                                      "rgb(241 241 242)",
                                              },
                                          }}
                                      >
                                          <div style={{ marginRight: "12px" }}>
                                              {item.icon}
                                          </div>
                                          <div
                                              style={{
                                                  flex: 1,
                                                  textAlign: "center",
                                              }}
                                          >
                                              {item.name}
                                          </div>
                                      </Stack>
                                  </>
                              );
                          })
                        : SIGNUP_MENU.map((item) => {
                              return (
                                  <>
                                      <Stack
                                          key={item.id}
                                          direction={"row"}
                                          alignItems={"center"}
                                          style={stack}
                                          sx={{
                                              cursor: "pointer",
                                              ":hover": {
                                                  border: "1px solid rgb(208 209 211)",
                                                  backgroundColor:
                                                      "rgb(241 241 242)",
                                              },
                                          }}
                                      >
                                          <div style={{ marginRight: "12px" }}>
                                              {item.icon}
                                          </div>
                                          <div
                                              style={{
                                                  flex: 1,
                                                  textAlign: "center",
                                              }}
                                          >
                                              {item.name}
                                          </div>
                                      </Stack>
                                  </>
                              );
                          })}
                </Box>
                <Typography
                    textAlign={"center"}
                    fontSize={"10px"}
                    my={2}
                    px={4}
                >
                    By continuing with an account located in Vietnam, you agree
                    to our Terms of Service and acknowledge that you have read
                    our Privacy Policy.
                </Typography>
                <Typography
                    pt={3}
                    fontSize={"12px"}
                    textAlign={"center"}
                    borderTop={"1px solid rgb(227 227 228)"}
                >
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    <a
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ color: "rgb(254 44 85)" }}
                    >
                        {isLogin ? " Sign up" : " Log in"}
                    </a>
                </Typography>
            </Box>
        </Modal>
    );
}
LogIn.propTypes = {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
};
