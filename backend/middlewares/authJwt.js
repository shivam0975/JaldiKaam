const jwt = require("jsonwebtoken");
require('dotenv').config();
const config = process.env.JWT_KEY;
const db = require("../models");
const Customer = db.customer;
const Provider = db.provider;

const verifyToken = (req, res, next) => {
  // Token from header or session (support both)
  const token =
    req.headers["x-access-token"] ||
    req.headers.authorization?.split(" ")[1] ||
    req.session?.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config , (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.customerId = decoded.id;
    next();
  });
};

// Generic reusable function
const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      
      const user = requiredRole==="customer" ? await Customer.findById(req.customerId).populate("roles", "-__v") 
        : await Provider.findById(req.providerId).populate("roles", "-__v");

      if (!user) {
        return res.status(404).send({ message: "Customer not found" });
      }

      const hasRole = user.roles.some((role) => role.name === requiredRole);

      if (!hasRole) {
        return res.status(403).send({
          message: `Require ${requiredRole} role!`,
        });
      }

      next();
    } catch (err) {
      return res.status(500).send({ message: err.message || err });
    }
  };
};

// Export middlewares
module.exports = {
  verifyToken,
  isAdmin: checkRole("admin"),
  isProvider: checkRole("provider"), 
  isCustomer: checkRole("customer"),
};
