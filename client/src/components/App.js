import React from 'react';
import { BrowserRouter, Route, useLocation } from 'react-router-dom';  
import { Helmet } from 'react-helmet'
import './style/App.css';

import Nav from './Nav'

import Pipes from './ui/Pipes';
import Brewery from './ui/Brewery';

import Landing from './pages/Landing';
import Home from './pages/Home';

const TITLE = 'brewski_bot'

const NavBar = () => {
  const location = useLocation()
  return location.pathname !== '/' ? <Nav /> : null
}

function App() {
  return (
    <body>
      <Helmet>
          <title>{ TITLE }</title>
      </Helmet>
      <div>
        <BrowserRouter>
          <div>
            <NavBar /> 
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Home} />
          </div>
        </BrowserRouter>
      </div> 
      <div className="background">
        <Pipes className="pipes"/>
        <Brewery className="brewery"/>
      </div>
      
      <div className="foot">Created by Paul Schultz - 2020 - https://github.com/paul-schultz </div>
    </body>
  );
}

export default App;
