const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        wallet: String,
        cmsBalance: Number,
        cmcRetiro: Number,
        nftTemporales: [
            {
                id: String,
                usos: String,
                ganancia: Object,
                porcentajeExito: String,
                rareza: String,
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