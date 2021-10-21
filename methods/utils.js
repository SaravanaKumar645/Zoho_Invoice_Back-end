const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "50s",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
const authorizeToken = (req, res, next) => {
  // const authHeader = req.headers.authorization;
  const cookie = true;
  console.log("COOKIE ::::: " + cookie);
  if (cookie) {
    // const token = authHeader.split(" ")[1];
    const token = cookie;
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ msg: "Token is not valid!" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send({ msg: "You are not authenticated!" });
  }
};
const hello = async (req, res, next) => {
  console.log("inside hello functions");
};
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authorizeToken,
  hello,
};
