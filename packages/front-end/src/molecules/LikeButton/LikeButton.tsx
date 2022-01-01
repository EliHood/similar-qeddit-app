import React, { Fragment } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import styled from 'styled-components'
import { LikeButtonPropsType } from '@mfe/redux-store/src/types'

const LikeContainer = styled.div`
    cursor: pointer;
`

const LikeCount = styled.span`
    padding: 12px;
`
const FavIcon = styled(FavoriteIcon)`
    color: red;
    cursor: pointer;
    margin: -7px;
`
const FavBorderIcon = styled(FavoriteBorderIcon)`
    color: red;
    cursor: pointer;
    margin: -7px;
`

const LikeButton: React.FC<LikeButtonPropsType> = ({
    dislike,
    postId,
    like,
    likeCounts,
    type,
}) => (
    <>
        {type === 'liked' && (
            <LikeContainer onClick={() => dislike?.(postId!)}>
                <LikeCount>Likes {likeCounts} </LikeCount>
                <FavIcon />
            </LikeContainer>
        )}
        {type === 'unliked' && (
            <LikeContainer onClick={() => like?.(postId!)}>
                <LikeCount>Likes {likeCounts} </LikeCount>
                <FavBorderIcon />
            </LikeContainer>
        )}
    </>
)

export default LikeButton
