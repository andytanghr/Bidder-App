const express = require('express');
const app = express();

const session = require('express-session');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res, next) => {
  res.send("site under construction");
})


app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))


app.listen(port, ()=> {
  console.log(`Server listening on port`)
})
