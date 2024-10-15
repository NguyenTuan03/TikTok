/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";

export default function UserNickname({user}) {
    return (
        <>
            <Typography
                component={"span"}
                fontWeight={"bold"}
                fontSize={"24px"}
            >
                {user?.nickname}
            </Typography>
            <Typography component={"span"} fontSize={"18px"}>
                {user?.nickname}
            </Typography>
        </>
    );
}
