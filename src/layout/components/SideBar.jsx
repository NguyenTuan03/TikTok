import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { IoMdHome } from "react-icons/io";
import { IoCompassOutline } from "react-icons/io5";
import { LuUserPlus } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { HiOutlineVideoCamera } from "react-icons/hi";
import routesConfig from "../../config/Routes";
import { useContext } from "react";
import { Auth } from "../../component/accountItem/AuthContext";
import { useNavigate } from "react-router-dom";
export default function SideBar() {
    const auth = useContext(Auth);
    const category = [
        {
            id: 1,
            name: "For You",
            icon: <IoMdHome fontSize={"22px"}/>,
            path: routesConfig.home,
        },
        {
            id: 2,
            name: "Explore",
            icon: <IoCompassOutline fontSize={"22px"}/>,
            path: routesConfig.profile,
        },
        {
            id: 3,
            name: "Following",
            icon: <LuUserPlus fontSize={"22px"}/>,
            path: routesConfig.home,
        },
        {
            id: 4,
            name: "Friends",
            icon: <GoPeople fontSize={"22px"}/>,
            path: routesConfig.home,
        },
        {
            id: 5,
            name: "Live",
            icon: <HiOutlineVideoCamera fontSize={"22px"}/>,
            path: routesConfig.home,
        },
        {
            id: 6,
            name: "Profile",
            icon: (
                <Avatar
                    style={{width:"22px", height:"22px"}}
                    alt={auth.userAuth.data.nickname}
                    src={auth.userAuth.data.avatar}
                />
            ),
            path: routesConfig.home,
        },
    ];
    const nav = useNavigate();
    return (
        <>
            <Box>
                <Stack direction={"column"} justifyContent={"center"}>
                    {category.map((item) => {
                        return (
                            <Stack onClick={() => nav(item.path)} sx={{cursor:"pointer",":hover":{
                                backgroundColor:"rgb(248 248 248)"
                            } }} key={item.id} direction={"row"} justifyContent={"flex-start"} p={"12px"} alignItems={"center"}>
                                <Typography width={"22px"} lineHeight={"100%"} height={"22px"} mr={"12px"}>
                                    {item.icon}
                                </Typography>
                                <Typography variant="h6" fontWeight={"bold"}>{item.name}</Typography>
                            </Stack>
                        );
                    })}
                </Stack>
                <Divider orientation="horizontal" variant="middle" flexItem />
            </Box>
        </>
    );
}
