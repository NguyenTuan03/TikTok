import { Grid } from "@mui/material";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import PropTypes from "prop-types";
export default function MainLayout({ children }) {
    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Header />
                </Grid>
                <Grid xs={3}>
                    <SideBar />
                </Grid>
                <Grid xs={9}>{children}</Grid >
            </Grid>
        </>
    );
}
MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
