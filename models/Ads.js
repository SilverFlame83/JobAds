const { Schema, model } = require('mongoose');

const schema = new Schema({
    headline: { type: String,minLength:4, required: [true, "Headline is required and should be at least 4 characters long"]  },
    location: { type: String,minLength:8, required: [true, "Location is required and should be at least 8 characters long"]  },
    companyName:{type: String,minLength:3, required: [true, "CompanyName is required and should be at least 3 characters long"] },
    companyDescription:{type: String,maxLength:40,  required:[true, "Company sdescription should be at maximum 40 characters long"] },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    usersApplied:[{ type: Schema.Types.ObjectId, ref: "User", default: [] }]

});

module.exports = model('Ads', schema);