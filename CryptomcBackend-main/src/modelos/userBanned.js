const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        wallet: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model('usuarioBaneado', userSchema);