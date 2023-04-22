import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

function Outdated() {

    return (
        <div>
            <Header />
            <div className='content-wrap'>
                <h1>This Browser Is Not Supported!</h1>
                <p>You are currently using a browser or device that is not supported by our application.</p>
                <p>Please download a supported browser or us a different device in order to use our application.</p>
                <a href="https://www.mozilla.org/en-US/firefox/new/"><button>Mozilla Firefox Browser</button></a>
                <a href="https://www.google.com/chrome/"><button>Google Chrome Browser</button></a>
            </div>
            <Footer />
        </div>
    )
}
export default Outdated