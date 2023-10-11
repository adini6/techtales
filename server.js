const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const userRoutes = require('./routes/userroute');
const blogRoutes = require('./routes/blogroute');
require('dotenv').config();


const sequelize = require('./config/connection');
const { User, BlogPost, Comment } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

//middlewares
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

//routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

//handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//session setup
const sess =  {
    secret: process.env.SESSION_SECRET || 'development_secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});