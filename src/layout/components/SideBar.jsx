import { Avatar, Box, Stack } from "@mui/material";
import { IoMdHome } from "react-icons/io";
import { IoCompassOutline } from "react-icons/io5";
import { LuUserPlus } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { HiOutlineVideoCamera } from "react-icons/hi";
import routesConfig from "../../config/Routes";
import { useContext } from "react";
import { Auth } from "../../component/accountItem/AuthContext";
export default function SideBar() {
    const auth = useContext(Auth);
    const category = [
        {
            id: 1,
            name: "For You",
            icon: <IoMdHome />,
            path: routesConfig.home,
        },
        {
            id: 2,
            name: "Explore",
            icon: <IoCompassOutline />,
            path: routesConfig.home,
        },
        {
            id: 3,
            name: "Following",
            icon: <LuUserPlus />,
            path: routesConfig.home,
        },
        {
            id: 4,
            name: "Friends",
            icon: <GoPeople />,
            path: routesConfig.home,
        },
        {
            id: 5,
            name: "Live",
            icon: <HiOutlineVideoCamera />,
            path: routesConfig.home,
        },
        {
            id: 6,
            name: "Profile",
            icon: (
                <Avatar
                    alt={auth.userAuth.data.nickname}
                    src={auth.userAuth.data.avatar}
                />
            ),
            path: routesConfig.home,
        },
    ];
    return (
        <>
            <Box>
                <Stack>
                    
                </Stack>
            </Box>
        </>
    )
}
