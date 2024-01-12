const express = require("express");

const app = express();

app.use(express.json());

app.post("/health-checkup", (req, res) => {
 const kidneys = res.body.kidney;
 const kidneyLength = kidneys.length;

 res.send("you have " + kidneyLength + " kidneys");


});

app.listen(3000);