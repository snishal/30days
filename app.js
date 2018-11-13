//setup express
var express = require('express');
var app = express();

//setup mongoose
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/30days", { useNewUrlParser: true });

//MongoDb schema and model
var postSchema = new mongoose.Schema({ body: String });
var Post = mongoose.model('Post', postSchema);

//setup body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//use ejs as template engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//serve static assets
app.use(express.static('public'));

//routes
//default route
app.get("/", (req, res) => {
  res.render('index');
});

//about route
app.get("/about", (req, res) => {
  res.render('about');
});

//faq route
app.get("/faq", (req, res) => {
  res.render('faq');
});

//post route
app.post('/addpost', (req, res) => {
    var postData = new Post(req.body);
    postData.save().then( result => {
        res.redirect('/');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});

//listen
app.listen(8080, () => {
	console.log('Server listening on port 8080');
})
