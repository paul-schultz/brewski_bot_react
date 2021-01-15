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

        let action = res.data.action;
        let anyEntity = res.data.parameters.fields.any;
        let cityEntity = res.data.parameters.fields["geo-city"];

        for (let msg of res.data.fulfillmentMessages) {

            // Change JSON response structure dependent on action
                   if (action === 'get-name' || action === 'get-city') {
                console.log(`Action: ${action}`)
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
                const cors = "http://localhost:8080/"
                const key = process.env.REACT_APP_GOOGLE_PLACES_KEY
                const breweryDB = await axios.get(`https://api.openbrewerydb.org/breweries?by_${searchBy}=${ent}`)
                // console.log(breweryDB)
                for (var i = 0; i <= breweryDB.data.length - 1; i++) {
                    if (breweryDB.data[i].name && breweryDB.data[i].name.length < 32 && breweryDB.data[i].street && breweryDB.data[i].city && breweryDB.data[i].state && breweryDB.data[i].website_url) {
                        // implement google places API here  
                        const google = await axios.get(`${cors}https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${breweryDB.data[i].name}%20${breweryDB.data[i].city}&inputtype=textquery&fields=photos&key=${key}`)
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

            // Trigger get-beer action
            } else if (action === 'get-beer') {
                let ent = anyEntity.stringValue;
                const utID = process.env.REACT_APP_UNTAPPD_ID;
                const utSecret = process.env.REACT_APP_UNTAPPD_SECRET;
                const untappdURL = `https://api.untappd.com/v4/search/beer?q=${ent}&client_id=${utID}&client_secret=${utSecret}` ;
                let beers = [];

                const beerDB = await axios.get(untappdURL);
                console.log(beerDB)
                for (var i = 0;  i <= 4; i++) {
                    beers.push({
                        name: beerDB.data.response.beers.items[i].beer.beer_name,
                        description: beerDB.data.response.beers.items[i].beer.beer_description,
                        brewery: beerDB.data.response.beers.items[i].brewery.brewery_name,
                        beer_style: beerDB.data.response.beers.items[i].beer.beer_style,
                        abv: beerDB.data.response.beers.items[i].beer.beer_abv,
                        image: beerDB.data.response.beers.items[i].beer.beer_label,
                        url: beerDB.data.response.beers.items[i].brewery.contact.url
                    })
                }
                says = {
                    speaks: 'bot',
                    msg: msg,
                    entity: ent,
                    action: action,
                    beers: beers
                }
            } else if (action === 'get-ride') {
                let rides = [];

                rides.push({
                    title: 'Uber',
                    image: 'https://images.ctfassets.net/37l920h5or7f/5veFGObZjqmQY8qKu6auAW/abe271ddb25ae87d1212a4da798d3229/asset-030.jpg?fm=jpg&q=70&w=1600',
                    link: 'https://auth.uber.com/login/?breeze_local_zone=phx3&next_url=https%3A%2F%2Fm.uber.com%2Flooking%3F_ga%3D2.243517442.640375780.1610728947-973137274.1609435436&state=Z16bRV1Gw6C1gEXZANKkwBg-antk71SbGUeGmAKfO6w%3D',
                })

                rides.push({
                    title: 'Lyft',
                    image: 'https://lh3.googleusercontent.com/pw/ACtC-3dFlWRhFhZzgLNnPvX9k0cq3GcVHz57FdpCEZrXV4lMvHTFl0hYtMwZsfyS1m5O-SxIZf3rssT2YfqEjYCwAv3ggWtP5stt2XNuXjQyo_ym3Y1niD9cUCPEG8aZzJbMkJDQwJXT0iQXKEsvgBqALhmM=w1136-h639-no?authuser=0',
                    link: 'https://ride.lyft.com/',
                })

                says = {
                    speaks: 'bot',
                    msg: msg,
                    action: action,
                    rides: rides
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

        } else if ( message.action ==='get-name' || message.action === 'get-city' ) {
            return <div key={i}>
                <div className="card-panel grey darken-3 z-depth-1" style={{ marginBottom: '-10px' }}>
                    <div style={{ overflow: 'hidden' }}>
                        <div style={{ overflow: 'auto', overflowY: 'scroll' }}>
                            <div style={{ height: 300, width: message.breweries.length * 270 }}>
                                {this.renderBreweryCards(message.breweries)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        } else if ( message.action === 'get-beer' ) {
            return <div key={i}>
                <div className="card-panel grey darken-3 z-depth-1" style={{ marginBottom: '-10px' }}>
                    <div style={{ overflow: 'hidden' }}>
                        <div style={{ overflow: 'auto', overflowY: 'scroll' }}>
                            <div style={{ height: 300, width: message.beers.length * 270 }}>
                                {this.renderBeerCards(message.beers)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        } else if ( message.action === 'get-ride' ) {
            return <div key={i}>
                <div className="card-panel grey darken-3 z-depth-1" style={{ marginBottom: '-10px' }}>
                    <div style={{ overflow: 'hidden' }}>
                        <div style={{ overflow: 'auto', overflowY: 'scroll' }}>
                            <div style={{ height: 300, width: message.rides.length * 270 }}>
                                {this.renderRideCards(message.rides)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } else if ( message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.quick_replies ) {
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
                    <Dropdown className="dropdown-menu"/>     
                </div>  
            </div>
        )
    }
}

export default Chatbot;