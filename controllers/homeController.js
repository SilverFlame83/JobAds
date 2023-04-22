const router = require("express").Router();

router.get("/", async (req, res) => {
    const ads = await req.storage.getAllAds();

    console.log(ads);

    res.render("home", { ads });
  
});

module.exports = router;
