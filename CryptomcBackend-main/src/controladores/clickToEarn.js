const jwt = require("jsonwebtoken");
const User = require("../modelos/user");
const { v1: uuidv1 } = require('uuid');
require("dotenv").config();

iniciarViaje = (req, res) => {
    const { nftPermanente, nftTemporales, wallet } = req.body;
    const userExistente = User.findOne({ wallet });

    if (!wallet || !wallet === "") return res.status(403).send({ message : "No se ha enviado el Wallet"});
    if ( !userExistente ) return res.status(403).send({ message: "No existe el usuario" })

    try {
        
    } catch (error) {
        console.log(error)
    }
}

comprarNft = (req, res) => {
    
}

comprarInstrumento = (req, res) => {
    
}