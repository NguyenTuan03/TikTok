import { Avatar, Box, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
export default function AccountItem({ data, width="40px", height="40px", p="12px 0 12px 14px", mb="0px"}) {
    const nav = useNavigate();
    return (
        <Stack onClick={() => nav(`/@${data.nickname}`)} direction={"row"} alignItems={"center"} spacing={2} mb={mb} p={p} sx={{cursor:"pointer", ":hover": {backgroundColor:"#f1f1f2"}}}>
            <Box>
                <Avatar
                    sx={{
                        width: {width},
                        height: {height},
                        borderRadius: "50%",
                    }}
                    src={data?.avatar}
                />
            </Box>
            <Box>
                <Box
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
                </Box>
                <Box style={{ color: "rgba(22, 24, 35, 0.5)", fontWeight: 400, fontSize:"14px", lineHeight:"18px" }}>
                    {data?.nickname}
                </Box>
            </Box>
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
