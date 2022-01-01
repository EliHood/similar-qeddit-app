import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import GridHoc from '../../hoc/grid'

const NotFoundImage = styled.img`
    margin: 30px 0px;
    max-width: 800px;
`

const NotFound: React.FC = () => (
    <>
        <Typography variant="h4"> No Page Found :(</Typography>
        <NotFoundImage src="https://s3.amazonaws.com/media.thecrimson.com/photos/2019/12/23/142555_1341777.png" />
    </>
)
export default GridHoc(NotFound)
