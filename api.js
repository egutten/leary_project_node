var dotenv            = require("dotenv").config(),
  express             = require("express"),
  pg                  = require("pg"),
  cors                = require("cors"),
  bodyParser          = require("body-parser"),
  session             = require("express-session"),
  passport            = require("./config/passport"),
  db                  = require("./models"),
  LocalStrategy       = require("passport-local"),
  app                 = express();

//Allowed cors in localhost
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true, cookie: {maxAge: 60000} }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/api-routes.js")(app);

//Server
db.sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("API listening on http://localhost:8080");
  });
});
