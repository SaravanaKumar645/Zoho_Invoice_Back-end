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
      expiresIn: "20s",
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
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "mySecretKey", (err, user) => {
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
module.exports = { generateAccessToken, generateRefreshToken, authorizeToken };
