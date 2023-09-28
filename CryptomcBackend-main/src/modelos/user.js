const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        wallet: String,
        cmsBalance: Number,
        cmcRetiro: Number,
        nftTemporales: [
            {
                usos: Number, 
                usosFaltantes: Number, 
                ganancia: Object,
                porcentajeExito: Number,
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