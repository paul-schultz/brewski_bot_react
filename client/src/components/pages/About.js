import React from 'react';

import '../style/About.css'

import node_logo from '../ui/about/node_logo.png'
import react_logo from '../ui/about/react_logo.png'
import df from '../ui/about/df.png'
import ob_db from '../ui/about/ob_db.png'

const About = () => {
    return (
        <div className="about-container">
            <div><h2>born from the question:</h2></div>
            <div><p>"what would the combination of conversational AI and craft beer look like?"</p></div>
            <div><p>brewski_bot runs on node.js, react, google dialogflow, and the open brewery db api </p></div>
            <div>
                <div className="tech-stack">
                    <div className="tech-item">
                        <a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">
                            <img src={node_logo} alt="Node.js logo" style={{ filter: 'brightness(140%)' }}/>
                        </a>
                    </div>
                    <div className="tech-item">
                        <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                            <img src={react_logo} alt="React logo"/>
                        </a>
                    </div>
                    <div className="tech-item">
                        <a href="https://cloud.google.com/dialogflow" target="_blank" rel="noopener noreferrer">
                            <img src={df} alt="Google Dialogflow logo" style={{ filter: 'brightness(120%)' }}/>
                        </a>
                    </div>
                    <div className="tech-item">
                        <a href="https://www.openbrewerydb.org/" target="_blank" rel="noopener noreferrer">
                            <img src={ob_db} alt="Open Brewery DB Logo" style={{ filter: 'brightness(107%)' }}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;