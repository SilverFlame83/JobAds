const Ads = require("../models/Ads");

async function getAllAds() {
    return Ads.find().populate("owner").lean();
  }
  
  async function getAdById(id) {
    return Ads.findById(id).populate("owner").lean();
  }
async function createAd(adsData) {
  const ad = new Ads(adsData);

  await ad.save();

  return ad;
}

async function editAd(id, adsData){
    const ad = await Ads.findById(id);

    ad.headline= adsData.headline;
    ad.location= adsData.location;
    ad.companyName= adsData.companyName;
    ad.companyDescription= adsData.companyDescription;
    ad.owne= adsData.owner;
    
    return ad.save();
}

async function deleteAd(id){
    await Ads.findByIdAndDelete(id)
}

module.exports = {
    createAd,
    getAllAds,
    getAdById,
    editAd,
    deleteAd
};
