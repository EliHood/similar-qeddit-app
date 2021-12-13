/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classnames from 'classnames';

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
