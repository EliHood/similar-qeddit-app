import React from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
const drawerWidth = 210;
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
        padding: "20px",
    },
    appBar: {
        // position: "absolute",
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
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
                    {/* {theme.direction === "ltr" ?  : <MenuIcon />} */}
                </IconButton>
                {props.children}
            </Drawer>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(OurMenu);
