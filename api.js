var dotenv            = require("dotenv").config(),
  express             = require("express"),
  pg                  = require("pg"),
  cors                = require("cors"),
  bodyParser          = require("body-parser"),
  session             = require("express-session"),
  passport            = require("./config/passport"),
  db                  = require("./models"),
  LocalStrategy       = require("passport-local"),
  User                = require("./models/user"),
  app                 = express();

//Allowed cors in localhost
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/api-routes.js")(app);
 
// //Database Config .env
// const config = {
//   user: process.env.PG_USER,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASS
// };

// Read users
// router.get("/api", async function(req, res){
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   }
//   catch(err) {
//     res.status(500);
//     res.json({error: err});
//   }
// });
// 
// // Create a user
// router.post("/signup", async function(req, res){
//   try {
//     const user = await User.create(
//       {
//         email: req.body.email,
//         password: req.body.password,
//         company_name: req.body.password
//       }
//     );
//     res.json(user);
//   }
//   catch(err) {
//     res.status(500);
//     res.json({error: err});
//   }
// });

// const pool = new pg.Pool(config);
// 
// pool.connect();
// 
// app.get("/api", async function(req, res, next) {
//   try {
//     const results = await pool.query("SELECT * FROM users");
//     return res.json(results.rows);
//   } catch (err) {
//     return next(err);
//   }
// });
// 
// app.post("/signup", async function(req, res, next) {
//   try {
//     const result = await pool.query(
//       "INSERT INTO users (company_name,email,password) VALUES ($1,$2,$3) RETURNING *",
//       [req.body.company_name, req.body.email, req.body.password]
//     );
//     return res.json(result.rows[0]);
//   } catch (err) {
//     return next(err);
//   }
// });

//Server
db.sequelize.sync().then(function(){
  app.listen(8080, function() {
    console.log("API listening on http://localhost:8080");
  });
});
