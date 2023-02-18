import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Refresh from '../Refresh'

const Settings = () => {
    return (
        <div>
            <Refresh />
            <Header />
            <div className='content-wrap'>
                <h1>This will be the Settings page!</h1>
            </div>
            <Footer />
        </div>
    )
}

export default Settings