import React, { useState, Fragment } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputBase from "@material-ui/core/InputBase";
import storehooks from "../../common/storeHooks";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";
import OurLink from "../../common/OurLink";
type SearchType = {};

const Search: React.FC<SearchType> = (props) => {
    const { query, searchQ, postResults } = storehooks();
    console.log(query);
    const search = (value) => {
        searchQ(value);
        console.log(value);
    };
    console.log(postResults);
    return (
        <Fragment>
            <InputBase
                placeholder="Search…"
                style={{ width: "600px", color: "#fff" }}
                onChange={(e) => search(e.target.value)}
                fullWidth={true}
                value={query}
                inputProps={{ "aria-label": "search" }}
            />
            {query !== "" && postResults.length !== 0 && (
                <Grid container={true} justify="center">
                    {postResults && (
                        <Grid style={{ backgroundColor: "#fff", border: "1px solid #000", zIndex: 99, position: "absolute", width: "600px", marginTop: "20px" }} item={true}>
                            {postResults.map((item, index) => (
                                <Fragment key={index}>
                                    <Typography style={{ padding: "8px", color: "#000", width: "100%" }}>
                                        <img style={{ padding: "0px 8px" }} width="10px" height="10px" src={item.author.gravatar} />
                                        <OurLink
                                            style={{ fontSize: "12px" }}
                                            to={{
                                                pathname: `/post/${item.id}`,
                                            }}
                                            title={item.title}
                                        />
                                    </Typography>
                                </Fragment>
                            ))}
                        </Grid>
                    )}
                </Grid>
            )}
            {query !== "" && postResults.length === 0 && (
                <Grid container={true} justify="center">
                    <Grid style={{ backgroundColor: "#fff", border: "1px solid #000", zIndex: 99, position: "absolute", width: "600px", marginTop: "20px" }} item={true}>
                        <Typography style={{ padding: "8px", color: "#000", width: "100%" }}>
                            <Typography style={{ fontSize: "12px" }}>No Posts Found</Typography>
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </Fragment>
    );
};

export default Search;
