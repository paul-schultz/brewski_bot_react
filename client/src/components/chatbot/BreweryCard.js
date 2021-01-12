import React from "react";

const BreweryCard = (props) => (
    <div style={{ float: "left", paddingRight: 30, width: 270 }}>
        <div className="card grey darken-2 z-depth-5" 
             style={{position: 'relative', height: 340, borderRadius: '10px'}}>
          <div className="card-image" style={{ width: 240, height: 150, overflow: 'hidden' }}>
            <img  style={{ filter: 'brightness(50%)'}}
                  alt={props.payload.name} 
                  src={props.payload.googleImage}></img>
            <span class="card-title left-align" style={{fontSize: '1.4em'}}>{props.payload.name}</span>
          </div>
          <div class="card-content">
              <p class="left-align" style={{fontSize: '1.2em'}}>
                {props.payload.street} <br></br> {props.payload.city}, {props.payload.state}
              </p>
          </div>
          <div className="card-action" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <a target="_blank" rel="noopener noreferrer" href={props.payload.website_url}>Website</a>
            <a target="_blank" rel="noopener noreferrer" href={props.payload.mapsQuery}>Directions</a>
          </div>
      </div>
    </div>
);

export default BreweryCard;
