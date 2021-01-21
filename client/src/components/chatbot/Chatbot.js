import React, { Component } from 'react';
import axios from 'axios/index';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';

import Message from './Message';
import QuickReplies from './QuickReplies';
import BreweryCard from './BreweryCard';
import BeerCard from './BeerCard';
import RideCard from './RideCard';
import Dropdown from './Dropdown';

import 'materialize-css/dist/css/materialize.min.css';
import '../style/Chatbot.css';

const cookies = new Cookies();

class Chatbot extends Component {
    messagesEnd;

    constructor(props) {
        super(props);

        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);
        this._handleMenuPress = this._handleMenuPress.bind(this);
        this.state = {
            messages: [],
            clientToken: false,
            regenerateToken: 0
        };

        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' });
        }
        console.log(cookies.get('userID'));
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
        const request = {
            queryInput: {
                text: {
                    text: text,
                    languageCode: 'en-US',
                },
            }
        };
        await this.df_client_call(request);
    }

    async df_event_query(event) {
        const request = {
            queryInput: {
                event: {
                    name: event,
                    languageCode: 'en-US',
                },
            }
        };
        await this.df_client_call(request);
    }

    async df_client_call(request) {
        try {
            if (this.state.clientToken === false) {
                const res = await axios.get('/api/get_client_token');
                this.setState({ clientToken: res.data.token });
            }

            var config = {
                headers: {
                    'Authorization': "Bearer " + this.state.clientToken,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };

            const res = await axios.post(
                'https://dialogflow.googleapis.com/v2beta1/projects/' + process.env.REACT_APP_GOOGLE_PROJECT_ID + 
                '/agent/sessions/' + process.env.REACT_APP_DIALOGFLOW_SESSION_ID + cookies.get('userID') + ':detectIntent',
                request,
                config
            )

            console.log(res.data)

            let says = {};

            if (res.data.queryResult.fulfillmentMessages) {
                for (let msg of res.data.queryResult.fulfillmentMessages) {
                    says = {
                        speaks: 'bot',
                        msg: msg
                    }                    
                    this.setState({messages: [...this.state.messages, says]});
                }
            }

            this.setState({ regenerateToken: 0 });

        } catch (e) {
            console.log('error');

            if ( e.response.status === 401 && this.state.regenerateToken < 1 ) {
                this.setState({ clientToken: false });
                this.df_client_call(request)
            } else {
                let says = {
                    speaks: 'bot',
                    msg: {
                        text: {
                            text: "I'm sorry but it looks like one of my servers had a few too many. I need to shut down momentarily. Try again later."
                        }
                    } 
                };
                this.setState({messages: [...this.state.messages, says]});
            }
        }
    }

    componentDidMount() {
        this.df_event_query('Welcome');
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behaviour: 'smooth' });
    }

    _handleQuickReplyPayload(event, payload, text) {
        event.preventDefault();
        event.stopPropagation();

        this.df_text_query(text);
    }

    renderBreweryCards(cards) {
        return cards.map((card, i) => <BreweryCard key={i} payload={card} /> );
    }

    renderBeerCards(cards) {
        return cards.map((card, i) => <BeerCard key={i} payload={card} /> );
    }

    renderRideCards(cards) {
        return cards.map((card, i) => <RideCard key={i} payload={card} /> );
    }

    renderOneMessage(message, i) {

        if ( message.msg && message.msg.text && message.msg.text.text ) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
        } else if ( message.msg && message.msg.payload && message.msg.payload.beers ) {
        return <div key={i}>
            <div className="card-panel grey darken-3 z-depth-1" style={{ marginBottom: '-10px' }}>
                <div style={{ overflow: 'hidden' }}>
                    <div style={{ overflow: 'auto', overflowY: 'scroll' }}>
                        <div style={{ height: 300, width: message.msg.payload.beers.length * 270 }}>
                            {this.renderBeerCards(message.msg.payload.beers)}
                        </div>
                    </div>
                </div>
            </div>
        </div>        
        } else if ( message.msg && message.msg.payload && message.msg.payload.rides ) {
            return <div key={i}>
                <div className="card-panel grey darken-3 z-depth-1" style={{ marginBottom: '-10px' }}>
                    <div style={{ overflow: 'hidden' }}>
                        <div style={{ overflow: 'auto', overflowY: 'scroll' }}>
                            <div style={{ height: 300, width: message.msg.payload.rides.length * 270 }}>
                                {this.renderRideCards(message.msg.payload.rides)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } else if (message.msg && message.msg.payload && message.msg.payload.breweries) {
            return <div key={i}>
                <div className="card-panel grey darken-3 z-depth-1" style={{ marginBottom: '-10px' }}>
                    <div style={{ overflow: 'hidden' }}>
                        <div style={{ overflow: 'auto', overflowY: 'scroll' }}>
                            <div style={{ height: 300, width: message.msg.payload.breweries.length * 270 }}>
                                {this.renderBreweryCards(message.msg.payload.breweries)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } else if ( message.msg && message.msg.payload && message.msg.payload.quick_replies ) {
            return <QuickReplies
                text={message.msg.payload.text ? message.msg.payload.text : null}
                key={i}
                replyClick={this._handleQuickReplyPayload}
                speaks={message.speaks}
                payload={message.msg.payload.quick_replies}/>;
        }
    }

    renderMessages(returnedMessages) {
        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return this.renderOneMessage(message, i);
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

    _handleMenuPress(event, text) {
        event.preventDefault();
        event.stopPropagation();

        this.df_text_query(text);
    }

    render() {
        return (
            <div className="flow">        
                <div className="chatbot-container">
                    <div id="chatbot">
                        <p>chat with brewski_bot</p>
                        {this.renderMessages(this.state.messages)}
                        {console.log(this.state.messages)}
                        <div ref={(el) => { this.messagesEnd = el; }} 
                             style={{ float: 'left', clear: 'both'}}>
                        </div>
                        <div className="input">
                            <input type="text" 
                                style={{ margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%' }} 
                                onKeyPress={this._handleInputKeyPress} 
                                placeholder="help me find beer... "
                                    />  
                        </div>      
                              
                    </div>
                </div>
                <div className="drop">
                    <Dropdown className="dropdown-menu"
                              replyClick={this._handleMenuPress} 
                              />     
                </div>  
            </div>
        )
    }
}

export default Chatbot;