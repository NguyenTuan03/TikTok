/* eslint-disable react/prop-types */
import { Stack, Typography } from "@mui/material";
import InputEmoji from 'react-input-emoji'

export default function CommentTextBox({
    title,
    commentState,
    onPost = () => {},
}) {
    const [comment, setComment] = commentState;
    
    return (
        <Stack direction={"row"}>
            <Stack
                direction={"row"}
                alignItems={"center"}
                flex={"1 1 auto"}
                borderRadius={"8px"}
                border={"1px solid rgba(22, 24, 35, 0.2)"}
                bgcolor={"rgba(22, 24, 35, 0.06)"}
                boxSizing={"border-box"}
                height={"40px"}
                sx={{ cursor: "text" }}
            >                
                <InputEmoji
                    onChange={setComment}
                    value={comment}
                    placeholder={title}
                    shouldReturn
                    background="transparent"
                    borderColor="transparent"
                />
            </Stack>
            <Typography
                onClick={onPost}
                flex={"0 0 48px"}
                component={"button"}
                fontWeight={"600"}
                textAlign={"right"}
                fontSize={"14px"}
                mr={"4px"}
                border={"none"}
                bgcolor={"#fff"}
                color={
                    comment.length > 0
                        ? "rgb(254, 44, 85)"
                        : "rgba(22, 24, 35, 0.34)"
                }
                sx={{
                    cursor: comment.length > 0 ? "pointer" : "not-allowed",
                }}
            >
                Post
            </Typography>
        </Stack>
    );
}
