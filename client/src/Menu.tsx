import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
const drawerWidth = 240;
const styles = (theme) => ({
    buttonCollapse: {
        [theme.breakpoints.up("lg")]: {
            display: "none",
        },
        margin: "10px",

        boxShadow: "none",
        color: "#333",
    },
    drawerPaper: {
        width: drawerWidth,
        right: "0px",
        top: "0px",
        left: "0px",
        position: "absolute" as "absolute",
        [theme.breakpoints.up("lg")]: {
            position: "absolute" as "absolute",
        },
    },
    // appBar: {
    //     // position: "absolute",
    //     marginLeft: drawerWidth,
    //     [theme.breakpoints.up("sm")]: {
    //         width: `calc(100% - ${drawerWidth}px)`,
    //     },
    // },
});

function OurMenu(props: any) {
    const { classes, theme } = props;
    return (
        <div className={classes.buttonCollapse}>
            <IconButton onClick={() => props.setOpen(!props.appOpen)}>
                <MenuIcon style={{ color: "#fff" }} />
            </IconButton>

            <Drawer
                variant="temporary"
                anchor={theme.direction === "right" ? "right" : "left"}
                open={props.appOpen}
                onClose={() => props.setOpen(!props.appOpen)}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <IconButton style={{ marginLeft: 200 }} onClick={() => props.setOpen(!props.appOpen)}>
                    {theme.direction === "ltr" ? <ChevronLeftIcon color={"primary"} style={{ fontSize: "30px" }} /> : <MenuIcon />}
                </IconButton>
                {props.children}
            </Drawer>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(OurMenu);
