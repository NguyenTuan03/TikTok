import { Switch } from "@mui/material";
import { CiFlag1 } from "react-icons/ci";
import { LuHeartCrack } from "react-icons/lu";

export const HEADER_VIDEO = [
    {
        id:1,
        name: "Auto scroll",
        icon: (
            <Switch
                sx={{
                    "& .MuiSwitch-thumb": {
                        width: "34px",
                        height: "10px",
                        transform: "translate(-20px,-2.7px)",
                    },
                    "& .MuiSwitch-input": {
                        left: "-5%",
                        top: "-2px",
                    },
                }}
            />
        ),
    },
    {
        id:2,
        name: 'Not interested',
        icon: <LuHeartCrack fontSize={"16px"} />
    },
    {
        id:3,
        name: 'Report',
        icon: <CiFlag1 fontSize={"16px"} />
    }
];
