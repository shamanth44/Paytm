const { jwtSecret } = require("./config");
// jwtSecret = "shamanth"
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "error 1",
    });
  }

  const token = authHeader.split(' ')[1];
  // console.log(token);

  try {
    const decoded = jwt.verify( token , jwtSecret);


    if (decoded.userId) {
      req.userId = decoded.userId;
    
      next();
    }
     else {
      return res.status(403).json({
        message: "error 2",
      });
    }
    
  } 
  catch (error) {
    return res.status(403).json({
      message: "error 3",
    });
  }
};

module.exports = {
  authMiddleware,
};  
