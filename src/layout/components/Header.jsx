import { Box, Stack, Typography } from "@mui/material";
import images from "../../../public/assets/Images";
import { GoPlus } from "react-icons/go";
import Search from "../../component/search/Search";
import { Link } from "react-router-dom";
import routesConfig from "../../config/Routes";
import { BsSend } from "react-icons/bs";
import { RiMessageFill } from "react-icons/ri";
import { useContext, useState } from "react";
import { Auth } from "../../component/accountItem/AuthContext";
import { FaEllipsisV } from "react-icons/fa";
import Tippy from "@tippyjs/react/headless";
import { BsHouse } from "react-icons/bs";
import { LiaLanguageSolid } from "react-icons/lia";
import { MdOutlineQuestionMark } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";
import LogIn from "../../pages/logIn/LogIn";
import UserAvatar from "../../component/avatar/UserAvatar";
const MENU = [
    {
        id: 1,
        name: "Creator tools",
        icon: <BsHouse />,
    },
    {
        id: 2,
        name: "English",
        icon: <LiaLanguageSolid />,
    },
    {
        id: 3,
        name: "FeedBack and help",
        icon: <MdOutlineQuestionMark />,
    },
    {
        id: 4,
        name: "Dark mode",
        icon: <FaRegMoon />,
    },
];
export default function Header() {
    const auth = useContext(Auth);
    console.log(auth.userAuth);
    const [open, setOpen] = useState(false);
    const handleOpenLoginModal = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Box display={"flex"} height={"60px"} p={"0 24px 0 16px"}>
                <Stack
                    width={"100%"}
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Box>
                        <img src={images.logo} />
                    </Box>
                    <Box>
                        <Search />
                    </Box>
                    <Box>
                        {auth.userAuth ? (
                            <Stack direction={"row"} alignItems={"center"}>
                                <Link
                                    to={routesConfig.upload}
                                    style={{
                                        color: "rgb(99 100 107)",
                                        textDecoration: "none",
                                        display: "block",
                                        marginRight: "30px",
                                    }}
                                >
                                    <Box
                                        display={"flex"}
                                        alignItems={"center"}
                                        borderColor={
                                            "rgba(22, 24, 35, 0.12) !important"
                                        }
                                        border={"1px solid"}
                                        p={"4px 12px"}
                                    >
                                        <GoPlus />
                                        <Typography
                                            fontWeight={"bold"}
                                            ml={"12px"}
                                        >
                                            Upload
                                        </Typography>
                                    </Box>
                                </Link>
                                <Link
                                    style={{
                                        marginRight: "18px",
                                        display: "block",
                                        width: "20px",
                                        height: "20px",
                                        color: "rgb(99 100 107)",
                                    }}
                                >
                                    <BsSend
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </Link>
                                <Link
                                    style={{
                                        marginRight: "18px",
                                        display: "block",
                                        width: "20px",
                                        height: "20px",
                                        color: "rgb(99 100 107)",
                                    }}
                                >
                                    <RiMessageFill
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </Link>
                                <UserAvatar/>
                            </Stack>
                        ) : (
                            <Stack direction={"row"} alignItems={"center"}>
                                <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    borderColor={
                                        "rgba(22, 24, 35, 0.12) !important"
                                    }
                                    border={"1px solid"}
                                    p={"4px 20px"}
                                    borderRadius={"4px"}
                                    bgcolor={"rgb(254, 44, 85)"}
                                    color={"#fff"}
                                    fontSize={"10px"}
                                    sx={{ cursor: "pointer" }}
                                    onClick={handleOpenLoginModal}
                                >
                                    <Typography fontWeight={"bold"}>
                                        Log in
                                    </Typography>
                                </Box>
                                <Box ml={"18px"}>
                                    <Tippy
                                        delay={[0, 300]}
                                        interactive
                                        moveTransition="all 0.2s ease-out"
                                        placement="bottom-start"
                                        render={(attrs) => (
                                            <div
                                                className="box"
                                                tabIndex="-1"
                                                {...attrs}
                                            >
                                                <Box
                                                    display={"flex"}
                                                    flexDirection={"column"}
                                                    minWidth={"200px"}
                                                    width={"100%"}
                                                    p={"10px 0 10px 0px"}
                                                    maxHeight={"500px"}
                                                    borderRadius={"8px"}
                                                    overflow={"hidden auto"}
                                                    boxSizing={"border-box"}
                                                    boxShadow={
                                                        "rgba(0, 0, 0, 0.12) 0px 2px 12px"
                                                    }
                                                >
                                                    {MENU.map((item) => {
                                                        return (
                                                            <Stack
                                                                sx={{
                                                                    ":hover": {
                                                                        background:
                                                                            "#e5e3e354",
                                                                    },
                                                                }}
                                                                key={item.id}
                                                                direction={
                                                                    "row"
                                                                }
                                                                pl={"12px"}
                                                                alignItems={
                                                                    "center"
                                                                }
                                                                spacing={2}
                                                                py={1}
                                                            >
                                                                <div>
                                                                    {item.icon}
                                                                </div>
                                                                <div>
                                                                    {item.name}
                                                                </div>
                                                            </Stack>
                                                        );
                                                    })}
                                                </Box>
                                            </div>
                                        )}
                                    >
                                        <div>
                                            <FaEllipsisV />
                                        </div>
                                    </Tippy>
                                </Box>
                            </Stack>
                        )}
                    </Box>
                </Stack>
                <LogIn isOpen={open} handleClose={handleClose} />
            </Box>
        </>
    );
}
