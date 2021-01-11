import React from 'react';

import { Link } from 'react-router-dom';

import '../style/Landing.css'
import Logo from '../ui/Logo'

const Landing = () => {
    return (
        <div className="container">
            <div className="logo-container">
                <div>
                    <Logo className="brewski"/>
                </div>
                <div>
                    <p className="header">brewski_bot</p>                
                </div>
            </div>
            <p className="subheader">The Virtual Drinking Buddy</p>
            <button className="learn-more">
                <Link to={'/home'}
                      style={{ textDecoration: 'none', color: 'inherit' }}>
                    Enter Site
                </Link>
            </button>
        </div>
    )
}

export default Landing;