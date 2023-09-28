const jwt = require("jsonwebtoken");
const User = require("../modelos/user");
const UserBanned = require("../modelos/userBanned");
const { v1: uuidv1, v4: uuidV4 } = require("uuid");
const mongoose = require("mongoose")

createUser = async (req, res) => {
  const { wallet } = req.body;
  const userExistente = await User.findOne({ wallet });

  if (!wallet || !wallet === "")
    return res.status(403).send({ message: "No se ha enviado el Wallet" });
  if (userExistente)
    return res.status(200).send({ message: "Login Exitoso", userExistente });
  try {
    let user = new User({
      wallet: wallet,
      cmsBalance: 0,
      cmsRetiro: 0,
      token: 0,
      gas: 0,
      contract: 0,
      nftTemporales: [],
      nftPermanentes: [],
    });

    const savedUser = await user.save();

    return res.status(200).json({ savedUser });
  } catch (error) {
    return res.status(400).json({ message: "Algo esta mal en el servidor" });
  }
};

banearUsuario = async (req, res) => {
  const { wallet } = req.body;
  const userExistente = await UserBanned.findOne({ wallet });

  if (!wallet || !wallet === "")
    return res.status(403).send({ message: "No se ha enviado el Wallet" });
  if (userExistente)
    return res.status(200).send({ message: "Usuario ya Baneado" });
  try {
    let user = new UserBanned({ wallet });

    const usuarioBanned = await user.save();
    return res.status(200).json({ usuarioBanned });
  } catch (error) {
    return res.status(400).json({ message: "Algo esta mal en el servidor" });
  }
};

getNftUser = async (req, res) => {
  try {
    const { userId } = req.params; // Obtiene el ID del usuario de los parámetros de la URL.

    // Busca al usuario en la base de datos por su ID.
    const usuario = await User.findById(userId);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Obtiene la lista de NFT temporales del usuario.
    const nftTemporales = usuario.nftTemporales;

    res.json(nftTemporales);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los NFT temporales del usuario." });
  }
};

createNftTemporal = async (req, res) => {
  try {
    const { wallet, type, rarity, name } = req.body //pide el id de la cuenta en vez de la wallet, ese id se consigue en la base de datos!
    console.log(req.body)

    const usuario = await User.findOne({wallet});
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    
    

    const nuevoNFTTemporal = {
      rarity: rarity,
      name:name,
      score: 30,
      state: "temporal",
      progressBar: 1,
      progressBarMax: 42,
      eventTime: 0,
      type:type
    };

    usuario.nftTemporales.push(nuevoNFTTemporal)

    await usuario.save();

    res.json({ message: "NFT temporal creado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el NFT temporal." });
  }
};

/*
  funcion para logeo y creacion de cuentas
  la peticion se hace inmediatamente se conecta a metamask.
  */
login = async (req, res) => {
  try {
    const { wallet } = req.body; // Obtiene la wallet del usuario de los parámetros de la URL.
    console.log(wallet,"wallet")
    if (wallet.length !== 42) {
      return res
        .status(400)
        .json({ error: "La wallet debe tener 42 caracteres." });
    }

    // Busca al usuario en la base de datos por su wallet.
    const usuario = await User.findOne({wallet});

    //si elusuari existe retornamos la tabla usuario
    if (usuario) {
      return res
        .status(200)
        .json({ usuario });
    } else {
      //al no encontrar al usuario, creamos automaticamente la cuenta
      createUser(req, res);
    }

    // Obtiene la lista de NFT temporales del usuario.    const nftTemporales = usuario?.nftTemporales;

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los NFT temporales del usuario." });
  }
};

module.exports = {
  createUser,
  getNftUser,
  createNftTemporal,
  login,
};
