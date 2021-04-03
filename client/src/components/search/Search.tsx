import React, { Fragment } from 'react'
import InputBase from '@material-ui/core/InputBase'
import { Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import storeHooks from '../../common/storeHooks'
import { history } from '../../ourHistory'
import { SearchType } from '../../utils/types'

const Search: React.FC = () => {
    const { query, searchQ, user } = storeHooks()
    const search = (value) => {
        searchQ(value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        history.push({
            pathname: `/search/posts?q=${query}`,
            state: { query, user },
        })
    }

    const disableIfEmpty = query.length === 0
    const ifTyping = query.length > 0 ? '100px' : '-40px'
    const fadeIfempty = query.length > 0 ? 1 : 0.1

    return (
        <>
            <form onSubmit={onSubmit}>
                <InputBase
                    placeholder="Search…"
                    style={{ color: '#fff' }}
                    onChange={(e) => search(e.target.value)}
                    value={query}
                    inputProps={{ 'aria-label': 'search' }}
                />
                <Button
                    disabled={disableIfEmpty}
                    style={{
                        marginLeft: ifTyping,
                        opacity: fadeIfempty,
                        transition: 'ease 0.4s',
                        outline: 'none',
                        backgroundColor: 'transparent',
                    }}
                    size="small"
                    type="submit"
                    variant="outlined"
                    color="primary"
                >
                    <SearchIcon style={{ color: '#fff' }} />
                </Button>
            </form>
        </>
    )
}

export default Search
