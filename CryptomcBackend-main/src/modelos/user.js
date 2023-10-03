const mongoose = require("mongoose");
const { Schema } = mongoose;

const burgerSchema = new Schema({
  name: String,
  type: String,
  state: String,
  rarity: Number,
  score: Number,
  progressBar: Number,
  progressBarMax: Number,
  eventTime: Number,
});

const userSchema = new Schema(
  {
    wallet: String,
    cmsBalance: Number,
    cmcRetiro: Number,
    token: Number,
    gas: Number,
    contract: Number,
    nftTemporales: [burgerSchema],
    nftPermanentes: [
      {
        id: String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("usuario", userSchema);
