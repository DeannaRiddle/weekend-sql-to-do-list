const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const pg = require("pg");

const Pool = pg.Pool;
const PORT = 5000;
