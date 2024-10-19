import { Box, Stack, Typography } from "@mui/material";
import { CreatorHouseIcon, DarkModeIcon, EllipsisVerticalIcon, LanguageIcon, QuestionIcon,  } from "../icon/Icon";
import Tippy from "@tippyjs/react/headless";
const MENU = [
    {
        id: 1,
        name: "Creator tools",
        icon: <CreatorHouseIcon />,
    },
    {
        id: 2,
        name: "English",
        icon: <LanguageIcon />,
    },
    {
        id: 3,
        name: "FeedBack and help",
        icon: <QuestionIcon />,
    },
    {
        id: 4,
        name: "Dark mode",
        icon: <DarkModeIcon />,
    },
];
export default function UploadButton() {
    return (
        <Box ml={"18px"}>
            <Tippy
                delay={[0, 300]}
                interactive
                moveTransition="all 0.2s ease-out"
                placement="bottom-start"
                render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            minWidth={"200px"}
                            width={"100%"}
                            p={"10px 0 10px 0px"}
                            maxHeight={"500px"}
                            borderRadius={"8px"}
                            overflow={"hidden auto"}
                            boxSizing={"border-box"}
                            boxShadow={"rgba(0, 0, 0, 0.12) 0px 2px 12px"}
                        >
                            {MENU.map((item) => {
                                return (
                                    <Stack
                                        sx={{
                                            cursor: "pointer",
                                            ":hover": {
                                                background: "#e5e3e354",
                                            },
                                        }}
                                        key={item.id}
                                        direction={"row"}
                                        pl={"12px"}
                                        alignItems={"center"}
                                        spacing={2}
                                        py={1}
                                    >
                                        <Box>{item.icon}</Box>
                                        <Typography variant="h5">{item.name}</Typography>
                                    </Stack>
                                );
                            })}
                        </Box>
                    </div>
                )}
            >
                <Box>
                    <EllipsisVerticalIcon />
                </Box>
            </Tippy>
        </Box>
    );
}
