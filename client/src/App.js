import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';  
import './style/App.css';

import Pipes from './ui/Pipes';
import Brewery from './ui/Brewery';

import Landing from './pages/Landing';
import Home from './pages/Home';



function App() {
  return (
    <body>
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Home} />
          </div>
        </BrowserRouter>
      </div>
      <div className="background">
        <Pipes className="pipes"/>
        <Brewery className="brewery"/>
      </div>
    </body>
  );
}

export default App;
