const db = require("../models");
const ROLES = db.ROLES;
const Provider = db.provider;
const Customer = db.customer;

// Check duplicate username or email
const checkDuplicateCustomerEmail = async (req, res, next) => {
  try {
    const email = req.body.email;

    const customer = await Customer.findOne({email});

    if (customer) {
      if (customer.email === email) {
        return res.status(400).send({ message: "Failed! User Email is already in use!" });
      }
    }

    next();
  } catch (err) {
    return res.status(500).send({ message: err.message || err });
  }
};

const checkDuplicateProviderEmail = async (req, res, next) => {
  
  try {
    const email = req.body?.email;

    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }

    const provider = await Provider.findOne({ email });

    if (provider) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Server error"
    });
  }
};


// Check roles existed
const checkRolesExisted = (req, res, next) => {

  let { roles } = req.body;

  if (typeof roles === "string") {
    roles = JSON.parse(roles);
    req.body.roles = roles;
  }

  if (roles) {
    for (const role of roles) {
      if (!ROLES.includes(role)) {
        return res.status(400).send({
          message: `Failed! Role ${role} does not exist!`
        });
      }
    }
  }
  next();
};

module.exports = {
  checkDuplicateCustomerEmail,
  checkDuplicateProviderEmail,
  checkRolesExisted
};
