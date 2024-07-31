import { Grid } from "@mui/material";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import PropTypes from "prop-types";
export default function MainLayout({ children }) {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid item xs={3}>
                    <SideBar />
                </Grid>
                <Grid item xs={9}>{children}</Grid >
            </Grid>
        </>
    );
}
MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
