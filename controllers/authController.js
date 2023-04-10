const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isGuest } = require("../middlewares/guards");

router.get("/register", isGuest(), (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  isGuest(),
  body("email")
    .isLength({ min: 10 })
    .withMessage("Email must be at least 10 characters long"),
  body('email').matches(/^[A-Za-z0-9 .,'@!&]+$/).withMessage("Email may contain only english letters and digits"),
  body("email").trim().isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password should be ata least 5 characters long!"),
  body("rePass").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Passwords don't match!");
    }
    return true;
  }),
  body("description")
    .trim()
    .isLength({ max: 40 })
    .withMessage(
      "The description of skils should be a maximum of 40 characters long!"
    ),
  async (req, res) => {
    const { errors } = validationResult(req);
    // const userData = {
    //   email: req.body.email.trim(),
    //   password: req.body.password.trim(),
    //   description: req.body.description.trim(),
    // };

    try {
      if (errors.length > 0) {
        throw new Error(
          Object.values(errors)
            .map((e) => e.msg)
            .join("\n")
        );
      }

      await req.auth.register(
        req.body.email,
        req.body.password,
        req.body.description
      );

      res.redirect("/");
    } catch (err) {
      console.log(err.message);
      const ctx = {
        errors: err.message.split("\n"),
        userData: {
          email: req.body.email.trim(),
          password: req.body.password.trim(),
          description: req.body.description.trim(),
        },
      };
      res.render("register", ctx);
    }
  }
);

router.get("/login", isGuest(), (req, res) => {
  res.render("login");
});

router.post("/login", isGuest(), async (req, res) => {
  try {
    await req.auth.login(req.body.email, req.body.password);

    res.redirect("/");
  } catch (err) {
    console.log(err.message);
    let errors;
    if (err.type == "credential") {
      errors = ["Incorrect email or password"];
    }
    const ctx = {
      errors,
      userData: {
        email: req.body.email,
      },
    };
    res.render("login", ctx);
  }
});

router.get("/logout", (req, res) => {
  req.auth.logout();
  res.redirect("/");
});

module.exports = router;
