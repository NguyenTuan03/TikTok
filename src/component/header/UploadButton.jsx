import { Link } from "react-router-dom";
import routesConfig from "../../config/Routes";
import { Box, Typography } from "@mui/material";
import { Plus } from "../icon/Icon";

export default function UploadButton() {
    return (
        <Link
            to={routesConfig.upload}
            style={{
                color: "rgb(99 100 107)",
                textDecoration: "none",
                display: "block",
                marginRight: "30px",
            }}
        >
            <Box
                display={"flex"}
                alignItems={"center"}
                borderColor={"rgba(22, 24, 35, 0.12) !important"}
                border={"1px solid"}
                p={"4px 12px"}
            >
                <Plus />
                <Typography fontSize={"16px"} component={"span"} fontWeight={"bold"} ml={"12px"}>
                    Upload
                </Typography>
            </Box>
        </Link>
    );
}
