import { Avatar, Stack } from "@mui/material";
import PropTypes from "prop-types";
export default function AccountItem({ data, width="40px", height="40px", p, mb="20px"}) {
    
    return (
        <Stack direction={"row"} alignItems={"center"} spacing={2} mb={mb} p={p}>
            <div>
                <Avatar
                    sx={{
                        width: {width},
                        height: {height},
                        borderRadius: "50%",
                    }}
                    src={data?.avatar}
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
                    {data?.full_name || data?.first_name + data?.last_name}
                </div>
                <div style={{ color: "rgba(22, 24, 35, 0.5)", fontWeight: 400, fontSize:"14px", lineHeight:"18px" }}>
                    {data?.nickname}
                </div>
            </div>
        </Stack>
    );
}
AccountItem.propTypes = {
    data: PropTypes.object,
    width: PropTypes.string,
    height : PropTypes.string,
    p : PropTypes.string,
    mb : PropTypes.string,
};
