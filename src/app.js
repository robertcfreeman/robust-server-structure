const express = require("express");
const app = express();
const flips = require("./data/flip-data");
const counts = require("./data/counts-data");
const res = require("express/lib/response");

app.use(express.json());
const flipsRouter = require("./flips/flips.router");

app.get("/counts/:countId", (req, res, next) => {
  const {countId} = req.params;
  const foundCount = counts[countId]
  if (foundCount === undefined) {
    next({status: 404, message: `Count id not found: ${countId}`})
  } else {
    res.json({data: foundCount});
  }
})

app.get("/counts", (req,res, next) => {
  res.json({data: counts});
})



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
