import React from 'react'
import '../styles/footer.scss'

function Footer() {
    return(
        <div className='footer'>
            <div className='footer-left'>
                <p className='subtitle'>Left footer text.</p>
            </div>
            <div className='footer-center'>
                <p className='subtitle'>Center footer text.</p>
            </div>
            <div className='footer-right'>
                <p className='subtitle'>Right footer text.</p>
            </div>
        </div>
    )
}

export default Footer
