import React, { Fragment } from "react";
import GridHoc from "../hoc/grid";
import Typography from "@material-ui/core/Typography";

const NotFound: React.FC = () => (
    <Fragment>
        <Typography variant="h4"> No Page Found :(</Typography>
        <img style={{ margin: "30px 0px" }} width="800" src="https://s3.amazonaws.com/media.thecrimson.com/photos/2019/12/23/142555_1341777.png" />
    </Fragment>
)
export default GridHoc(NotFound);
