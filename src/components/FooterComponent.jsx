import React from 'react'
import '../ComponentStyles.css';

const FooterComponent = () => {
    return (
        <footer className='modern-footer'>
            <div className='footer-content'>
                <div className='footer-section'>
                    <h3 className='footer-title'>Employee Management System</h3>
                    <p className='footer-text'>Streamline your workforce management with our modern solution</p>
                </div>
                <div className='footer-section'>
                    <p className='footer-copyright'>
                        © {new Date().getFullYear()} All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default FooterComponent
