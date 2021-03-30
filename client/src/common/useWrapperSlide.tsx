import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 210;
const styles = makeStyles((theme) => ({
    buttonBar: {
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
        margin: "10px",
        paddingLeft: "16px",
        right: 0,
        // position: "relative",
        width: "100%",
        background: "transparent",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        // width: theme.spacing.unit * 7 + 1,
        // [theme.breakpoints.up("sm")]: {
        //     width: theme.spacing.unit * 9 + 1,
        // },
    },
}));

function useWrapperSlide() {
    const [appOpen, appSetOpen] = React.useState(false);
    const classes = styles();

    return {
        appOpen,
        appSetOpen,
        classes,
    };
}

export default useWrapperSlide;
