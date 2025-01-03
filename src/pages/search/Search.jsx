import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { search } from "./../../services/search/SearchUsers";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import Image from "../../component/image/Image";
import Button from "../../component/button/Button";
import { getAnUser } from "../../services/users/GetAnUser";
import { Auth } from "../../component/context/AuthContext";
import { followUserAPI } from "../../services/follow/FollowUser";
import { unfollowUserAPI } from "../../services/follow/UnfollowUser";

export default function SearchUser() {
    const params = useLocation();
    const str = params.search.substring(3).split("&");
    const user = str[0];
    const type = str[1].substring(5);
    const page = str[2].substring(5);
    const [value, setValue] = useState([]);
    const [totalPage, setTotalpage] = useState(0);
    const [currentPage, setCurrentPage] = useState(page);
    const { userAuth } = useContext(Auth);
    const nav = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            const res = await search(user, type, currentPage);
            if (res.data) {
                console.log(res.data);
                setValue(res.data);
                setTotalpage(res.meta.pagination.total_pages);
                setCurrentPage(res.meta.pagination.current_page);
            }
        };
        fetchApi();
    }, [user, type, currentPage]);
    useEffect(() => {
        const fetchApi = async () => {
            if (value.length === 0) return;
            try {
                const nicknames = value?.map((item) => `@${item?.nickname}`);

                const results = await Promise.all(
                    nicknames.map(async (nickname) => {
                        return await getAnUser(nickname, userAuth.meta.token);
                    })
                );

                const updatedValues = value.map((item) => {
                    const res = results.find((res) => item.id === res.id);
                    return {
                        ...item,
                        is_followed: res.is_followed,
                    };
                });
                setValue(updatedValues);
            } catch (error) {
                console.error("Error fetching user follow status:", error);
            }
        };

        fetchApi();
    }, [value, userAuth.meta.token]);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };
    const handleFollow = (id) => {
        const fetchFollow = async () => {
            const res = await followUserAPI(id, userAuth.meta.token);
            console.log(res);
        };
        fetchFollow();
    };
    const handleUnFollow = (id) => {
        const fetchUnFollow = async () => {
            const res = await unfollowUserAPI(id, userAuth.meta.token);
            console.log(res);
        };
        fetchUnFollow();
    };
    return (
        <>
            <Box
                width={"850px"}
                minWidth={"420px"}
                m={"0 auto"}
                p={"80px 0 36px calc(240px + 24px)"}
            >
                <Typography
                    component={"h2"}
                    fontSize={"16px"}
                    fontWeight={700}
                    lineHeight={"21px"}
                    m={"0 0 12px 0"}
                >
                    Users
                </Typography>
                {value.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Stack
                                direction={"row"}
                                gap={2}
                                alignItems={"center"}
                                padding={"8px 0 8px 0"}
                                marginBottom={"16px"}
                                borderRadius={"8px"}
                                sx={{
                                    cursor: "pointer",
                                    ":hover": {
                                        backgroundColor:
                                            "rgb(239 233 233 / 37%)",
                                    },
                                }}
                            >
                                <Image
                                    onClick={() => nav(`/@${item?.nickname}`)}
                                    style={{
                                        height: "60px",
                                        width: "60px",
                                        borderRadius: "50%",
                                        flex: "0 0 64px",
                                        m: "16px 16px 16px 0",
                                    }}
                                    src={item.avatar}
                                />
                                <Stack
                                    flex={1}
                                    onClick={() => nav(`/@${item?.nickname}`)}
                                >
                                    <Typography
                                        component={"p"}
                                        fontSize={"18px"}
                                        fontWeight={700}
                                        lineHeight={"24px"}
                                    >
                                        {item.full_name ?? item?.nickname}{" "}
                                        {item.tick}
                                    </Typography>
                                    <Typography component={"div"}>
                                        <Typography
                                            component={"span"}
                                            fontSize={"14px"}
                                            color={"rgba(22, 24, 35, 0.75)"}
                                            fontWeight={400}
                                            lineHeight={"18px"}
                                        >
                                            {item?.nickname} .{" "}
                                        </Typography>
                                        <Typography
                                            component={"strong"}
                                            mt={"2px"}
                                            fontWeight={700}
                                            fontSize={"14px"}
                                            color={"rgb(22, 24, 35)"}
                                        >
                                            {item.followers_count}{" "}
                                        </Typography>
                                        <Typography
                                            component={"span"}
                                            mt={"4px"}
                                            fontWeight={400}
                                            color={"rgba(22, 24, 35, 0.75)"}
                                        >
                                            Follower
                                        </Typography>
                                    </Typography>
                                    <Typography>{item.bio}</Typography>
                                </Stack>
                                {item.is_followed ? (
                                    <Button
                                        onClick={() => handleUnFollow(item.id)}
                                    >
                                        Following
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => handleFollow(item.id)}
                                        primary={true}
                                    >
                                        Follow
                                    </Button>
                                )}
                            </Stack>
                        </React.Fragment>
                    );
                })}
                <Pagination
                    count={totalPage}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="secondary"
                    sx={{
                        "& .MuiPagination-ul": {
                            justifyContent: "center",
                        },
                        "& .Mui-selected": {
                            backgroundColor: "rgb(255, 59, 92) !important",
                        },
                        "& .Mui-selected:hover": {
                            backgroundColor: "rgb(255, 59, 92) !important",
                        },
                    }}
                    siblingCount={1}
                    boundaryCount={1}
                />
            </Box>
        </>
    );
}
