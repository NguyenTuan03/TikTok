import { Avatar, Stack } from "@mui/material";
import PropTypes from "prop-types";
export default function AccountItem({ data }) {
    return (
        <Stack direction={"row"} alignItems={"center"} spacing={2} mb={"20px"}>
            <div>
                <Avatar
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                    }}
                    src={data.avatar}
                />
            </div>
            <div>
                <div
                    style={{
                        fontSize: "16px",
                        lineHeight: "21px",
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {data.full_name}
                </div>
                <div style={{ color: "rgba(22, 24, 35, 0.5)", fontWeight: 400, fontSize:"14px", lineHeight:"18px" }}>
                    {data.nickname}
                </div>
            </div>
        </Stack>
    );
}
AccountItem.propTypes = {
    data: PropTypes.object,
};
