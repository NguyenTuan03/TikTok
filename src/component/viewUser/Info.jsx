/* eslint-disable react/prop-types */
import { Box, Modal, Stack, Typography } from "@mui/material";
import Image from "../image/Image";
import { PiShareFat } from "react-icons/pi";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import React, { useContext, useEffect, useState } from "react";
import { followUserAPI } from "../../services/follow/FollowUser";
import {
    CloseIcon,
    EditIcon,
    Followed,
    SetttingsIcon,
    ShareNoneIcon,
} from "../icon/Icon";
import { unfollowUserAPI } from "../../services/follow/UnfollowUser";
import CountInfo from "./userInfo/CountInfo";
import UserNickname from "./userInfo/UserNickname";
import UserButton from "./userInfo/UserButton";
import { Auth } from "../context/AuthContext";
import Button from "../button/Button";
import { UpdateUser } from "../../services/users/UpdateUser";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    outline: "none",
};
export default function Info({ user }) {
    const { userAuth } = useContext(Auth);
    const [isFollow, setIsFollow] = useState(false);
    const [follower, setFollower] = useState(0);
    const [open, setOpen] = useState(false);
    const [bio, setBio] = useState("");
    const [username, setUsername] = useState(userAuth?.data?.last_name + " " + userAuth?.data?.first_name)
    const [nickname, setNickname] = useState(userAuth?.data?.nickname)
    const [active, setActive] = useState(false);
    useEffect(() => {
        setFollower(user?.followers_count);
        setIsFollow(user?.is_followed);
    }, [user]);
    const handleFollow = (id) => {
        const fetchFollow = async () => {
            const res = await followUserAPI(id, userAuth?.meta?.token);
            if (!res.status) {
                setIsFollow(true);
                setFollower((prev) => prev + 1);
            }
        };
        fetchFollow();
    };
    const handleUnFollow = (id) => {
        const fetchUnFollow = async () => {
            const res = await unfollowUserAPI(id, userAuth?.meta?.token);
            if (!res.status) {
                setIsFollow(false);
                setFollower((prev) => prev - 1);
            }
        };
        fetchUnFollow();
    };
    const INTERACTINGS = [
        {
            name: "Following",
            count: user.followings_count,
            to: "/",
            link: true,
        },
        {
            name: "Followers",
            count: follower,
            to: "/",
            link: true,
        },
        {
            name: "Liked",
            count: user.likes_count,
            to: "/",
            link: false,
        },
    ];
    const buttons = [
        {
            name: isFollow ? "Following" : "Follow",
            isFollow: isFollow,
            isPrimary: true,
            follow: () => handleFollow(user?.id),
            unFollow: () => handleUnFollow(user?.id),
            flexMiddle: true,
            minwidth: "108px",
        },
        {
            name: "Message",
            isPrimary: false,
            flexMiddle: true,
            width: "108px",
        },
        {
            icon: <PiShareFat fontSize={"20px"} />,
            isPrimary: false,
            width: "36px",
            height: "36px",
            flexMiddle: true,
        },
        {
            icon: <HiOutlineEllipsisHorizontal fontSize={"20px"} />,
            isPrimary: false,
            width: "36px",
            height: "36px",
            flexMiddle: true,
        },
    ];
    const profile = [
        {
            name: "Edit profile",
            isPrimary: true,
            edit: () => setOpen((prev) => !prev),
        },
        {
            name: "Promote post",
            isPrimary: false,
        },
        {
            icon: <SetttingsIcon />,
            width: "36px",
            height: "36px",
        },
        {
            icon: <ShareNoneIcon />,
            width: "36px",
            height: "36px",
        },
    ];
    const handleUpdateUser = () => {
        const fetchApi = async () => {
            const res = await UpdateUser(
                username.slice(username.indexOf(" ")+1),
                username.slice(0, username.indexOf(" ")),                        
                bio,                
                userAuth.meta.token
            );
            
            console.log(res);
            if (res.data) {
                
                setOpen(false)
                localStorage.setItem("user",JSON.stringify(res.data))
                setActive(false)
            }            
        };
        fetchApi();
    };
    return (
        <Stack direction={"row"} alignItems={"center"} gap={3} mt={"60px"}>
            <Image
                width={"212px"}
                height={"212px"}
                borderRadius={true}
                src={user?.avatar}
            />
            <Stack gap={2}>
                <Stack direction={"row"} alignItems={"center"} gap={2}>
                    <UserNickname user={user} />
                </Stack>
                <Stack direction={"row"} alignItems={"center"} gap={2}>
                    {userAuth?.data?.nickname === user?.nickname ? (
                        <>
                            {profile.map((btn, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <UserButton
                                            isFollow={isFollow}
                                            btn={btn}
                                        >
                                            {btn?.isFollow && (
                                                <Followed
                                                    height="16px"
                                                    mr={"8px"}
                                                />
                                            )}
                                            {btn?.name ? btn?.name : btn?.icon}
                                        </UserButton>
                                    </React.Fragment>
                                );
                            })}
                        </>
                    ) : (
                        <>
                            {buttons.map((btn, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <UserButton
                                            isFollow={isFollow}
                                            btn={btn}
                                        >
                                            {btn?.isFollow && (
                                                <Followed
                                                    height="16px"
                                                    mr={"8px"}
                                                />
                                            )}
                                            {btn?.name ? btn?.name : btn?.icon}
                                        </UserButton>
                                    </React.Fragment>
                                );
                            })}
                        </>
                    )}
                </Stack>
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                    {INTERACTINGS.map((item, i) => {
                        return (
                            <React.Fragment key={i}>
                                <CountInfo item={item} />
                            </React.Fragment>
                        );
                    })}
                </Stack>
                <Typography component={"span"} fontSize={"16px"}>
                    {userAuth?.data?.bio}
                </Typography>
            </Stack>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        padding={"24px 24px 12px"}
                        borderBottom={"0.5px solid rgba(22, 24, 35, 0.2)"}
                    >
                        <Typography
                            id="modal-modal-title"
                            fontSize={"24px"}
                            component="h2"
                            fontWeight={"600"}
                        >
                            Edit profile
                        </Typography>
                        <CloseIcon
                            onClick={() => setOpen(false)}
                            color="rgba(22, 24, 35, 0.75)"
                        />
                    </Stack>
                    <Box id="modal-modal-description" padding={"8px 24px 0px"}>
                        <Stack
                            padding={"16px 0"}
                            direction={"row"}
                            borderBottom={"0.5px solid rgba(22, 24, 35, 0.2)"}
                        >
                            <Typography
                                fontWeight={"600"}
                                lineHeight={"24px"}
                                fontSize={"16px"}
                                width={"120px"}
                                mr={"24px"}
                            >
                                Profile photo
                            </Typography>
                            <Box position={"relative"} height={"96px"}>
                                <Stack
                                    position={"relative"}
                                    direction={"row"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    ml={"128px"}
                                >
                                    <Image
                                        width={"96px"}
                                        height={"96px"}
                                        borderRadius={true}
                                        src={user?.avatar}
                                    />
                                </Stack>
                                <Stack
                                    width={"32px"}
                                    height={"32px"}
                                    position={"absolute"}
                                    bottom={0}
                                    ml={"192px"}
                                    direction={"row"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    border={"1px solid rgb(208,208,211)"}
                                    bgcolor={"rgb(255,255,255)"}
                                    borderRadius={"16px"}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <EditIcon />
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack
                            direction={"row"}
                            padding={"16px 0"}
                            borderBottom={"0.5px solid rgba(22, 24, 35, 0.12)"}
                        >
                            <Typography
                                component={"div"}
                                fontWeight={600}
                                lineHeight={"24px"}
                                fontSize={"16px"}
                                width={"120px"}
                                mr={"24px"}
                            >
                                Username
                            </Typography>
                            <Box position={"relative"}>
                                <Typography
                                    component={"input"}
                                    fontSize={"16px"}
                                    lineHeight={"24px"}
                                    mb={"16px"}
                                    border={"none"}
                                    bgcolor={"rgba(22, 24, 35, 0.06)"}
                                    padding={"8px"}
                                    sx={{
                                        outline: "none",
                                    }}
                                    value={nickname}
                                    onChange={e => {
                                        setNickname(e.target.value)
                                        setActive(true);                                        
                                    }} 
                                />
                                <Typography
                                    fontSize={"12px"}
                                    component={"p"}
                                    mt={"16px"}
                                >
                                    www.tiktok.com/@{nickname}
                                </Typography>
                                <Typography component={"p"} mt={"8px"}>
                                    Your username can be changed once every 30
                                    days. You can change it again after Jan 28,
                                    2025.
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack
                            direction={"row"}
                            padding={"16px 0"}
                            borderBottom={"0.5px solid rgba(22, 24, 35, 0.12)"}
                        >
                            <Typography
                                component={"div"}
                                fontWeight={600}
                                lineHeight={"24px"}
                                fontSize={"16px"}
                                width={"120px"}
                                mr={"24px"}
                            >
                                Name
                            </Typography>
                            <Box position={"relative"}>
                                <Typography
                                    component={"input"}
                                    fontSize={"16px"}
                                    lineHeight={"24px"}
                                    mb={"16px"}
                                    border={"none"}
                                    bgcolor={"rgba(22, 24, 35, 0.06)"}
                                    padding={"8px"}
                                    sx={{
                                        outline: "none",
                                    }}                                    
                                    value={username}
                                    onChange={e => {
                                        setUsername(e.target.value)
                                        setActive(true)
                                    }} 
                                />
                                <Typography component={"p"} mt={"8px"}>
                                    Your nickname can only be changed every 7
                                    days. You can change it again after Jan 5,
                                    2025.
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack direction={"row"} padding={"16px 0"}>
                            <Typography
                                component={"div"}
                                fontWeight={600}
                                lineHeight={"24px"}
                                fontSize={"16px"}
                                width={"120px"}
                                mr={"24px"}
                            >
                                Bio
                            </Typography>
                            <Box>
                                <Typography
                                    component={"textarea"}
                                    width={"420px"}
                                    borderRadius={"4px"}
                                    bgcolor={"rgba(22, 24, 35, 0.06)"}
                                    fontSize={"16px"}
                                    color={"rgb(22, 24, 35)"}
                                    lineHeight={"24px"}
                                    border={"none"}
                                    height={"100px"}
                                    p={"12px"}
                                    onChange={(e) => {
                                        setBio(e.target.value);
                                        setActive(true)
                                    }}
                                    maxLength={80}
                                    sx={{
                                        resize: "none",
                                        outline: "none",
                                        caretColor: "rgb(254, 44, 85)",
                                    }}
                                    placeholder={"Bio"}
                                >
                                    {bio}
                                </Typography>
                                <Typography
                                    fontSize={"12px"}
                                    color={"rgba(22, 24, 35, 0.75)"}
                                >
                                    {bio.length} / 80
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                    <Stack
                        direction={"row"}
                        gap={"16px"}
                        height={"86px"}
                        padding={"0 24px"}
                        justifyContent={"flex-end"}
                        borderTop={"0.5px solid rgba(22, 24, 35, 0.2)"}
                        alignItems={"center"}
                    >
                        <Button
                            onClick={() => setOpen(false)}
                            width={"96px"}
                            monochrome={true}
                        >
                            Cancel
                        </Button>                        
                        <Button onClick={handleUpdateUser} primary={active ? true : false} width={"96px"} cancel={!active ? true : false} disabled={!active ? true : false}>
                            Save
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </Stack>
    );
}
