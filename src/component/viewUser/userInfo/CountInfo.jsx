/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import Button from "../../button/Button";

export default function CountInfo({ item }) {
    return (
        <Box>
            <span
                style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                }}
            >
                {item.count}
            </span>
            {item.link ? (
                <Button
                    color={"rgba(22, 24, 35, 0.75)"}
                    style={{
                        fontSize: "16px",
                        color: "rgba(22, 24, 35, 0.75) !important",
                    }}
                    small="true"
                    to={"/"}
                >
                    {item.name}
                </Button>
            ) : (
                <Typography
                    component={"span"}
                    color={"rgba(22, 24, 35, 0.75)"}
                    style={{ fontSize: "16px" }}
                    small="true"
                    ml={"8px"}
                >
                    Likes
                </Typography>
            )}
        </Box>
    );
}
