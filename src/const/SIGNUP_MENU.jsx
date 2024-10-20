import { FacebookIcon, GoogleIcon, TwitterIcon, UserIcon } from "../component/icon/Icon";

export const SIGNUP_MENU = [
    {
        id: 2,
        name: "Use phone/email/username",
        icon: <UserIcon />,
        type: "signup",
    },
    {
        id: 3,
        name: "Continue with Facebook",
        icon: <FacebookIcon />,
        type: "signup",
        disabled: true,
    },
    {
        id: 4,
        name: "Continue with Google",
        icon: <GoogleIcon />,
        type: "signup",
        disabled: true,
    },
    {
        id: 5,
        name: "Continue with Twitter",
        icon: <TwitterIcon />,
        type: "signup",
        disabled: true,
    },
];