const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        wallet: String,
        cmsBalance: Number,
        cmcRetiro: Number,
        nftTemporalesMot: [
            {
                id: String,
                usos: number, // 1 > 100, -1
                usosFaltantes: number, 
                ganancia: Object,
                porcentajeExito: String,
                rareza: String, // 0, 1, 2, 3
                tipo: String, //Moto, Hamburguesa, Fuel, contratos
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