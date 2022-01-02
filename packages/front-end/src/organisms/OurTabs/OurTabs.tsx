import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import PostList from '../../organisms/PostList'
import usePostsHook from '../../hooks/usePostHook'
import storeMethods from '../../hooks/useStoreHooks'
import { TabPanelPropsType } from '../../types'
import './style.css'

function TabPanel({ children, index, value, ...other }: TabPanelPropsType) {
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    )
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        padding: '30px 0px',
        // width: '300px',
    },
}))

export default function OurTabs() {
    // calls the posts api once, then we use storeMethods().posts to get the posts from store
    usePostsHook()
    const { posts, popPosts } = storeMethods()
    const classes = useStyles()
    const [value, setValue] = React.useState(1)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    return (
        <div className={classes.root}>
            <Grid container justify="center">
                <Grid item xs={12} sm={12} md={12} lg={9}>
                    <Tabs
                        variant="fullWidth"
                        className="tabMenu"
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab label="Trending" {...a11yProps(0)} />
                        <Tab label="Newest" {...a11yProps(1)} />
                    </Tabs>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={9}>
                    <TabPanel value={value} index={0}>
                        <PostList posts={popPosts} />
                    </TabPanel>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={9}>
                    <TabPanel value={value} index={1}>
                        <PostList posts={posts} />
                    </TabPanel>
                </Grid>
            </Grid>
        </div>
    )
}
