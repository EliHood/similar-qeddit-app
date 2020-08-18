import React, { Fragment } from "react";
import InputBase from "@material-ui/core/InputBase";
import storehooks from "../../common/storeHooks";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { history } from "../../ourHistory";
type SearchType = {
    currentUser?: any;
};

const Search: React.FC<SearchType> = (props) => {
    const { query, searchQ } = storehooks();
    const search = (value) => {
        searchQ(value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        history.push({ pathname: `/search/posts?q=${query}`, state: { query: query, currentUser: props.currentUser } });
    };

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <InputBase placeholder="Search…" style={{ color: "#fff" }} onChange={(e) => search(e.target.value)} value={query} inputProps={{ "aria-label": "search" }} />
                <Button style={{ marginLeft: "80px", backgroundColor: "transparent" }} size="small" type="submit" variant="outlined" color="primary">
                    <SearchIcon style={{ color: "#fff" }} />
                </Button>
            </form>
        </Fragment>
    );
};

export default Search;
