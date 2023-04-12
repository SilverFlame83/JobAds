const ads = require('../services/ads')

module.exports = () => (req,res,next)=>{
   
    req.storage = {
        ...ads
    }

    next();
}