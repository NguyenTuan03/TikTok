import { Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import { getAnUser } from "../../services/users/GetAnUser";
import { TbGridDots } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { TbHeartCancel } from "react-icons/tb";
import Info from "../../component/viewUser/Info";
import { Auth } from "../../component/context/AuthContext";
// import UserVideo from '@/component/viewUser/uservideo/UserVideo.jsx';
const categories = [
    {
        id: 1,
        name: "Videos",
        icon: <TbGridDots fontSize={"20px"} />,
    },
    {
        id: 2,
        name: "Reposts",
        icon: <BiRepost fontSize={"20px"} />,
    },
    {
        id: 3,
        name: "Liked",
        icon: <TbHeartCancel fontSize={"20px"} />,
    },
];
export default function User() {
    const { nickname } = useParams();
    const [user, setUser] = useState({});
    const markerRef = useRef();
    const [activeIndex, setActiveIndex] = useState(0);
    const items = useRef([]);
    const { userAuth } = useContext(Auth);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getAnUser(nickname, userAuth?.meta?.token);
            console.log(res);

            setUser(res);
        };
        fetchUser();
    }, [nickname]);

    useEffect(() => {
        if (items.current[activeIndex] && markerRef.current) {
            const currentItem = items.current[activeIndex];
            markerRef.current.style.left = currentItem.offsetLeft + "px";
            markerRef.current.style.width = currentItem.offsetWidth + "px";
        }
    }, [activeIndex]);

    return (
        <Box p={"32px 0 36px calc(240px + 24px)"}>
            <Info user={user} />
            <Box my={4}>
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    gap={2}
                    position={"relative"}
                >
                    <div
                        ref={markerRef}
                        style={{
                            position: "absolute",
                            left: 0,
                            height: "4px",
                            width: 0,
                            bottom: "-8px",
                            background: "green",
                            transition: "all 0.5 ease",
                            borderRadius: "4px",
                        }}
                    ></div>
                    {categories.map((item, i) => {
                        return (
                            <React.Fragment key={i}>
                                <Box
                                    onClick={() => setActiveIndex(item.id)}
                                    ref={(el) => (items.current[item.id] = el)}
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={1}
                                    position={"relative"}
                                    sx={{
                                        cursor: "pointer",
                                        transition: "all 0.5s",
                                    }}
                                >
                                    {item.icon}
                                    <span style={{ fontSize: "18px" }}>
                                        {item.name}
                                    </span>
                                </Box>
                            </React.Fragment>
                        );
                    })}
                </Stack>
            </Box>
            {/* <UserVideo videos={user.videos} /> */}
        </Box>
    );
}
