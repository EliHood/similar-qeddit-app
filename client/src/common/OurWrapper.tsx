import React from "react";
import * as classnames from "classnames";

function OurWrapper(props: any) {
    return (
        <div
            className={classnames(
                (props.appBar,
                {
                    [props.appBarShift]: props.appOpen,
                }),
            )}
        >
            {props.children}
        </div>
    );
}

export default OurWrapper;
