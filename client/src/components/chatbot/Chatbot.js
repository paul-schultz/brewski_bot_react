import React, { Component } from 'react';
import axios from 'axios/index';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';

import Message from './Message';
import QuickReplies from './QuickReplies';
import Card from './Card';
// import GetNameCard from './GetNameCard';

import '../style/Chatbot.css';

const cookies = new Cookies();

class Chatbot extends Component {
    messagesEnd;

    constructor(props) {
        super(props);

        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);
        this.state = {
            messages: []
        };

        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' });
        }
        console.log(cookies.get('userID'));
    }

    async df_text_query(queryText) {
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: queryText
                }
            } 
        };

        this.setState({messages: [...this.state.messages, says]});
        const res = await axios.post('/api/df_text_query', {text: queryText, userID: cookies.get('userID') });

        let action = res.data.action
        let anyEntity = res.data.parameters.fields.any
        let cityEntity = res.data.parameters.fields["geo-city"]

        for (let msg of res.data.fulfillmentMessages) {
            // console.log(JSON.stringify(msg));
            if (anyEntity || cityEntity) {
                let ent = ''
                let searchBy = ''
                if (anyEntity !== undefined) {
                    ent = anyEntity.stringValue
                    searchBy = 'name'
                } else if (cityEntity !== undefined) {
                    ent = cityEntity.stringValue
                    searchBy = 'city'
                }
                let breweries = [];
                // google places key
                const key = "AIzaSyBzRPO1aFfHK14R7PFF__v_XTghJb_TQOI"
                const breweryDB = await axios.get(`https://api.openbrewerydb.org/breweries?by_${searchBy}=${ent}`)
                // console.log(breweryDB)
                for (var i = 0; i <= breweryDB.data.length - 1; i++) {
                    if (breweryDB.data[i].name && breweryDB.data[i].street && breweryDB.data[i].city && breweryDB.data[i].state && breweryDB.data[i].website_url) {
                        // implement google places API here  
                        const google = await axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${breweryDB.data[i].name}%20${breweryDB.data[i].city}&inputtype=textquery&fields=photos&key=${key}`)
                        breweries.push(
                            {
                            name: breweryDB.data[i].name,
                            street: breweryDB.data[i].street,
                            city: breweryDB.data[i].city,
                            state: breweryDB.data[i].state,
                            website_url: breweryDB.data[i].website_url,
                            mapsQuery: `https://www.google.com/maps/search/?api=1&query=${breweryDB.data[i].name}%20${breweryDB.data[i].city}`,
                            googleImage: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${google.data.candidates[0].photos[0].photo_reference}&key=${key}`
                        })
                    } 
                }
                says = {
                    speaks: 'bot',
                    msg: msg,
                    entity: ent,
                    action: action,
                    breweries: breweries
                }
            } else {
                says = {
                    speaks: 'bot',
                    msg: msg
                }
            }
            this.setState({messages: [...this.state.messages, says]});
        }
    }

    async df_event_query(eventName) {
        const res = await axios.post('/api/df_event_query', {event: eventName, userID: cookies.get('userID')})

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

    _handleQuickReplyPayload(event, payload, text) {
        event.preventDefault();
        event.stopPropagation();

        this.df_text_query(text);
    }

    renderCards(cards) {
        // console.log(cards)
        return cards.map((card, i) => <Card key={i} payload={card} /> );
    }

    renderOneMessage(message, i) {

        if (message.msg && message.msg.text && message.msg.text.text) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />

        } else if ( message.action ==='get-name' || message.action === 'get-city') {
            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1" style={{ marginBottom: '30px' }}>
                    <div style={{ overflow: 'hidden' }}>
                        <div style={{ overflow: 'auto', overflowY: 'scroll' }}>
                            <div style={{ height: 300, width: message.breweries.length * 270 }}>
                                {this.renderCards(message.breweries)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } else if (message.msg &&
            message.msg.payload &&
            message.msg.payload.fields &&
            message.msg.payload.fields.quick_replies 
        ) {
            return <QuickReplies
                text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
                key={i}
                replyClick={this._handleQuickReplyPayload}
                speaks={message.speaks}
                payload={message.msg.payload.fields.quick_replies.listValue.values}/>;
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

    

    render() {
        return (
            <div className="flow">
                <div className="chatbot-container">
                    <div id="chatbot">
                        <p>chat with brewski_bot</p>
                        {this.renderMessages(this.state.messages)}
                        {console.log(this.state.messages    )}
                        <div ref={(el) => { this.messagesEnd = el; }} 
                             style={{ float: 'left', clear: 'both'}}>
                        </div>
                        <div className="input">
                            <input type="text" 
                                style={{ margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%' }} 
                                onKeyPress={this._handleInputKeyPress} 
                                placeholder="help me find beer..."
                                    />
                        </div>                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Chatbot;