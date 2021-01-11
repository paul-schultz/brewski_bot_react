import React from "react";

const Card = (props) => (
    <div style={{ float: "left", paddingRight: 30, width: 270 }}>
        <div className="card" style={{position: 'relative', height: 400}}>
            <div className="card-image" style={{ width: 240, height: 150, overflow: 'hidden' }}>
                <img alt={props.payload.name} 
                     src={props.payload.googleImage}
                      />
            </div>
            <div className="card-content">
                <p><a style={{color: 'inherit'}} target="_blank" rel="noopener noreferrer" href={props.payload.website_url}>{props.payload.name}</a></p>
                <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0 }}>{props.payload.street} {props.payload.city}, {props.payload.state} </div>
            </div>
            <div className="card-action" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <a target="_blank" rel="noopener noreferrer" href={props.payload.mapsQuery} >Get Directions</a>
            </div>
        </div>
    </div>
);

export default Card;
