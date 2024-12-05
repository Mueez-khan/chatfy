const jwt = require('jsonwebtoken');

require("dotenv").config();

exports.authenticateUser = (req, res, next) => {

  // const token = req.header("Authorization").replace("Berar" , "") ||
  //  req.headers.authorization?.split(' ')[1] || req.body.token ||
    // req.cookies.token ; // this is not working in postman
  // const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Berar" , "")  || req.headers.authorization?.split(' ')[1]; // this works but this not work with frontend
  const token = 
  req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : // From Authorization header
  req.body.token || // From body (if applicable)
  req.cookies.token;
  // const authHeader = req.headers.authorization;
  // const token = authHeader && authHeader.split(' ')[1];
    // console.log("Token in middle" , token);
  if (!token) {
    return [res.status(401).json({ message: 'Unauthorized, no token provided' }) , res.redirect('/login')];
  }
  if (!token) {
    return res.redirect('/login'); // Redirect to login if token is not provided
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET); // Verify the token using your JWT secret
    // console.log("Decode" , decoded);
    req.user = decoded; // Attach the decoded user to the request
    next();
  } catch (error) {
    console.log("Error in middleware " , error);
    return res.status(401).json({
        success : false ,
        message : "Token is Invalid"
    })
  }
};
