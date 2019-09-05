var dotenv = require("dotenv").config(),
  express = require("express"),
  pg = require("pg"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  app = express();

//Allowed cors in localhost
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
// //Database Config .env
const config = {
  user: process.env.PG_USER,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASS
};

const pool = new pg.Pool(config);

pool.connect();

app.get("/api", async function(req, res, next) {
  try {
    const results = await pool.query("SELECT * FROM users");
    return res.json(results.rows);
  } catch (err) {
    return next(err);
  }
});

app.post("/signup", async function(req, res, next) {
  try {
    const result = await pool.query(
      "INSERT INTO users (company_name,email,password) VALUES ($1,$2,$3) RETURNING *",
      [req.body.company_name, req.body.email, req.body.password]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

//Server
app.listen(8080, function() {
  console.log("API listening on http://localhost:8080");
});
