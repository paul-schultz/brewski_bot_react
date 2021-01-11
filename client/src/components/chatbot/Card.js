import React from "react";

const Card = (props) => (
    <div style={{ float: "left", paddingRight: 30, width: 270 }}>
        <div className="card" style={{height: 400}}>
            <div className="card-image" style={{ position: 'relative', width: 240 }}>
                <img alt={props.payload.name} 
                     src="https://lh3.googleusercontent.com/pw/ACtC-3cqweJufDQ7UlHgXgqLYONaLCi-40wMrgeNStHqDj76s0TnxEd8sIh497owOxKgGUCId9lmEwzk82ktSi07ZsC32NPPRxgZTJYIYsM6chY413Kl7AHWqYC462pwQ5LtHSvLS6UEemdfe6M94_QgsbAv=w909-h476-no?authuser=0" />
            </div>
            <div className="card-content">
                <p><a target="_blank" rel="noopener noreferrer" href={props.payload.website_url}>{props.payload.name}</a></p>
                <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0 }}>{props.payload.street} {props.payload.city}, {props.payload.state} </div>
            </div>
            <div className="card-action" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <a target="_blank" rel="noopener noreferrer" href="/" >GET DIRECTIONS</a>
            </div>
        </div>
    </div>
);

export default Card;
