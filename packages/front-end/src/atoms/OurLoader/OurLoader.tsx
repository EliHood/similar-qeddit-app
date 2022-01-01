import React from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const OurLoader = () => (
    <Loader
        style={{ margin: '20px 0px' }}
        type="TailSpin"
        color="#000"
        height={50}
        width={50}
    />
)

export default OurLoader
