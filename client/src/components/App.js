import React from 'react';
import { BrowserRouter, Route, useLocation } from 'react-router-dom';  
import { Helmet } from 'react-helmet'
import './style/App.css';

import Nav from './Nav'

import Pipes from './ui/Pipes';
import Brewery from './ui/Brewery';

import Landing from './pages/Landing';
import Chat from './pages/Chat';
import About from './pages/About';
import Contact from './pages/Contact';

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
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
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
