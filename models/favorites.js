const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dish: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
