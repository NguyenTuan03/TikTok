import { Box, Stack, Typography } from "@mui/material";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { CiUser } from "react-icons/ci";
import { RiHome8Line } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { FaTiktok } from "react-icons/fa";
import { TbMessageLanguage } from "react-icons/tb";
import { CiDark } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { GoQuestion } from "react-icons/go";
import Avatar from "@mui/material/Avatar";
import routesConfig from "../../config/Routes";
import { useContext, useState } from "react";
import { Auth } from "../accountItem/AuthContext";
import { MdArrowBackIos } from "react-icons/md";
import LogOut from "../logOut/LogOut";
const USER_MENU = [
    {
        id: 1,
        name: "View profile",
        icon: <CiUser />,
        to: routesConfig.home,
    },
    {
        id: 2,
        name: "Get Coins",
        icon: <FaTiktok />,
        to: routesConfig.home,
    },
    {
        id: 3,
        name: "Creator tools",
        icon: <RiHome8Line />,
        to: routesConfig.home,
    },
    {
        id: 4,
        name: "Settings",
        icon: <CiSettings />,
        to: routesConfig.home,
    },
    {
        id: 5,
        name: "English",
        icon: <TbMessageLanguage />,
        to: routesConfig.home,
        children: {
            title: "Language",
            data: [
                {
                    id: 1,
                    code: "en",
                    name: "English",
                },
                {
                    id: 2,
                    code: "vi",
                    name: "Tiếng Việt",
                },
                {
                    id: 3,
                    code: "ja",
                    name: "日本",
                },
            ],
        },
    },
    {
        id: 6,
        name: "Feedback and help",
        icon: <GoQuestion />,
        to: routesConfig.home,
    },
    {
        id: 7,
        name: "Dark mode",
        icon: <CiDark />,
        to: routesConfig.home,
    },
    {
        id: 8,
        name: "Log out",
        icon: <LuLogOut />,
        to: routesConfig.home,
        isLogOut: true,
    },
];
export default function UserAvatar() {
    const auth = useContext(Auth);
    const [listMenu, setListMenu] = useState([{ data: USER_MENU }]);
    const [isLogOut, setIsLogOut] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const curMenu = listMenu[listMenu.length - 1];
    return (
        <>
            <Tippy
                placement="bottom-end"
                delay={[0, 500]}
                onHide={() => {
                    setListMenu([listMenu[0]])
                    setIsDisabled(false)
                }} 
                disabled={isDisabled}
                interactive
                moveTransition="all 0.2s ease-out"
                render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            minWidth={"200px"}
                            width={"100%"}
                            maxHeight={"500px"}
                            borderRadius={"8px"}
                            overflow={"hidden auto"}
                            boxSizing={"border-box"}
                            bgcolor={"#fff"}
                            boxShadow={"rgba(0, 0, 0, 0.12) 0px 2px 12px"}
                            zIndex={1}
                        >
                            {listMenu.length > 1 && (
                                <Stack
                                    p={"10px 0 10px 14px"}
                                    direction={"row"}
                                    alignItems={"center"}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <Typography
                                        onClick={() => {
                                            setListMenu((prev) =>
                                                prev.slice(0, listMenu.length - 1)
                                            );
                                        }}
                                        mr={2}
                                    >
                                        <MdArrowBackIos />
                                    </Typography>
                                    <Typography>{curMenu.title}</Typography>
                                </Stack>
                            )}
                            {curMenu.data.map((item) => {
                                const isParent = !!item.children;
                                const logOut = !!item.isLogOut;
                                return (
                                    <Stack
                                        sx={{
                                            ":hover": {
                                                background: "#e7e7e7",
                                            },
                                            cursor: "pointer",
                                        }}
                                        p={"10px 0 10px 14px"}
                                        key={item.id}
                                        direction={"row"}
                                        onClick={() => {
                                            if (isParent) {
                                                setListMenu((prev) => [
                                                    ...prev,
                                                    item.children,
                                                ]);
                                            }
                                            if (logOut) {
                                                setIsLogOut(true);
                                                setOpen(true);
                                                setIsDisabled(true);
                                            }
                                        }}
                                    >
                                        <Typography mr={2}>{item.icon}</Typography>
                                        <Typography>{item.name}</Typography>
                                    </Stack>
                                );
                            })}
                        </Box>
                    </div>
                )}
            >
                <Avatar
                    alt={auth.userAuth.data?.nickname}
                    src={auth.userAuth.data?.avatar}
                />
            </Tippy>
            {isLogOut && <LogOut isOpen={open} handleClose={handleClose}/>}
        </>
    );
}
