import { Box, Divider, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { Auth } from "../context/AuthContext";

export default function DeleteForm() {
    const { dataForm, setOpenFormDelete } = useContext(Auth);
    const handleCancel = () => {
      setOpenFormDelete(false);
    }
    return (
        <Box
            width={"310px"}
            position={"absolute"}
            top={"50%"}
            left={"50%"}
            sx={{ transform: "translate(-50%,-50%)" }}
            bgcolor={"#fff"}
        >
            <Typography
                fontWeight={"700"}
                textAlign={"center"}
                padding={"28px 24px"}
                fontSize={"24px"}
            >
                {dataForm.title}
            </Typography>
            <Stack>
                <Divider />
                <button
                  onClick={() => dataForm.handle()}
                    style={{
                        border: "none",
                        background: "none",
                        outline: "none",
                        cursor: "pointer",
                        color: "rgb(22, 24, 35)",
                        padding: "0",
                        fontWeight: "600",
                        fontSize: "14px",
                        height: "48px",
                        lineHeight: "48px",
                    }}
                >
                    Delete
                </button>
                <Divider />
                <button
                  onClick={handleCancel}
                    style={{
                        border: "none",
                        background: "none",
                        outline: "none",
                        cursor: "pointer",
                        color: "rgba(22, 24, 35, 0.5)",
                        padding: "0",
                        fontWeight: "600",
                        fontSize: "14px",
                        height: "48px",
                        lineHeight: "48px",
                    }}
                >
                    Cancel
                </button>
            </Stack>
        </Box>
    );
}
