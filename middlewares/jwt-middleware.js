const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.url == "/api/v1/session") {
    return next();
  }
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!!payload.email) {
      req.auth = payload;
      next();
    }
  } catch (error) {
    console.error("🚀 ~ error:", error);
    return res.status(403).json({ message: "Token not valid" });
  }
};
