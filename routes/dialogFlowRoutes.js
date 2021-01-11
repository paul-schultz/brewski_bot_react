const chatbot = require('../chatbot/chatbot')

module.exports = app => {
     app.use(function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "http://localhost:3000/api/df_text_query");// update to match the domain you will make the request from
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          next();
   });

    app.get('/', (req, res) => {
        res.send({'here\'s': 'johnny'})
   })
   
   app.post('/api/df_text_query', async (req, res) => {

        let responses = await chatbot.textQuery(req.body.text, req.body.userID, req.body.parameters);
        res.send(responses[0].queryResult);
   })
   
   app.post('/api/df_event_query', async (req, res) => {
        
    let responses = await chatbot.eventQuery(req.body.event, req.body.userID, req.body.parameters);
    res.send(responses[0].queryResult);
   })
}