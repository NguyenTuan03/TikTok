/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import VideoItem from "./video/VideoItem";

export default function ViewVideo({video}) {
    return (
        <Box
            display={"flex"}
            alignItems={"flex-end"}
            sx={{
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                position: "relative",
                overflow: "hidden",
                ":hover .header_video": {
                    display: "flex",
                },
            }}
        >
            <VideoItem video={video}/>
        </Box>
    );
}
