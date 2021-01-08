import React, { Component } from 'react';
import axios from 'axios/index'

import Message from './Message'

import '../style/Chatbot.css'

class Chatbot extends Component {
    messagesEnd;

    constructor(props) {
        super(props);

        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this.state = {
            messages: []
        }
    }

    async df_text_query(text) {
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: text
                }
            } 
        };

        this.setState({messages: [...this.state.messages, says]});
        const res = await axios.post('/api/df_text_query', {text: text});

        for (let msg of res.data.fulfillmentMessages) {
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]});
        }
    }

    async df_event_query(event) {
        const res = await axios.post('/api/df_event_query', {event: event})

        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]});
        }
    }

    componentDidMount() {
        this.df_event_query('Welcome');
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behaviour: 'smooth' });
    }

    renderMessages(returnedMessages) {
        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
            });
        } else {
            return null;
        }
    }

    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }

    

    render() {
        return (
            <div className="flow">
                <div className="chatbot-container">
                    <div id="chatbot">
                        <p>chat with brewski_bot</p>
                        {this.renderMessages(this.state.messages)}
                        <div ref={(el) => { this.messagesEnd = el; }} 
                             style={{ float: 'left', clear: 'both'}}>
                        </div>
                        <input type="text" 
                               onKeyPress={this._handleInputKeyPress} 
                               placeholder="help me find beer..."
                                />
                    </div>
                </div>
            </div>
        )
    }
}

export default Chatbot;