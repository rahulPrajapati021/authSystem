const jwt = require("jsonwebtoken");

//model is optional

const auth = (req, res, next) => {
    console.log(req.cookies);
  const token =
  req.cookies.token ||
    req.header("Authorization")?.replace("Bearer ", "") ||
    req.body.token;

    if(!token) {
        return res.status(403).send("token is missing");
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);

        console.log(decode);
        req.user = decode;

        //bring in info from DB
    } catch (error) {
        return res.status(401).send("Invalid token");
    }

    next();
};


module.exports = auth;