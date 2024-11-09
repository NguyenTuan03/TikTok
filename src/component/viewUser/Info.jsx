/* eslint-disable react/prop-types */
import { Stack, Typography } from "@mui/material";
import Image from "../image/Image";
import { PiShareFat } from "react-icons/pi";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import React, { useContext, useMemo, useState } from "react";
import { followUserAPI } from "../../services/follow/FollowUser";
import { Followed } from "../icon/Icon";
import { unfollowUserAPI } from "../../services/follow/UnfollowUser";
import CountInfo from "./userInfo/CountInfo";
import UserNickname from "./userInfo/UserNickname";
import UserButton from "./userInfo/UserButton";
import { Auth } from "../context/AuthContext";
export default function Info({ user }) {
    const auth = useContext(Auth);
    const [isFollow, setIsFollow] = useState(false);
    
    const INTERACTINGS = useMemo(() => [
        {
            name: "Following",
            count: user.followings_count,
            to: "/",
            link: true,
        },
        {
            name: "Followers", 
            count: user.followers_count,
            to: "/",
            link: true,
        },
        {
            name: "Liked",
            count: user.likes_count,
            to: "/",
            link: false,
        },
    ], [user]);
    
    
    const handleFollow = (id) => {
        const fetchFollow = async () => {
            const res = await followUserAPI(id, auth.userAuth.meta.token);
            if (!res.status) {
                setIsFollow(true);
            }
        };
        fetchFollow();
    };
    const handleUnFollow = (id) => {
        const fetchUnFollow = async () => {
            const res = await unfollowUserAPI(id, auth.userAuth.meta.token);
            if (!res.status) {
                setIsFollow(false);
            }
        };
        fetchUnFollow();
    };
    const buttons = [
        {
            name: isFollow ? "Following" : "Follow",
            isFollow: isFollow,
            isPrimary: true,
            follow: () => handleFollow(user.id),
            unFollow: () => handleUnFollow(user.id),
            flexMiddle: true,
            minwidth:"108px"
        },
        {
            name: "Message",
            isPrimary: false,
            flexMiddle: true,
            width:"108px"
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
    return (
        <Stack direction={"row"} alignItems={"center"} gap={3} mt={"60px"}>
            <Image
                width={"212px"}
                height={"212px"}
                borderRadius={true}
                src={user.avatar}
            />
            <Stack gap={2}>
                <Stack direction={"row"} alignItems={"center"} gap={2}>
                    <UserNickname user={user} />
                </Stack>
                <Stack direction={"row"} alignItems={"center"} gap={2}>
                    {buttons.map((btn, i) => {
                        return (
                            <React.Fragment key={i}>
                                <UserButton isFollow={isFollow} btn={btn}>
                                    {btn.isFollow && (
                                        <Followed height="16px" mr={"8px"} />
                                    )}
                                    {btn?.name ? btn?.name : btn?.icon}
                                </UserButton>
                            </React.Fragment>
                        );
                    })}
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
                    {user.bio}
                </Typography>
            </Stack>
        </Stack>
    );
}
