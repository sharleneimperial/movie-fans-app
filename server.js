require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isloggedIn');
const methodOverride = require('method-override');
const db = require('./models');

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log(SECRET_SESSION);

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(methodOverride('_method'))

app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());  
app.use(passport.session());  

app.use((req,res,next)=> {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})


//start of website
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/auth', require('./controllers/auth'));
app.use('/movies', require('./controllers/movies'));

app.get('/profile', isLoggedIn, async (req, res) => {
  try {
    const { id, name, email } = req.user.get(); 

    const currentUser = await db.User.findOne({
      where: {id},
      include: [db.Movie]
    });

    console.log(currentUser.Movies);

  console.log("PROFILE");
  res.render('profile', { id, name, email, movies: currentUser.Movies});
  } catch (err) {
    console.log(err);
  }
  
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;