import jwt from 'jsonwebtoken'
import config from './auth.config.js'

const verifyToken = (req, res, next) => {
    let token = req.headers["authentication"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
};

const authJwt = {
    verifyToken
  };
export default authJwt;