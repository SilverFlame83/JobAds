const router = require("express").Router();

router.get("/", async (req, res) => {
    const ads = await req.storage.getAllAds();

    res.render("home", { ads });
  
});

module.exports = router;
