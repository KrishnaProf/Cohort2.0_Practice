express = require('express');

const app = express();

app.use(express.json());

function isOldEnoughMiddleware(req, res,next){
    age = req.query.age;
    if(age >= 18){
        next();
    }
    else{
        return res.json({ msg: "Sorry, You are not age " });

    }
}

app.use(isOldEnoughMiddleware);

app.get("/ride1", function (req, res) {

    return res.json({ msg: "You have successfully riden the ride1" });
    
});

app.get("/ride2", function (req, res) {

    return res.json({ msg: "You have successfully riden the ride2" });
    
});

app.listen(3000);
