export default function ElipsesMenu() {
  return (
    <Box ml={"18px"}>
                                    <Tippy
                                        delay={[0, 300]}
                                        interactive
                                        moveTransition="all 0.2s ease-out"
                                        placement="bottom-start"
                                        render={(attrs) => (
                                            <div
                                                className="box"
                                                tabIndex="-1"
                                                {...attrs}
                                            >
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
                                                    boxShadow={
                                                        "rgba(0, 0, 0, 0.12) 0px 2px 12px"
                                                    }
                                                >
                                                    {MENU.map((item) => {
                                                        return (
                                                            <Stack
                                                                sx={{
                                                                    ":hover": {
                                                                        background:
                                                                            "#e5e3e354",
                                                                    },
                                                                }}
                                                                key={item.id}
                                                                direction={
                                                                    "row"
                                                                }
                                                                pl={"12px"}
                                                                alignItems={
                                                                    "center"
                                                                }
                                                                spacing={2}
                                                                py={1}
                                                            >
                                                                <Box>
                                                                    {item.icon}
                                                                </Box>
                                                                <Box>
                                                                    {item.name}
                                                                </Box>
                                                            </Stack>
                                                        );
                                                    })}
                                                </Box>
                                            </div>
                                        )}
                                    >
                                        <Box>
                                            <FaEllipsisV />
                                        </Box>
                                    </Tippy>
                                </Box>
  )
}
