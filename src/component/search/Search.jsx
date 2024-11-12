/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RxDividerVertical } from "react-icons/rx";
import useDebounce from "./../../hooks/UseDebouce";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import AccountItem from "../accountItem/AccountItem";
import { MdClear } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import { search } from "../../services/search/SearchUsers";
import { ClearIcon } from "../icon/Icon";
import { useNavigate } from "react-router-dom";
export default function Search({ transparent }) {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const debounceValue = useDebounce(searchValue, 600);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const inputRef = useRef();
    const handleViewAccount = () => {
        nav("/user/search?q=" + debounceValue+'&type=more&page=1');
    };
    useEffect(() => {
        if (!debounceValue) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);

            const result = await search(debounceValue, "less");
            console.log(result.data);
            result ? setSearchResult(result.data) : console.log(result);
            setLoading(false);
        };
        fetchApi();
    }, [debounceValue]);
    const [hideValue, setHideValue] = useState(true);
    const handleHide = () => {
        setHideValue(false);
    };
    const handleClear = () => {
        setSearchValue("");
        setSearchResult([]);
        inputRef.current.focus();
    };
    return (
        <>
            <Tippy
                onClickOutside={handleHide}
                visible={searchResult.length > 0 && hideValue}
                interactive
                moveTransition="all 0.2s ease-out"
                render={(attrs) => (
                    <Box
                        style={{ width: "420px" }}
                        className="box"
                        tabIndex="-1"
                        {...attrs}
                    >
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            minWidth={"223px"}
                            width={"100%"}
                            p={"10px 0 0 0px"}
                            maxHeight={"500px"}
                            borderRadius={"8px"}
                            overflow={"hidden auto"}
                            boxSizing={"border-box"}
                            bgcolor={"#fff"}
                            boxShadow={"rgba(0, 0, 0, 0.12) 0px 2px 12px"}
                            zIndex={1}
                        >
                            <Box
                                paddingLeft={"14px"}
                                sx={{
                                    color: "rgba(22, 24, 35, 0.5)",
                                    height: "30px",
                                    fontWeight: "bold",
                                }}
                            >
                                Accounts
                            </Box>
                            {searchResult.map((item) => {
                                return (
                                    <AccountItem key={item.id} data={item} />
                                );
                            })}
                            <Box
                                p={"10px 0 10px 14px"}
                                fontWeight={700}
                                fontSize={"15px"}
                                sx={{
                                    cursor: "pointer",
                                    ":hover": { backgroundColor: "#f1f1f2" },
                                }}
                                onClick={handleViewAccount}
                            >
                                View all results about "{searchValue}"
                            </Box>
                        </Box>
                    </Box>
                )}
            >
                <Box
                    width={"400px"}
                    minWidth={"200px"}
                    bgcolor={transparent ? "transparent" : "rgb(241 241 242)"}
                    height={"40px"}
                    p={"0px 18px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    borderRadius={"92px"}
                    border={
                        transparent
                            ? "1px solid rgba(255, 255, 255, 0.5)"
                            : "1px solid transparent"
                    }
                    sx={{
                        "&:hover": {
                            border: transparent
                                ? "1px solid none"
                                : "1px solid rgb(22 24 35 / 31%)",
                        },
                        "& input::placeholder": {
                            color: transparent && "rgba(255, 255, 255, 0.5)",
                        },
                    }}
                >
                    <input
                        placeholder="Search"
                        spellCheck={false}
                        value={searchValue}
                        style={{
                            color: transparent ? "#fff" : "none",
                            border: "transparent",
                            backgroundColor: transparent
                                ? "transparent"
                                : "rgb(241 241 242)",
                            outline: "none",
                            padding: "10px 0",
                            width: "100%",
                            caretColor: "red",
                        }}
                        onChange={(e) => {
                            setSearchValue(e.target.value.trimStart());
                        }}
                        ref={inputRef}
                        onFocus={() => setHideValue(true)}
                    />
                    <button
                        style={{
                            cursor: "pointer",
                            outline: "none",
                            border: "none",
                            padding: "12px 16px 12px 0px",
                            display: "flex",
                            height: "100%",
                            backgroundColor: transparent && "transparent",
                        }}
                    >
                        {loading && (
                            <CircularProgress
                                style={{
                                    width: "12px",
                                    height: "12px",
                                    marginRight: "8px",
                                }}
                            />
                        )}
                        {!!searchValue && !loading && (
                            <button
                                onClick={handleClear}
                                style={{
                                    border: "none",
                                    cursor: "pointer",
                                    backgroundColor:
                                        transparent && "transparent",
                                }}
                            >
                                {transparent ? <ClearIcon /> : <MdClear />}
                            </button>
                        )}
                        <RxDividerVertical
                            color={transparent && "rgb(255,255,255,0.5)"}
                            style={{ marginRight: "12px" }}
                        />
                        <FaMagnifyingGlass
                            color={transparent && "#fff"}
                            style={{ width: "16px", height: "16px" }}
                        />
                    </button>
                </Box>
            </Tippy>
        </>
    );
}
