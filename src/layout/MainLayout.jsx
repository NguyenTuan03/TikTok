import { Grid } from "@mui/material";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import PropTypes from "prop-types";
export default function MainLayout({ children }) {
    return (
        <>
            <Grid container>
                <Grid item xs={12} position={"fixed"} top={0} left={0} right={0} zIndex={999}>
                    <Header />
                </Grid>
                <Grid item sx={{ width: "240px", flexShrink: 0, height:"100%" }} position={"fixed"} top={"76px"} left={0}>
                    <SideBar />
                </Grid>
                <Grid item xs sx={{ flexGrow: 1}}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
}
MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
