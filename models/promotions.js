const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//when i try to use mongoose-currecy, i get the error, because of this i did not add it
const promotionSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true,
    },
    label:{
        type: String,
        default: '',
    },
    description:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;