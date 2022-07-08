//jshint esversion:6

const express = require("express");
const app = express();
const ejs = require("ejs");
const _ = require('lodash')

// Port

const PORT = process.env.PORT || 3000;

// Body Parser
app.use(express.urlencoded({ extended: true }))
// Set EJS Views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
// Serve Static Files
app.use(express.static('public'));

// Fake Database
const entries = [
  {
    title: "Hello World",
    post: "It looks like I was finally able to build a very simple blog. We'll call this Blog App v1. Users have the ability to create new posts and display them on the home page. What I would like to add to this is the ability to edit and update blog entries. I think it would also be nice to add timestamps and sort these entries by date."
  },
  {
    title: "Let's Get Some Lorem Up In Here!",
    post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis tellus eu quam feugiat mollis. Mauris orci urna, cursus in rutrum et, gravida a nisi. Suspendisse imperdiet tincidunt tortor, ut gravida nibh porttitor sit amet. Pellentesque sed semper neque, ut interdum dui. Nulla ligula arcu, consequat ut quam vel, maximus convallis sapien. Donec dignissim volutpat semper. Quisque sem metus, semper a risus sed, maximus iaculis lacus. Suspendisse porta leo facilisis ultricies consectetur. Maecenas tristique elit eu erat pretium laoreet. Duis luctus lorem vel ipsum blandit, id laoreet ante tempus. Nam molestie elementum felis. Vestibulum nulla dui, bibendum sit amet viverra at, tristique non sem."
  }
]

// Servers/Routing
// Root
app.get('/', (req, res) => {
  res.render('home', { entries })
})
// About
app.get('/about', (req, res) => {
  res.render('about')
})
// Contact
app.get('/contact', (req, res) => {
  res.render('contact', { contactContent })
})
// Compose
app.get('/compose', (req, res) => {
  res.render('compose')
})
// Post blog entry to server
app.post('/', (req, res) => {
  const { title, post } = req.body;
  const newEntry = { title, post }
  entries.push(newEntry)
  res.redirect('/')
})
// GET POST DETAILS PAGE
app.get('/posts/:id', (req, res) => {
  const id = _.lowerCase(req.params.id);
  const foundEntry = entries.find(entry => _.lowerCase(entry.title) === id)
  res.render('post', { entry: foundEntry })
})



app.listen(PORT, function () {
  console.log("LISTENING ON PORT 3000");
});
