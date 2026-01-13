const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

module.exports = function (app) {
  // Allow certain headers
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, Authorization"
    );
    next();
  });

  // SIGN UP
  app.post(
    "/api/auth/signup/customer",
    [
      verifySignUp.checkDuplicateCustomerEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signupCustomer
  );

  app.post(
    "/api/auth/signup/provider",
    upload.single("idProof"),
    [
      verifySignUp.checkDuplicateProviderEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signupProvider
  );

  // SIGN IN
  app.post("/api/auth/signin", controller.signin);

  // SIGN OUT
  app.post("/api/auth/signout", controller.signout);
};
