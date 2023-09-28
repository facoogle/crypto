const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        wallet: String,
        cmsBalance: Number,
        cmcRetiro: Number,
        token: Number,
        gas: Number,
        contract: Number,
        nftTemporales: [
            {
                rarity: String, 
                name:String,
                score: Number,
                state:String,
                progressBar: Number,
                progressBarMax: Number,
                eventTime:Number,
                type:String
            }
        ],
        nftPermanentes: [
            {
                id: String
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model('usuario', userSchema);