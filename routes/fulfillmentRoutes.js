const { WebhookClient } = require('dialogflow-fulfillment');
const { Payload } = require("dialogflow-fulfillment");
const axios = require('axios/index');
const config = require('../config/keys')

module.exports = app => {
    app.post('/', (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        async function getBreweriesName(agent){
            try {
                let ent = agent.parameters.any;
                let searchBy = 'name';

                const result = await axios.get(`https://api.openbrewerydb.org/breweries?by_${searchBy}=${ent}`);
                const brewery = result.data;
                const key = config.googlePlacesKey;

                let breweries = [];        

                for (var i = 0; i <= brewery.length - 1; i++) {
                    if (result.data[i].name && result.data[i].name.length < 32 && result.data[i].street && result.data[i].city && result.data[i].state && result.data[i].website_url) {
                        const google = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${result.data[i].name}%20${result.data[i].city}&inputtype=textquery&fields=photos&key=${key}`)
                        breweries.push(
                            {
                                peepee: "peepee",
                                name: JSON.stringify(result.data[i].name).replace(/['"]+/g, ''),
                                street: JSON.stringify(result.data[i].street).replace(/['"]+/g, ''),
                                city: JSON.stringify(result.data[i].city).replace(/['"]+/g, ''),
                                state: JSON.stringify(result.data[i].state).replace(/['"]+/g, ''),
                                website_url: JSON.stringify(result.data[i].website_url).replace(/['"]+/g, ''),
                                mapsQuery: `https://www.google.com/maps/search/?api=1&query=${result.data[i].name}%20${result.data[i].city}`,
                                googleImage: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${google.data.candidates[0].photos[0].photo_reference}&key=${key}`
                            }
                        )
                    }
                }
                
                payload = {
                    breweries: breweries
                }

                if (brewery === undefined) {
                    agent.add(`that's a no go fam`);
                } else {
                    agent.add(
                        new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true})
                    );
                    agent.add((`Here is a list of breweries matching the keyword(s) "${ent}." Say "Menu" to perform a new search!`));
                }
            } catch(e) {
                console.log(e)
            }
        }

        async function getBreweriesCity(agent){
            try {
                let ent = agent.parameters["geo-city"];
                let searchBy = 'city';

                const result = await axios.get(`https://api.openbrewerydb.org/breweries?by_${searchBy}=${ent}`);
                const brewery = result.data;
                const key = config.googlePlacesKey;

                let breweries = [];        

                for (var i = 0; i <= brewery.length - 1; i++) {
                    if (result.data[i].name && result.data[i].name.length < 32 && result.data[i].street && result.data[i].city && result.data[i].state && result.data[i].website_url) {
                        const google = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${result.data[i].name}%20${result.data[i].city}&inputtype=textquery&fields=photos&key=${key}`)
                        breweries.push(
                            {
                                peepee: "peepee",
                                name: JSON.stringify(result.data[i].name).replace(/['"]+/g, ''),
                                street: JSON.stringify(result.data[i].street).replace(/['"]+/g, ''),
                                city: JSON.stringify(result.data[i].city).replace(/['"]+/g, ''),
                                state: JSON.stringify(result.data[i].state).replace(/['"]+/g, ''),
                                website_url: JSON.stringify(result.data[i].website_url).replace(/['"]+/g, ''),
                                mapsQuery: `https://www.google.com/maps/search/?api=1&query=${result.data[i].name}%20${result.data[i].city}`,
                                googleImage: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${google.data.candidates[0].photos[0].photo_reference}&key=${key}`
                            }
                        )
                    }
                }
                
                payload = {
                    breweries: breweries
                }

                if (brewery === undefined) {
                    agent.add(`that's a no go fam`);
                } else {
                    agent.add(
                        new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true})
                    );
                    agent.add((`Here is a list of breweries in "${ent}, ${agent.parameters["geo-state"]}." Say "Menu" to perform a new search!`));
                }
            } catch(e) {
                console.log(e)
            }
        }

        async function getBeersInfo(agent){
            try {
                let ent = agent.parameters.any;
                
                const utID = config.untappdID;
                const utSec = config.untappdSecret;

                const result = await axios.get(`https://api.untappd.com/v4/search/beer?q=${ent}&client_id=${utID}&client_secret=${utSec}`)

                let beers = [];        

                for (var i = 0; i <= 5; i++) {
                    beers.push(
                        {
                            peepee: "peepee",
                            name: JSON.stringify(result.data.response.beers.items[i].beer.beer_name).replace(/['"]+/g, ''),
                            description: JSON.stringify(result.data.response.beers.items[i].beer.beer_description).replace(/['"]+/g, ''),
                            brewery: JSON.stringify(result.data.response.beers.items[i].brewery.brewery_name).replace(/['"]+/g, ''),
                            beer_style: JSON.stringify(result.data.response.beers.items[i].beer.beer_style).replace(/['"]+/g, ''),
                            abv: JSON.stringify(result.data.response.beers.items[i].beer.beer_abv).replace(/['"]+/g, ''),
                            image: JSON.stringify(result.data.response.beers.items[i].beer.beer_label).replace(/['"]+/g, ''),
                            url: JSON.stringify(result.data.response.beers.items[i].brewery.contact.url).replace(/['"]+/g, '')
                        }
                    )
                }
                
                payload = {
                    beers: beers
                }

                if (result === undefined) {
                    agent.add(`that's a no go fam`);
                } else {
                    agent.add(
                        new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true})
                    );
                    agent.add((`Here is a list of beers matching the keyword(s) "${ent}." Say "Menu" to perform a new search!`));
                }
            } catch(e) {
                console.log(e)
            }
        }

        async function getUberLyft(agent){
            try {
                let rides = [];        

                rides.push({
                    title: 'Uber',
                    image: 'https://images.ctfassets.net/37l920h5or7f/5veFGObZjqmQY8qKu6auAW/abe271ddb25ae87d1212a4da798d3229/asset-030.jpg?fm=jpg&q=70&w=1600',
                    link: 'https://auth.uber.com/login/?breeze_local_zone=phx3&next_url=https%3A%2F%2Fm.uber.com%2Flooking%3F_ga%3D2.243517442.640375780.1610728947-973137274.1609435436&state=Z16bRV1Gw6C1gEXZANKkwBg-antk71SbGUeGmAKfO6w%3D'
                })

                rides.push({
                    title: 'Lyft',
                    image: 'https://lh3.googleusercontent.com/pw/ACtC-3dFlWRhFhZzgLNnPvX9k0cq3GcVHz57FdpCEZrXV4lMvHTFl0hYtMwZsfyS1m5O-SxIZf3rssT2YfqEjYCwAv3ggWtP5stt2XNuXjQyo_ym3Y1niD9cUCPEG8aZzJbMkJDQwJXT0iQXKEsvgBqALhmM=w1136-h639-no?authuser=0',
                    link: 'https://ride.lyft.com/'
                })
                
                payload = {
                    rides: rides
                }

                if (rides === undefined) {
                    agent.add(`that's a no go fam`);
                } else {
                    agent.add(
                        new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true})
                    );
                    agent.add((`I've got you covered! Call an Uber or Lyft using one of the following links. Have a safe evening!`));
                }
            } catch(e) {
                console.log(e)
            }
        }

        function fallback(agent) {
            agent.add('I\'m sorry, could you rephrase that?');
        }

        let intentMap = new Map();

        intentMap.set('get-name', getBreweriesName);
        intentMap.set('get-city', getBreweriesCity);
        intentMap.set('get-beer', getBeersInfo);
        intentMap.set('get-ride', getUberLyft);
        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    });
}