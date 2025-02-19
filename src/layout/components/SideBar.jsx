import {
    Avatar,
    Box,
    CardMedia,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import { IoMdHome } from "react-icons/io";
import { IoCompassOutline } from "react-icons/io5";
import { LuUserPlus } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { HiOutlineVideoCamera } from "react-icons/hi";
import routesConfig from "../../config/Routes";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountItem from "../../component/accountItem/AccountItem";
import { scrollbar } from "./../../style/scrollbar/ScrollBar";
import Button from "../../component/button/Button";
import LogIn from "../../pages/logIn/LogIn";
import { getFollowing } from "./../../services/follow/GetFollowing";
import { Auth } from "../../component/context/AuthContext";
const rules = [
    {
        id: 1,
        name: "Company",
        children: [
            {
                name: "About",
                path: routesConfig.home,
            },
            {
                name: "Newsroom",
                path: routesConfig.home,
            },
            {
                name: "Contact",
                path: routesConfig.home,
            },
            {
                name: "Careers",
                path: routesConfig.home,
            },
        ],
    },
    {
        id: 2,
        name: "Program",
        children: [
            {
                name: "TikTok for Good",
                path: routesConfig.home,
            },
            {
                name: "Advertise",
                path: routesConfig.home,
            },
            {
                name: "TikTok LIVE Creator Network",
                path: routesConfig.home,
            },
            {
                name: "Developers",
                path: routesConfig.home,
            },
            {
                name: "Transparency",
                path: routesConfig.home,
            },
            {
                name: "TikTok Rewards",
                path: routesConfig.home,
            },
            {
                name: "TikTok Embeds",
                path: routesConfig.home,
            },
        ],
    },
    {
        id: 3,
        name: "Terms and Policies",
        children: [
            {
                name: "Help",
                path: routesConfig.home,
            },
            {
                name: "Safety",
                path: routesConfig.home,
            },
            {
                name: "Terms",
                path: routesConfig.home,
            },
            {
                name: "Privacy Policy",
                path: routesConfig.home,
            },
            {
                name: "Privacy Center",
                path: routesConfig.home,
            },
            {
                name: "Cretor Academy",
                path: routesConfig.home,
            },
            {
                name: "Community Guidelines",
                path: routesConfig.home,
            },
        ],
    },
];
export default function SideBar() {
    const auth = useContext(Auth);
    const [followingList, setFollowingList] = useState();
    const [childrenListId, setChildrenListId] = useState(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(0)    
    const category = [
        {
            id: 1,
            name: "For You",
            icon: <IoMdHome fontSize={"32px"} />,
            path: routesConfig.home,
        },
        {
            id: 2,
            name: "Explore",
            icon: <IoCompassOutline fontSize={"32px"} />,
            path: routesConfig.profile,
        },
        {
            id: 3,
            name: "Following",
            icon: <LuUserPlus fontSize={"32px"} />,
            path: routesConfig.following,
        },
        {
            id: 4,
            name: "Friends",
            icon: <GoPeople fontSize={"32px"} />,
            path: routesConfig.home,
        },
        {
            id: 5,
            name: "Live",
            icon: <HiOutlineVideoCamera fontSize={"32px"} />,
            path: routesConfig.home,
        },
        {
            id: 6,
            name: "Profile",
            icon: (
                <Avatar
                    style={{ width: "32px", height: "32px" }}
                    alt={auth?.userAuth?.data?.nickname}
                    src={auth?.userAuth?.data?.avatar}
                />
            ),
            path: `/@${auth?.userAuth?.data?.nickname}`,
        },
    ];
    const nav = useNavigate();
    useEffect(() => {
        async function getFollowingList() {
            try {
                const result = await getFollowing(auth?.userAuth?.meta?.token);
                setFollowingList(result);
            } catch (error) {
                console.error(error);
            }
        }
        getFollowingList();
    }, []);
    const toggleItem = (itemId) => {
        setChildrenListId((prevId) => (prevId === itemId ? null : itemId));
    };
    const handleLogin = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    return (
        <>
            <Box sx={{ scrollbar }}>
                <Stack direction={"column"} justifyContent={"center"}>
                    {category.map((item,index) => {
                        return (
                            <React.Fragment key={item.id}>
                                <Stack
                                    onClick={() =>{
                                        nav(item.path)
                                        setSelected(index)                                        
                                    }} 
                                    sx={{
                                        cursor: "pointer",
                                        ":hover": {
                                            backgroundColor: "rgb(248 248 248)",
                                        },
                                    }}
                                    color={selected === index ? "red" : "#000"}
                                    direction={"row"}
                                    justifyContent={"flex-start"}
                                    p={"12px 12px 12px 20px"}
                                    alignItems={"center"}
                                    width={"100%"}
                                >
                                    <Typography
                                        component={"span"}                                        
                                        lineHeight={"100%"}                                        
                                        mr={"12px"}
                                    >
                                        {item.icon}
                                    </Typography>
                                    <Typography
                                        component={"span"}
                                        variant="h6"
                                        fontWeight={"bold"}
                                        fontSize={"18px"}
                                    >
                                        {item.name}
                                    </Typography>
                                </Stack>
                            </React.Fragment>
                        );
                    })}
                </Stack>
                <Divider />
                {!auth?.userAuth ? (
                    <>
                        <Box pl={"20px"} my={2} px={3}>
                            <Typography component={"span"} variant="h6" mb={2}>
                                Log in to follow creators, like videos, and view
                                comments.
                            </Typography>
                            <Button
                                outline
                                fullwidth={true}
                                onClick={handleLogin}
                                mt={"20px"}
                            >
                                Log in
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Box py={"16px"}>
                        <Typography
                            component={"span"}
                            pl={"20px"}
                            my={1.5}
                            fontWeight={"bold"}
                            fontSize={"14px"}
                        >
                            Following accounts
                        </Typography>
                        {followingList?.data?.length ? (
                            followingList.data.map((item) => (
                                <React.Fragment key={item.id}>
                                    <AccountItem
                                        data={item}
                                        width={"32px"}
                                        height={"32px"}
                                        p={"4px 12px 8px 20px"}
                                        mb={"0"}
                                    />
                                </React.Fragment>
                            ))
                        ) : (
                            <Typography pl={"20px"} mt={2} color={"gray"}>
                                No following accounts found.
                            </Typography>
                        )}
                    </Box>
                )}
                <Divider sx={{ marginTop: "12px" }} />
                <Box position={"relative"}>
                    <CardMedia
                        sx={{
                            borderRadius: "6px",
                            scale: "0.7",
                            marginLeft: "-16px",
                        }}
                        height={"55px"}
                        component={"img"}
                        image="/assets/tiktokAward.png"
                    />
                    <Typography
                        component={"span"}
                        position={"absolute"}
                        color={"rgb(250 240 197)"}
                        top={"50%"}
                        left={"65px"}
                        width={"45%"}
                        sx={{ transform: "translateY(-50%)" }}
                    >
                        Create TikTok effects, get a reward
                    </Typography>
                </Box>
                {rules?.map((item) => {
                    return (
                        <React.Fragment key={item.id}>
                            <Typography
                                component={"div"}
                                p={"4px 12px 0 20px"}
                                fontSize={"15px"}
                                mb={1}
                                color={
                                    childrenListId === item.id
                                        ? "rgb(22 24 35)"
                                        : "rgb(138 139 145)"
                                }
                                sx={{ cursor: "pointer" }}
                                onClick={() => toggleItem(item.id)}
                            >
                                {item.name}
                            </Typography>
                            {childrenListId === item.id && (
                                <Stack
                                    flexWrap={"wrap"}
                                    direction={"row"}
                                    alignItems={"center"}
                                    ml={"20px"}
                                >
                                    {item.children.map((child, index) => (
                                        <Typography
                                            component={"span"}
                                            key={index}
                                            fontSize={"12px"}
                                            p={"0px 12px 0 0"}
                                            sx={{
                                                cursor: "pointer",
                                                ":hover": {
                                                    textDecoration: "underline",
                                                },
                                            }}
                                        >
                                            {child.name}
                                        </Typography>
                                    ))}
                                </Stack>
                            )}
                        </React.Fragment>
                    );
                })}
                <Typography
                    component={"span"}
                    fontSize={"12px"}
                    mt={5}
                    ml={"20px"}
                    variant="caption"
                >
                    © 2024 TikTok
                </Typography>
            </Box>
            <LogIn isOpen={open} handleClose={handleClose} />
        </>
    );
}
