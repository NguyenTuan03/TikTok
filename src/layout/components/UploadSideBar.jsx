import {  Divider, Stack, Typography } from "@mui/material";
import { HomeIcon } from "../../component/icon/Icon";
import Button from "../../component/button/Button";

export default function UploadSideBar() {
    return (
        <Stack
            height={"100%"}
            padding={"18px 12px 22px"}
            boxSizing={"border-box"}
            borderRight={"1px solid rgba(22, 24, 35, 0.12)"}
            bgcolor={"#fff"}
        >
            <Button height={"48px"} notAllowed={true}>Tải lên</Button>
            <Typography margin={"10px 0"}></Typography>
            <Divider />
            <Stack
                direction={"row"}
                alignItems={"center"}
                gap={1}
                padding={"16px 0px"}
                fontSize={"16px"}
                sx={{
                    cursor: "pointer",
                    ":hover": {
                        backgroundColor: "rgba(22,24,35,.03)",
                    },
                }}
            >
                <HomeIcon />
                Home
            </Stack>
        </Stack>
    );
}
