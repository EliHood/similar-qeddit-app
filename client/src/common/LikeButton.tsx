import React, { Fragment } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { LikeButtonPropsType } from '../utils/types';

const LikeButton: React.FC<LikeButtonPropsType> = ({
    dislike, postId, like, likeCounts, type,
}) => (
    <>
        {type === 'liked' && (
            <>
                <span style={{ cursor: 'pointer' }} onClick={() => dislike?.(postId!)}>
                    <span style={{ padding: '12px' }}>
                        Likes
                        {' '}
                        {' '}
                        {likeCounts}
                    </span>
                    <FavoriteIcon style={{ color: 'red', cursor: 'pointer', margin: '-7px' }} />
                </span>
            </>
        )}
        {type === 'unliked' && (
            <>
                <span onClick={() => like?.(postId!)}>
                    <span style={{ padding: '12px' }}>
                        Likes
                        {' '}
                        {' '}
                        {likeCounts}
                    </span>
                    <FavoriteBorderIcon style={{ color: 'red', cursor: 'pointer', margin: '-7px' }} />
                </span>
            </>
        )}
    </>
);

export default LikeButton;
