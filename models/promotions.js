const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//added but not working
//require('mongoose-currency').loadType.Currency;
//const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    // price:{
    //     type: Currency,
    //     required: true
    // },
    description: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;
