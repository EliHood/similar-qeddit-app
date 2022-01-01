import React, { Fragment } from 'react'
import styled from 'styled-components'
import storehooks from '../../hooks/useStoreHooks'
import OurLink from '../OurLink/OurLink'

const SearchCard = styled.div`
    width: 30%;
    padding: 10px;
    position: absolute;
    margin-top: 20px;
    background-color: #fff;
    border: 1px solid #000;
`
const NoPostsCard = styled.div`
    font-size: 12px;
    width: 30%;
    padding: 10px;
    position: absolute;
    margin-top: 20px;
    background-color: #fff;
    border: 1px solid #000;
`
const Gravatar = styled.img`
    padding: 0px 8px;
    width: 10px;
    height: 10px;
`

const SearchResults: React.FC = () => {
    const { postResults, query } = storehooks()

    return (
        <>
            {postResults.map((item) => (
                <SearchCard>
                    <Gravatar src={item.author.gravatar} />
                    <OurLink
                        style={{ fontSize: '12px' }}
                        to={{
                            pathname: `/post/${item.id}`,
                        }}
                        title={item.title}
                    />
                </SearchCard>
            ))}
            {query !== '' && postResults.length === 0 && (
                <NoPostsCard>No Posts Found</NoPostsCard>
            )}
        </>
    )
}

export default SearchResults
