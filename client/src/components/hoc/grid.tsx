import React, { Component } from "react";
import { Grid } from "@material-ui/core";
export interface gridHocState {}
export default function(WrappedComponent) {
  class GridHoc extends Component<{}, gridHocState> {
    state = {};
    render() {
      return (
        <Grid container justify="center" spacing={0}>
          <Grid item sm={10} md={6} lg={6} style={{ margin: "20px 0px" }}>
            <WrappedComponent {...this.props} />
          </Grid>
        </Grid>
      );
    }
  }

  return GridHoc;
}
