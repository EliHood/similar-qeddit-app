import React from 'react'
import Grid from '@material-ui/core/Grid'
import { postActions } from '@mfe/redux-store/src'
import { useDispatch } from 'react-redux'
import PostForm from '../../molecules/CreatePost'
import GridHoc from '../../hoc/grid'
import OurTabs from '../../organisms/OurTabs'
import useInputChange from '../../hooks/useInputChangeHook'
import OurError from '../../molecules/OurError'
import storeMethods from '../../hooks/useStoreHooks'
import OurWrapper from '../../atoms/OurWrapper'

const Dashboard: React.FC = () => {
    const dispatch = useDispatch()
    const inputData = {
        addTitle: (data: string) => dispatch(postActions.addTitle(data)),
        addContent: (data: string) => dispatch(postActions.addContent(data)),
    }
    const handleInputChange = useInputChange(inputData)
    const {
        ourTitle,
        titleError,
        ourPostContent,
        ourBodyError,
        errPost,
        createPost,
    } = storeMethods()
    const onSubmit = (e: any) => {
        e.preventDefault()
        const postData = { ourTitle, ourPostContent }
        createPost(postData)
    }

    const isEnabled = !(titleError === true && ourBodyError === true)

    return (
        <>
            <OurWrapper>
                <Grid justify="center" container>
                    <Grid item lg={9} xs={11}>
                        {errPost && <OurError />}
                        <PostForm
                            title={ourTitle}
                            postContent={ourPostContent}
                            handleTitleChange={handleInputChange}
                            handleContentChange={handleInputChange}
                            onSubmit={onSubmit}
                            disButton={isEnabled}
                            titleError={titleError}
                            bodyError={ourBodyError}
                        />
                    </Grid>
                </Grid>

                <br />

                <OurTabs />
            </OurWrapper>
        </>
    )
}

export default GridHoc(Dashboard)
// will be useful for unit testing.
export { Dashboard as DashboardComponent }
