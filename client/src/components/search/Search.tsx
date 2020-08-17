import React, { Fragment } from "react";
import InputBase from "@material-ui/core/InputBase";
import storehooks from "../../common/storeHooks";
type SearchType = {};

const Search: React.FC<SearchType> = () => {
    const { query, searchQ, postResults } = storehooks();
    const search = (value) => {
        searchQ(value);
        console.log(value);
    };
    console.log(postResults);
    return (
        <Fragment>
            <InputBase placeholder="Search…" style={{ color: "#fff" }} onChange={(e) => search(e.target.value)} value={query} inputProps={{ "aria-label": "search" }} />
        </Fragment>
    );
};

export default Search;
