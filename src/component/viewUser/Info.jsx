/* eslint-disable react/prop-types */
import { Stack, Typography } from "@mui/material";
import Image from "../image/Image";
import Button from "../button/Button";
import { PiShareFat } from "react-icons/pi";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
const buttons = [
    {
        name: "Follow",
        isFollow: true,
        isPrimary: true,
    },
    {
        name: "Message",
        isPrimary: false,
    },
    {
        icon: <PiShareFat fontSize={"20px"} />,
        isPrimary: false,
        width: "40px",
        height: "40px",
    },
    {
        icon: <HiOutlineEllipsisHorizontal fontSize={"20px"} />,
        isPrimary: false,
        width: "40px",
        height: "40px",
    },
];
export default function Info({ user }) {
    const INTERACTINGS = [
        {
            name: "Following",
            count: user.followings_count,
            to: "/",
            link: true,
        },
        {
            name: "Follwers",
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
    ];
    return (
        <Stack direction={"row"} alignItems={"center"} gap={3}>
            <Image
                width={"212px"}
                height={"212px"}
                borderRadius={true}
                src={user.avatar}
            />
            <Stack gap={2}>
                <Stack direction={"row"} alignItems={"center"} gap={2}>
                    <Typography
                        component={"h1"}
                        fontWeight={"bold"}
                        fontSize={"24px"}
                    >
                        {user.nickname}
                    </Typography>
                    <Typography component={"h2"} fontSize={"18px"}>
                        {user.nickname}
                    </Typography>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} gap={2}>
                    {buttons.map((btn, i) => {
                        return (
                            <>
                                <Button
                                    primary={btn?.isPrimary}
                                    width={btn?.width}
                                    height={btn?.height}
                                    key={i}
                                >
                                    {btn?.name ? btn?.name : btn?.icon}
                                </Button>
                            </>
                        );
                    })}
                </Stack>
                <Stack direction={"row"} alignItems={"center"} gap={2}>
                    {INTERACTINGS.map((item, i) => {
                        return (
                            <>
                                <Typography key={i}>
                                    <span
                                        style={{
                                            fontSize: "18px",
                                            fontWeight: "bold",
                                            marginRight: "8px",
                                        }}
                                    >
                                        {item.count}
                                    </span>
                                    {item.link ? (
                                        <Button
                                            color={"rgba(22, 24, 35, 0.75)"}
                                            style={{ fontSize: "16px",color:"rgba(22, 24, 35, 0.75) !important" }}
                                            small={true}
                                            to={"/"}
                                        >
                                            {item.name}
                                        </Button>
                                    ) : (
                                        <Typography
                                            component={"span"}
                                            color={"rgba(22, 24, 35, 0.75)"}
                                            style={{ fontSize: "16px" }}
                                            small={true}
                                        >
                                            Likes
                                        </Typography>
                                    )}
                                </Typography>
                            </>
                        );
                    })}
                </Stack>
                <Typography fontSize={"16px"}>{user.bio}</Typography>
            </Stack>
        </Stack>
    );
}
