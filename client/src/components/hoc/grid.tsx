import { Grid } from "@material-ui/core";
import React, { Component } from "react";
export interface gridHocState {}
export default function(WrappedComponent) {
    class GridHoc extends Component<{}, gridHocState> {
        state = {};
        render() {
            return (
                <Grid container={true} justify="center" spacing={0}>
                    <Grid item={true} xs={11} sm={9} md={11} lg={8} style={{ margin: "20px 0px" }}>
                        <WrappedComponent {...this.props} />
                    </Grid>
                </Grid>
            );
        }
    }

    return GridHoc;
}
