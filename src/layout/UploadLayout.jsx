/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import UploadHeader from "./components/UploadHeader";
import UploadSideBar from "./components/UploadSideBar";

export default function UploadLayout({children}) {
  return (
    <>
        <Grid container>
            <Grid item xs={12} position={"fixed"} top={0} left={0} width={"100%"} height={"60px"} zIndex={999}>
                <UploadHeader/>
            </Grid>
            <Grid item width={"240px"} flexShrink={0} height={"100%"} position={"fixed"} top={"60px"} left={0}>
                <UploadSideBar/>
            </Grid>
            <Grid item xs sx={{ flexGrow: 1}} margin={"60px 0 0 240px"} pt={"16px"} bgcolor={"#f8f8f8"}>
                {children}
            </Grid>
        </Grid>
    </>
  )
}
