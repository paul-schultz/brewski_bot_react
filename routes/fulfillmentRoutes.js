const { WebhookClient } = require('dialogflow-fulfillment');

module.exports = app => {
    app.post('/', (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        function ngrokTest(agent) {
            agent.add('Oh it\'s working alright!');
        }

        function fallback(agent) {
            agent.add('I\'m sorry, could you rephrase that?');
        }
        let intentMap = new Map();

        intentMap.set('ngrokTest', ngrokTest);

        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    });
}