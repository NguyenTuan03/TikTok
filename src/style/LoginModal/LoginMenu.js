export const LoginMenuStyle = (item) => ({
    display: "flex",
    alignItems: "center",
    border: "1px solid",
    borderColor: "rgba(22, 24, 35, 0.12)",
    borderRadius: "8px",
    marginBottom: "12px",
    width: "100%",
    height: "44px",
    cursor: item.disabled ? "not-allowed" : "pointer",
    "&:hover": !item.disabled && {
        border: "1px solid rgb(208 209 211)",
        backgroundColor: "rgb(241 241 242)",
    },
    paddingLeft: "20px",
});
