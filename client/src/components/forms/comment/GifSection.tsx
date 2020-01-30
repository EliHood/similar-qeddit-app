import React, { Fragment } from "react";
import ReactGiphySearchbox from "react-giphy-searchbox";
import "./style.css";
export default function GifSection(props) {
    return (
        <Fragment>
            <ReactGiphySearchbox
                searchFormClassName={{ padding: "20px 0px" }}
                apiKey="9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7"
                onSelect={(e) => props.select(e)}
                masonryConfig={[
                    { columns: 4, imageWidth: 110, gutter: 5 },
                    { mq: "1000px", columns: 4, imageWidth: 120, gutter: 5 },
                ]}
            />
        </Fragment>
    );
}
