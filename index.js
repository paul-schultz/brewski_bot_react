const express = require('express');

const app = express();

app.get('/', (req, res) => {
     res.send({'here\'s': 'johnny'})
})

app.listen(5000);