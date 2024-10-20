import { AppleIcon, LineIcon, QrIcon } from "../component/icon/Icon";
import { SIGNUP_MENU } from "./SIGNUP_MENU";

export const LOGIN_MENU = [
    {
        id: 1,
        name: "Use QR code",
        icon: <QrIcon />,
        type: "login",
    },
    ...SIGNUP_MENU.map((item) => ({ ...item, type: "login" })),
    {
        id: 6,                            
        name: "Continue with Line",
        icon: <LineIcon />,
        type: "login",
        disabled: true,
    },
    {
        id: 7,
        name: "Continue with Apple",
        icon: <AppleIcon />,
        type: "login",
        disabled: true,
    },
];
