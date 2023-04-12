const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const adsController = require("../controllers/adsController");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use("/ads", adsController);
};
