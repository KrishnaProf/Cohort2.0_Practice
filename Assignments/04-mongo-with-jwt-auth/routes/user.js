const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, User } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username: username,
        password: password
    })
    res.json({
        message:"User created successfully"
    })
    
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = User.find({
        username: username,
        password: password
    })

    if(user){
        const token = jwt.sign({
            username
        }, JWT_SECRET)
        res.json({
            token
        })
    }
    else{
        res.status(403).json({message:"Incorrect email and pass"})
    }

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    
        const response = await Course.find({});
        res.json({Courses: response});
    
});

router.post('/course/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;
    try{
        await User.updateOne({
            username: username
        }, {
            "$push": {
                purchasedCourses: courseId
        }
        });
        
    }
    catch(e){
        console.log(e)
    }
    
    res.json({message:"Course purchased successfully"})

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.username
    });

    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });
    res.json({
        courses: courses

    })

});

module.exports = router
