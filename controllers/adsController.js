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

router.get('/catalog', async(req,res)=>{
  const ads = await req.storage.getAllAds();

  res.render('catalog', {ads})
})

router.get('/details/:id', isUser(), async(req,res)=>{
  const ad = await req.storage.getAdById(req.params.id);


  ad.isOwner = req.user && req.user._id == ad.owner._id;
  ad.applied = req.user && ad.usersApplied.find((u) => u == req.user._id)

  res.render('details', {ad});
})

router.get('/apply/:id', isUser(), async(req,res)=>{
  try{
  
    await req.storage.applyAdd(req.params.id, req.user._id);

    res.redirect('/ads/details/' + req.params.id)
  }catch(err){
      console.log('Error', err.message);
      res.redirect('/ads/details/' + req.params.id)
  }
})

module.exports = router;
