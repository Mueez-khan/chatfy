const jwt = require('jsonwebtoken');

require("dotenv").config();

exports.authenticateUser = (req, res, next) => {

  
  const token = 
  req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : // From Authorization header
  req.body.token || // From body (if applicable)
  req.cookies.token;

  if (!token) {
    return [res.status(401).json({ message: 'Unauthorized, no token provided' }) , res.redirect('/login')];
  }
  if (!token) {
    return res.redirect('/login'); // Redirect to login if token is not provided
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET); // Verify the token using your JWT secret
  
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
