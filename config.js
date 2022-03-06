require("dotenv").config();

module.exports = {
  secretKey: process.env.SECRET_KEY,
  mongoUrl: "mongodb://localhost:27017/conFusion",
  facebook: {
    clientId: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
  },
};
