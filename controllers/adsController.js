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

    res.redirect("/ads/catalog");
  } catch (err) {
    console.log(err.message);

    const ctx = {
      errors: parseError(err),
      adsData: {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
      },
    };
    res.render("create", ctx);
  }
});

router.get("/catalog", async (req, res) => {
  const ads = await req.storage.getAllAds();

  res.render("catalog", { ads });
});

router.get("/details/:id", isUser(), async (req, res) => {
  const ad = await req.storage.getAdById(req.params.id);

  ad.isOwner = req.user && req.user._id == ad.owner._id;
  ad.applied = req.user && ad.usersApplied.find((u) => u == req.user._id);

  res.render("details", { ad });
});

router.get("/apply/:id", isUser(), async (req, res) => {
  try {
    await req.storage.applyAdd(req.params.id, req.user._id);

    res.redirect("/ads/details/" + req.params.id);
  } catch (err) {
    console.log("Error", err.message);
    res.redirect("/ads/details/" + req.params.id);
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const ad = await req.storage.getAdById(req.params.id);

    res.render("edit", { ad });
  } catch (err) {
    console.log(err.message);
    res.redirect("/ads/details/" + req.params.id);
  }
});

router.post("/edit/:id", isUser(), async (req, res) => {
  try {
    await req.storage.editAd(req.params.id, req.body);

    res.redirect("/ads/details/" + req.params.id);
  } catch (err) {
    const ctx = {
      errors: parseError(err),
      ad: {
        _id: req.params.id,
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
        owner: req.body.owner,
      },
    };

    res.render('edit', ctx)
  }
});

module.exports = router;
