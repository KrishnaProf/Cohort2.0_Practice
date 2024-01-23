const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/MyDatabase")

const User = mongoose.model("User", {name: String, email: String, password: String});

app.post("/signup", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = await User.findOne({email: username});
    if(existingUser) {
        return res.status(400).send(
            "User already exists"
        );
    }

    const user = new User({name, email: username, password});

     user.save();
     res.json({"msg" : "User created successfully"});

});

const ALL_USERS = [
  {
    username: "LeelaKrishna682@gmail.com",
    password: "admin",
    name: "Leela Krishna",
  },
  {
    username: "Sarathkumar@gmail.com",
    password: "user",
    name: "Sarath",
  },
  {
    username: "Mahesh@gmail.com",
    password: "user2",
    name: "Mahesh",
  },
];

function userExists(username, password) {
  let userExists = false;
  for (let i = 0; i < ALL_USERS.length; i++) {
    if (
      ALL_USERS[i].username == username &&
      ALL_USERS[i].password == password
    ) {
      userExists = true;
    }
  }
  return userExists;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  if (!userExists(username, password)) {
    return res.status(403).json({
      message: "User don't exist",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;

    res.json({
        users: ALL_USERS.filter(function(user) {
            if(user.username == username) {
                return true;
            }
            else {
                return false;
            }
        } 
    )
});
});

app.listen(3000);
