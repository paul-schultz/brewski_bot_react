import React from 'react';
import { Link } from 'react-router-dom';

import './style/Nav.css'

import Logo from './ui/Logo'

const Nav = () => (
        <div className="nav-container">
            <div className="nav nav-left">
                <div><Logo className="logo"/></div>
                <div>
                    <p className="logo-text">
                        <Link to={'/'}>brewski_bot</Link>
                    </p>
                </div>
            </div>
            <div className="nav-right">
                <p><Link to={'/home'}>Home</Link></p> 
                <p><Link to={'/about'}>About</Link></p> 
                <p><Link to={'/contact'}>Contact</Link></p> 
            </div>
        </div>
)

export default Nav;