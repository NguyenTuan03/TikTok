/* eslint-disable react/prop-types */
import React from "react";
import { LoginMenuStyle } from "../../../style/LoginModal/LoginMenu";
import { Box } from "@mui/material";
import { SIGNUP_MENU } from "../../../const/SIGNUP_MENU.jsx";

export default function SignUpModal({setSelectedCategoryId, setIsTerms}) {
    return (
        <>
            {SIGNUP_MENU.map((item) => {
                return (
                    <React.Fragment key={item.id}>
                        <button
                            onClick={() => {
                                setSelectedCategoryId({
                                    id: item.id,
                                    type: item.type,
                                });
                                setIsTerms(false);
                            }}
                            disabled={item.disabled ? true : false}
                            style={LoginMenuStyle(item)}
                        >
                            <Box>{item.icon}</Box>
                            <Box
                                style={{
                                    flex: 1,
                                    textAlign: "center",
                                }}
                            >
                                {item.name}
                            </Box>
                        </button>
                    </React.Fragment>
                );
            })}
        </>
    );
}
