import { Box, Stack } from "@mui/material";
import images from "../../../public/assets/Images";
import Search from "../../component/search/Search";
import { Link, useNavigate } from "react-router-dom";
import routesConfig from "../../config/Routes";
import React, { useContext, useState } from "react";
import LogIn from "../../pages/logIn/LogIn";
import UserAvatar from "../../component/avatar/UserAvatar";
import { MessageIcon, SendIcon } from "../../component/icon/Icon";
import Button from "../../component/button/Button";
import ElipsesMenu from "../../component/header/ElipsesMenu";
import UploadButton from "../../component/header/UploadButton";
import { Auth } from "../../component/context/AuthContext";
const ICONS = [
    {
        icon: <SendIcon width="22px" height="22px"/>,
        to: routesConfig.home,
    },
    {
        icon: <MessageIcon width="28px" height="28px"/>,
        to: routesConfig.home,
    },
];
const Linkstyle = {
    marginRight: "18px",
    display: "block",
    color: "#000",
};
export default function Header() {
    const auth = useContext(Auth);
    const [open, setOpen] = useState(false);
    const handleOpenLoginModal = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const nav = useNavigate();
    return (
        <>
            <Box
                display={"flex"}
                height={"60px"}
                p={"0 24px 0 16px"}
                zIndex={999}
                bgcolor={"#fff"}
                borderBottom={"1px solid rgb(228 228 228)"}
            >
                <Stack
                    width={"100%"}
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Box
                        sx={{ cursor: "pointer" }}
                        onClick={() => nav(routesConfig.home)}
                    >
                        <img src={images.logo} />
                    </Box>
                    <Box>
                        <Search />
                    </Box>
                    <Box>
                        {auth.userAuth ? (
                            <Stack direction={"row"} alignItems={"center"}>
                                <UploadButton />
                                {ICONS.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Link style={Linkstyle}>
                                                {item.icon}
                                            </Link>
                                        </React.Fragment>
                                    );
                                })}
                                <UserAvatar />
                            </Stack>
                        ) : (
                            <Stack direction={"row"} alignItems={"center"}>
                                <Button primary={true} onClick={handleOpenLoginModal}>Log in</Button>
                                <ElipsesMenu />
                            </Stack>
                        )}
                    </Box>
                </Stack>
                <LogIn isOpen={open} handleClose={handleClose} />
            </Box>
        </>
    );
}
