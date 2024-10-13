/* eslint-disable react/prop-types */
import { Box } from '@mui/material'
import { AiFillMessage } from "react-icons/ai";
export default function CommentPost({video}) {
  return (
    <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
            >
                <Box
                    width={"38px"}
                    height={"38px"}
                    bgcolor={"rgba(22, 24, 35, 0.06)"}
                    borderRadius={"50%"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    m={"8px 0 6px 0"}
                    sx={{
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                    }}
                >
                    <AiFillMessage fontSize={"16px"} />
                </Box>
                <strong
                    style={{
                        color: "rgba(22, 24, 35, 0.75)",
                        fontSize: "14px",
                    }}
                >
                    {video.comments_count}
                </strong>
            </Box>
  )
}
