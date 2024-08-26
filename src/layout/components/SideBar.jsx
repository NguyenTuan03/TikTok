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
import { useContext, useEffect, useState } from "react";
import { Auth } from "../../component/accountItem/AuthContext";
import { useNavigate } from "react-router-dom";
import { getFollowing } from "../../services/GetFollowing";
import AccountItem from "../../component/accountItem/AccountItem";
import { scrollbar } from "./../../style/scrollbar/ScrollBar";
export default function SideBar() {
    const auth = useContext(Auth);
    const [followingList, setFollowingList] = useState();
    const [childrenListId, setChildrenListId] = useState(null);
    const category = [
        {
            id: 1,
            name: "For You",
            icon: <IoMdHome fontSize={"22px"} />,
            path: routesConfig.home,
        },
        {
            id: 2,
            name: "Explore",
            icon: <IoCompassOutline fontSize={"22px"} />,
            path: routesConfig.profile,
        },
        {
            id: 3,
            name: "Following",
            icon: <LuUserPlus fontSize={"22px"} />,
            path: routesConfig.home,
        },
        {
            id: 4,
            name: "Friends",
            icon: <GoPeople fontSize={"22px"} />,
            path: routesConfig.home,
        },
        {
            id: 5,
            name: "Live",
            icon: <HiOutlineVideoCamera fontSize={"22px"} />,
            path: routesConfig.home,
        },
        {
            id: 6,
            name: "Profile",
            icon: (
                <Avatar
                    style={{ width: "22px", height: "22px" }}
                    alt={auth?.userAuth?.data?.nickname}
                    src={auth?.userAuth?.data?.avatar}
                />
            ),
            path: routesConfig.home,
        },
    ];
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
    const nav = useNavigate();
    useEffect(() => {
        async function getFollowingList() {
            const result = await getFollowing(auth?.userAuth?.meta?.token);
            setFollowingList(result);
            console.log(result.data);
        }
        getFollowingList();
    }, []);
    const toggleItem = (itemId) => {
        setChildrenListId(prevId => (prevId === itemId ? null : itemId));
      };
    return (
        <>
            <Box sx={{ scrollbar }}>
                <Stack direction={"column"} justifyContent={"center"}>
                    {category.map((item) => {
                        return (
                            <Stack
                                onClick={() => nav(item.path)}
                                sx={{
                                    cursor: "pointer",
                                    ":hover": {
                                        backgroundColor: "rgb(248 248 248)",
                                    },
                                }}
                                key={item.id}
                                direction={"row"}
                                justifyContent={"flex-start"}
                                p={"12px 12px 12px 20px"}
                                alignItems={"center"}
                            >
                                <Typography
                                    width={"22px"}
                                    lineHeight={"100%"}
                                    height={"22px"}
                                    mr={"12px"}
                                >
                                    {item.icon}
                                </Typography>
                                <Typography variant="h6" fontWeight={"bold"}>
                                    {item.name}
                                </Typography>
                            </Stack>
                        );
                    })}
                </Stack>
                <Divider />
                <Typography pl={"20px"} my={1.5} fontWeight={"bold"}>
                    Following accounts
                </Typography>
                {followingList?.data?.map((item, index) => {
                    return (
                        <>
                            <AccountItem
                                key={index}
                                data={item}
                                width={"22px"}
                                height={"22px"}
                                p={"4px 12px 0 20px"}
                                mb={"0"}
                            />
                        </>
                    );
                })}
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
                        <>
                            <Typography
                                key={item.id}
                                p={"4px 12px 0 20px"}                                
                                mb={1}
                                color={childrenListId === item.id ? "rgb(22 24 35)" :"rgb(138 139 145)"}
                                sx={{ cursor: "pointer"}}
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
                                            key={index}
                                            variant="body2"
                                            p={"0px 12px 0 0"}                                            
                                            sx={{ cursor: "pointer",":hover": {
                                                textDecoration:"underline"
                                            } }}
                                        >
                                            {child.name}
                                        </Typography>
                                    ))}
                                </Stack>
                            )}
                        </>
                    );
                })}
                <Typography mt={5} ml={"20px"} variant="caption">© 2024 TikTok</Typography>
            </Box>
        </>
    );
}
