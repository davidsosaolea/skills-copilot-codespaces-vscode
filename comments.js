// Create web server
const express = require('express');
const app = express();
// Create database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/commentDB', {useNewUrlParser: true, useUnifiedTopology: true});
// Create schema
const commentSchema = {
  name: String,
  comment: String
};
// Create model
const Comment = mongoose.model('Comment', commentSchema);
// Create parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
// Create view engine
app.set('view engine', 'ejs');
// Create static folder
app.use(express.static('public'));
// Create port
app.listen(3000, function() {
  console.log('Server started on port 3000');
});
// Create routes
app.get('/', function(req, res) {
  Comment.find({}, function(err, comments) {
    res.render('index', {
      comments: comments
    });
  });
});
app.post('/', function(req, res) {
  const comment = new Comment({
    name: req.body.name,
    comment: req.body.comment
  });
  comment.save(function(err) {
    if (!err) {
      res.redirect('/');
    }
  });
});