/* eslint-disable react/prop-types */
import { Stack, Typography } from "@mui/material";
import { AtIcon, SmileIcon } from "../icon/Icon";

export default function CommentTextBox({title,commentState, onPost = () => {}}) {
    const [comment,setComment] = commentState;
    const onchange = (e) => {
        setComment(e.target.value);
        
    }
    return (
        <Stack direction={"row"}>
            <Stack
                direction={"row"}
                alignItems={"center"}
                flex={"1 1 auto"}
                padding={"0 9px"}
                borderRadius={"8px"}
                border={"1px solid rgba(22, 24, 35, 0.2)"}
                bgcolor={"rgba(22, 24, 35, 0.06)"}
                boxSizing={"border-box"}
                sx={{ cursor: "text" }}
            >
                <input
                    onChange={e => onchange(e)}
                    placeholder={title}
                    spellCheck={false}
                    style={{
                        backgroundColor: "rgba(22, 24, 35, 0)",
                        border: "none",
                        outline: "none",
                        margin: "10px 0",
                        caretColor: "red",
                        flex: "1",
                    }}
                />
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"32px"}
                    height={"32px"}
                >
                    <AtIcon />
                </Stack>
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"32px"}
                    height={"32px"}
                >
                    <SmileIcon />
                </Stack>
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
                color={comment.length > 0 ? "rgb(254, 44, 85)" : "rgba(22, 24, 35, 0.34)"}
                sx={{
                    cursor:comment.length > 0 ? "pointer" : "not-allowed"
                }}
            >
                Post
            </Typography>
        </Stack>
    );
}
