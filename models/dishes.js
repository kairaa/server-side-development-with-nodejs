const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    //author references to the ID of the user document
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    //usage of sub-document
    //every dish document can have multiple comments which are stored within an array inside the dish document
    comments: [commentSchema],
  },
  {
    //automatically add createdAt and updatedAt to dish document
    timestamps: true,
  }
);

//creates new collection automatically named dishes
var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;
