import { CiFlag1 } from "react-icons/ci";
import { LuHeartCrack } from "react-icons/lu";
import { ArrowDown } from "../component/icon/Icon";
import { Switch } from "@mui/material";
export const HEADER_VIDEO = [
    {
        id: 1,
        name: "Auto scroll",
        icon: <ArrowDown width="16px" height="16px" color="#000" />,
        switch:(
          <Switch          
          inputProps={{ 'aria-label': 'controlled' }}
        />
        )
    },
    {
        id: 2,
        name: "Not interested",
        icon: <LuHeartCrack fontSize={"16px"} />,
    },
    {
        id: 3,
        name: "Report",
        icon: <CiFlag1 fontSize={"16px"} />,
    },
];
