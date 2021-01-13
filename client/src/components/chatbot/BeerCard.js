import React from "react";

const BeerCard = (props) => (
    <div style={{ float: "left", paddingRight: 30, width: 270 }}>
        <div className="card grey darken-2 z-depth-5" 
             style={{ position: 'relative', height: 380, borderRadius: '10px'}}>
          <div className="card-image" style={{ width: 240, height: 150, overflow: 'hidden' }}>
            <img  style={{ filter: 'brightness(50%)' }}
                  alt={props.payload.name} 
                  src={props.payload.image}></img>
            <span className="card-title left-align" style={{ fontSize: '1.4em'}}>{props.payload.name}</span>
          </div>
          <div className="card-content">
              <p className="left-align"style={{ fontSize: '1.25em'}}>
                {props.payload.brewery}   
              </p>
              <p className="left-align" style={{ fontSize: '1em', color: '#E69900'}}>
                       {props.payload.beer_style}<br></br> 
                  ABV: {props.payload.abv}%
              </p>
          </div>
          <div className="card-action center-align" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <a target="_blank" rel="noopener noreferrer" href={props.payload.url}>Brewery Website</a>
          </div>
      </div>
    </div>
);

export default BeerCard;
