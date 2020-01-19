import React, { Fragment } from 'react';
// import GiphySelect from 'react-giphy-select';
import Picker from 'react-giphy-picker'
import Button from "@material-ui/core/Button";
import 'react-giphy-select/lib/styles.css';
import './style.css';
export default function GifSection(props) {
    return (
        <Fragment>
            <Picker onSelected={(e) => props.select(e)} />
        </Fragment>
    )

}
