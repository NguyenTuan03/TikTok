import { CiDark, CiSettings, CiUser } from "react-icons/ci";
import routesConfig from "../config/Routes";
import { FaTiktok } from "react-icons/fa6";
import { RiHome8Line } from "react-icons/ri";
import { TbMessageLanguage } from "react-icons/tb";
import { GoQuestion } from "react-icons/go";
import { LuLogOut } from "react-icons/lu";

export const USER_MENU = [
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