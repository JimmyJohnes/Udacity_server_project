// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
app.listen(port,function()
{
    console.log(`listening on ${port}`);
});

app.get('/getProjData',function(req,res){res.send(projectData);});
app.post('/setProjData',function(req,res)
{
    projectData= req.body;
    res.status(200);
    res.send(projectData);
})
