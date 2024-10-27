/* eslint-disable react/prop-types */
import Tippy from "@tippyjs/react/headless";
import Wrapper from "../Wrapper";
import { useContext, useState } from "react";
import Header from "./Header";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../context/AuthContext";

export default function Menu({
    items = [],
    children,
    width,
    height,
    minWidth,
    maxHeight,
}) {
    const [listMenu, setListMenu] = useState([{ data: items }]);
    const { setOpenFormLogout } = useContext(Auth);
    const nav = useNavigate();
    const [isDisabled, setIsDisabled] = useState(false);
    const curMenu = listMenu[listMenu.length - 1];
    const renderItems = () => {
        return curMenu.data.map((value, index) => {
            const isParent = !!value.children;
            const logOut = !!value.isLogOut;
            return (
                <>
                    <MenuItem
                        id={index}
                        title={value?.name}
                        icon={value?.icon}
                        onClick={() => {
                            if (isParent) {
                                setListMenu((prev) => [
                                    ...prev,
                                    value.children,
                                ]);
                            }
                            if (value.to) {
                                nav(value?.to);
                            }
                            if (logOut) {
                                setOpenFormLogout(true);
                                setIsDisabled(true);
                            }
                        }}
                    />
                </>
            );
        });
    };
    return (
        <div>
            <Tippy
                delay={[0, 750]}
                offset={[12, 8]}
                interactive
                moveTransition="all 0.2s ease-out"
                placement="bottom-end"
                hideOnClick={true}
                onHide={() => {
                    setListMenu([listMenu[0]]);
                    setIsDisabled(false);
                }}
                disabled={isDisabled}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <Wrapper
                            width={width}
                            height={height}
                            minWidth={minWidth}
                            maxHeight={maxHeight}
                        >
                            {listMenu.length > 1 && (
                                <Header
                                    title={listMenu[1].title}
                                    onBack={() => {
                                        setListMenu((prev) =>
                                            prev.slice(0, listMenu.length - 1)
                                        );
                                    }}
                                />
                            )}
                            <div>{renderItems()}</div>
                        </Wrapper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}
