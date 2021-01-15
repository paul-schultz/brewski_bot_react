import React from "react";

const RideCard = (props) => (
    <div style={{ float: "left", paddingRight: 30, width: 270 }}>
        <div className="card grey darken-2 z-depth-5" 
             style={{ position: 'relative', height: 380, borderRadius: '10px'}}>
          <div className="card-image" style={{ width: 240, height: 150, overflow: 'hidden' }}>
            <img  style={{ filter: 'brightness(85%)' }}
                  alt={props.payload.title} 
                  src={props.payload.image}></img>
            <span className="card-title left-align" style={{ fontSize: '1.4em'}}>{props.payload.name}</span>
          </div>
          <div className="card-content">
              <p className="left-align"style={{ fontSize: '1.25em'}}>
                Get home safely tonight with {props.payload.title}!   
              </p>
          </div>
          <div className="card-action center-align" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <a target="_blank" rel="noopener noreferrer" href={props.payload.link}>Get a Ride</a>
          </div>
      </div>
    </div>
);

export default RideCard;
