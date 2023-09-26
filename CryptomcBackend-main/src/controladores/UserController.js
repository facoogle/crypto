const jwt = require("jsonwebtoken");
const User = require("../modelos/user");
const UserBanned = require("../modelos/userBanned");
const { v1: uuidv1 } = require('uuid');

createUser = async (req, res) => {
    const { wallet, nftPermanentes } = req.body;
    const userExistente = await User.findOne({ wallet });

    if (!wallet || !wallet === "") return res.status(403).send({ message : "No se ha enviado el Wallet"});
    if ( userExistente ) return res.status(200).send({ message: "Login Exitoso", userExistente })
    try {
        let user = new User({
            wallet: wallet,
            nftPermanentes: nftPermanentes,
            cmsBalance: 0,
            cmsRetiro: 0,
            nftTemporales: []
        });
    
        const savedUser = await user.save();
        return res.status(200).json({ savedUser });
    } catch (error) {
        return res.status(400).json({ message: "Algo esta mal en el servidor" });
    }
}

banearUsuario = async (req, res) => {
    const { wallet } = req.body;
    const userExistente = await UserBanned.findOne({wallet});

    if (!wallet || !wallet === "") return res.status(403).send({ message : "No se ha enviado el Wallet"});
    if (userExistente ) return res.status(200).send({ message: "Usuario ya Baneado"})
    try {
        let user = new UserBanned({ wallet });
    
        const usuarioBanned = await user.save();
        return res.status(200).json({ usuarioBanned });
    } catch (error) {
        return res.status(400).json({ message: "Algo esta mal en el servidor" });
    }
}