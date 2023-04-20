const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const adsController = require("../controllers/adsController");
const errorController = require("../controllers/errorController");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use("/ads", adsController);
  app.use("*", errorController);
};
