const router = require("express").Router();
const { isUser } = require("../middlewares/guards");
const { parseError } = require("../util/parsers");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", isUser(), async (req, res) => {
  try {
    const adsData = {
      headline: req.body.headline,
      location: req.body.location,
      companyName: req.body.companyName,
      companyDescription: req.body.companyDescription,
      owner: req.user._id,
    };

    await req.storage.createAd(adsData);

    res.redirect('/')
  } catch (err) {
    console.log(err.message);

    const ctx = {
        errors: parseError(err),
        adsData:{
            headline: req.body.headline,
            location: req.body.location,
            companyName: req.body.companyName,
            companyDescription: req.body.companyDescription
        }
    }
    res.render('create', ctx)
  }
});

module.exports = router;
