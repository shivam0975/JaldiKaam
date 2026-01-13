require('dotenv').config();
const config = process.env.JWT_KEY;

const db = require("../models");
const Customer = db.customer;
const Provider = db.provider;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Customer SIGNUP
exports.signupCustomer = async (req, res) => {
  try {
    const { name, email, phone , password, roles } = req.body;

    // Create new customer document
    const customer = new Customer({
      name,
      email,
      phone ,
      password: await bcrypt.hash(password, 8),
    });

    let roleDocs;

    if (roles && roles.length > 0) {
      // Find requested roles
      roleDocs = await Role.find({ name: { $in: roles } });

      if (roleDocs.length === 0) {
        return res.status(400).send({ message: "Roles not found!" });
      }
    } else {
      // Assign default role (change as needed)
      roleDocs = [await Role.findOne({ name: "customer" })];
    }

    customer.roles = roleDocs.map((role) => role._id);
    await customer.save();

    res.send({ message: "Customer was registered successfully!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error during signup",
    });
  }
};

// Customer SIGNUP
exports.signupProvider = async (req, res) => {
  try {
    let {
      name,
      email,
      phone,
      password,
      location,
      experience,
      price,
      availability,
      service,
      roles
    } = req.body;

    if (!req.file) {
      return res.status(400).send({ message: "ID Proof is required" });
    }

    const provider = new Provider({
      name,
      email,
      phone,
      password: await bcrypt.hash(password, 8),
      location,
      experience,
      price,
      availability,
      service,
      idProof: req.file.buffer
    });

    let roleDocs;

    if (roles && roles.length > 0) {
      // Find requested roles
      roleDocs = await Role.find({ name: { $in: roles } });

      if (roleDocs.length === 0) {
        return res.status(400).send({ message: "Roles not found!" });
      }
    } else {
      // Assign default role (change as needed)
      roleDocs = [await Role.findOne({ name: "provider" })];
    }

    provider.roles = roleDocs.map((role) => role._id);
    await provider.save();

    res.send({ message: "Customer was registered successfully!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error during signup",
    });
  }
};


// SIGNIN
exports.signin = async (req, res) => {
  try {

    const { email, password, role } = req.body;
    let user;

    if (role === "customer") {
      user = await Customer.findOne({ email }).populate("roles", "-__v");
    } else if (role === "provider") {
      user = await Provider.findOne({ email }).populate("roles", "-__v");
    } else {
      return res.status(400).send({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    if ('isVerified' in user && !user.isVerified) {
      return res.status(403).send({ message: "User not verified." });
    }

    const passwordIsValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password!" });
    }

    const token = jwt.sign(
      { id: user._id },
      config,
      {
        algorithm: "HS256",
        expiresIn: 86400, // 24h
      }
    );

    // Convert roles to uppercase format
    const authorities = user.roles
  ? user.roles.map(r => `ROLE_${r.name.toUpperCase()}`)
  : [];

    // Save JWT to session (if using sessions)
    req.session.token = token;

    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      roles: authorities,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error during signin",
    });
  }
};

// SIGNOUT
exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
