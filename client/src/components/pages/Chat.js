import React from 'react';

import '../style/Chat.css';

import Chatbot from '../chatbot/Chatbot'

const Home = () => {
    return (    
        <div className="container">
            <Chatbot/>
        </div>
    )
}

export default Home;