import "tippy.js/dist/tippy.css";
import Avatar from "@mui/material/Avatar";
import { useContext } from "react";
import LogOut from "../logOut/LogOut";
import { Auth } from "../context/AuthContext";
import Menu from "../popper/menu/Menu";
import { USER_MENU } from './../../const/USER_MENU';

export default function UserAvatar() {
    const auth = useContext(Auth);    
    return (
        <>
            <Menu items={USER_MENU} width={"100%"} maxHeight={"500px"} minWidth={"200px"}>
                <Avatar
                    sx={{ width: "32px", height: "32px" }}
                    alt={auth.userAuth.data?.nickname}
                    src={auth.userAuth.data?.avatar}
                />
            </Menu>
           <LogOut/>
        </>
    );
}
