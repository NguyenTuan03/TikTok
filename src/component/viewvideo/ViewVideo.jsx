import { Box } from "@mui/material";
import Video from './video/VideoItem';

export default function ViewVideo() {
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
    <Video/>
</Box>
  )
}
