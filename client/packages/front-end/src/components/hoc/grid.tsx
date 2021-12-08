import { Grid } from '@material-ui/core';
import React, { Component } from 'react';

export type gridHocState = {}
export default function (WrappedComponent) {
    class GridHoc extends Component<{}, gridHocState> {
    state = {};

    render() {
        return (
            <Grid container justify="center" spacing={0}>
                <Grid item xs={11} sm={9} md={11} lg={8} style={{ margin: '20px 0px' }}>
                    <WrappedComponent {...this.props} />
                </Grid>
            </Grid>
        );
    }
    }

    return GridHoc;
}
