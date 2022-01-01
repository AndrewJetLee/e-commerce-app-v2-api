const jwt = require("jsonwebtoken");

//Middleware run after the req is sent
const verifyToken = (req, res, next) => {
  //get token from header
  const authHeader = req.headers.token;
  //if the accessToken exists    
  if (authHeader) {
    // Split the header via " " if using Bearer and select the second element in array
    const token = authHeader.split(" ")[1];
    //Verify it's valid and not expired
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Invalid token");
      // The payload embedded in the token will be set to the user property of the
      // request
      req.user = user;
      // must be invoked at the end of the middleware
      next();
    });
  } else {
    return res.status(401).json("Unauthorized");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Forbidden");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Forbidden");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
