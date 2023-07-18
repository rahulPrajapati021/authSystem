const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const User = require("./model/user");
const auth = require("./middleware/auth");
require("dotenv").config();
require("./config/database").connect();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("./public"));
app.use("/chat", auth, express.static("./chat"));

app.post("/register", async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        console.log(req.body);

        if(!(email && password && firstName && lastName)) {
            res.status(400).send("All fields are required");
        }
    
        const existingUser = await User.findOne({email}); // PROMISEs
        
        if(existingUser) {
            res.status(401).send("User already exists");
        }
    
        const myEncPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: myEncPassword
        })
        //token creation
        const token = jwt.sign(
            {user_id: user._id, email}, 
            process.env.SECRET_KEY,
            {
                expiresIn: '2h'
            }
        )
    
        user.token = token;

        res.cookie("user", `${user.firstName},${user.email}`, {
            expires: new Date(
                Date.now() +3 *24 *60 *60 *1000
            ),
            encode: String
        })

        const options = {
            expires: new Date(
                Date.now() +3 *24 *60 *60 *1000
            ),
            httpOnly: true
        }

        //handle password situation

        user.password = undefined;
        res.status(200).cookie("token", token, options).send(user);
    
    } catch (error) {
        console.log(error);
    }
})


app.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!(email && password)) {
            res.status(400).send("field is missing");
        }

        const user = await User.findOne({email});

        // if(!user) {
        //     res.status(400).send("Not a registered email");
        // }

        if(user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.SECRET_KEY,
                {
                    expiresIn: "2h"
                }
            )

            user.token = token;

            user.password = undefined;
            // res.status(200).json(user);

            const options = {
                expires: new Date(
                    Date.now() + 3 * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
            }
            res.cookie('user', `${user.firstName},${user.email}`, {
                expires: new Date(
                    Date.now() + 3 * 24 * 60 * 60 * 1000
                ),
                encode: String
            })
            res.status(200).cookie('token', token, options).json({
                success: true,
                token,
                user
            })
            // res.cookie('token', token, options).send("login");
        }
        else {            
            res.status(400).send("emaill or password is incorrect");
        }

    } catch (error) {
        console.log(error);
    }
})


app.get("/dashboard", auth, (req, res) => {
    res.send("Welcome to secret infor");
})


app.get("/reset", (req, res) => {
    res.clearCookie('token');

    console.log(req.cookies);
    res.send("Cookiess are cleared");
})


app.get("/*", (req, res) => {
    res.status(404).send("404, page not found");
})
module.exports = app;