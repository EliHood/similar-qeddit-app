import React, { useEffect, useRef, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import EditProfileForm from '../forms/editProfile/editForm'
import GridHoc from '../hoc/grid'
import storeMethods from '../../common/storeHooks'
import OurWrapper from '../../common/OurWrapper'

const EditProfile: React.FC = () => {
    const [bio, setBio] = useState<string>('')
    const [gravatar, setGravatar] = useState<string>('')
    const mounted = useRef<Object>()
    const {
        getProfile,
        profileData,
        userErr,
        message,
        updateProfile,
    } = storeMethods()
    useEffect(() => {
        if (!mounted.current) {
            getProfile()
            mounted.current = true
        } else {
            setBio(bio || profileData.bio)
            setGravatar(gravatar || profileData.gravatar)
        }
    })
    const handleSubmit = React.useCallback(
        (e: any) => {
            e.preventDefault()
            const formData = {
                bio,
                gravatar,
            }
            updateProfile(formData)
        },
        [updateProfile]
    )

    return (
        <OurWrapper>
            <Grid container justify="center">
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    {userErr && (
                        <Typography style={{ color: 'red' }}>
                            {message || userErr}
                        </Typography>
                    )}
                    {message && (
                        <Typography style={{ color: 'green' }}>
                            {message || userErr}
                        </Typography>
                    )}
                    <EditProfileForm
                        handleBio={(e) => setBio(e.target.value)}
                        handleGravatar={(e) => setGravatar(e.target.value)}
                        onSubmit={handleSubmit}
                        bio={bio}
                        gravatar={gravatar}
                    />
                </Grid>
            </Grid>
        </OurWrapper>
    )
}

export default GridHoc(EditProfile)
