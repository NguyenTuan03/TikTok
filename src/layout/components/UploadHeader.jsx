import { Avatar, Box, Stack, Typography } from "@mui/material";
import { TikTokIcon } from "../../component/icon/Icon";
import { Link } from "react-router-dom";
import { Auth } from "../../component/context/AuthContext";
import { useContext, useState } from "react";

export default function UploadHeader() {
    const { userAuth } = useContext(Auth);        
    const [showMenu, setShowMenu] = useState(false);
    const toggleShowMenu = (e) => {
        e.stopPropagation();
        setShowMenu(prev => !prev)
    }
    return (
        <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            position={"relative"}
            padding={"0 40px 0 20px"}
            borderBottom={"1px solid rgba(0, 0, 0, 0.12)"}
            height={"100%"}
        >
            <Link to={"/"}>
                <TikTokIcon />
            </Link>
            <Box position={"relative"} sx={{cursor:"pointer"}}>
                <Avatar                    
                    onClick={e => toggleShowMenu(e)}
                    sx={{ width: "32px", height: "32px" }}
                    alt={userAuth.data?.nickname}
                    src={userAuth.data?.avatar}
                />
                <Stack                    
                    alignItems={"flex-start"}
                    position={"absolute"}
                    right={0}
                    top={showMenu ? "100%" : "20px"}
                    visibility={showMenu ? "visible" : "hidden"}
                    minWidth={"240px"}
                    boxSizing={"border-box"}
                    border={"1px solid rgba(22, 24, 35, .12)"}
                    boxShadow={"0 2px 12px 0 rgba(0, 0, 0, .12)"}
                    borderRadius={"4px"}
                    m={"3px 0"}
                    bgcolor={"#fff"}
                    sx={{
                        transition:
                            "top 120ms cubic-bezier(0.65, 0, 0.35, 1), opacity 120ms cubic-bezier(0.65, 0, 0.35, 1)",
                    }}
                    zIndex={9999}
                >
                    <Typography
                        sx={{
                            cursor: "pointer",
                            ":hover": {
                                backgroundColor: "rgba(22,24,35,.03)",
                            }
                        }}                    
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            border: "none",
                            padding: "10px 11px",
                            textDecoration: "none",
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "#000",
                            borderBottom: "1px solid rgba(22, 24, 35, .12)",
                        }}
                    >
                        Hồ sơ
                    </Typography>
                    <Typography
                        sx={{
                            cursor: "pointer",
                            ":hover": {
                                backgroundColor: "rgba(22,24,35,.03)",
                            }
                        }}                    
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            border: "none",
                            padding: "10px 11px",
                            textDecoration: "none",
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "#000",
                        }}
                    >
                        Đăng xuất
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    );
}
