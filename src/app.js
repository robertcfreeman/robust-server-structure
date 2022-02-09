const express = require("express");
const app = express();
const flips = require("./data/flip-data");
const counts = require("./data/counts-data");
const res = require("express/lib/response");

app.use(express.json());
const countsRouter = require("./counts/counts.router");
const flipsRouter = require("./flips/flips.router");



app.use("/counts", countsRouter);
app.use("/flips", flipsRouter);



// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  const {status = 500, message = "Something went wrong"
  } = error;
  response.status(status).json({error: message})
});

module.exports = app;
