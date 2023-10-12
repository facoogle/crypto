const jwt = require("jsonwebtoken");
const User  = require("../modelos/user");
const UserBanned = require("../modelos/userBanned");
const { v4: uuidV4, v4 } = require("uuid");
const mongoose = require("mongoose");

createUser = async (req, res) => {
  const { wallet } = req.body;
  const userExistente = await User.findOne({ wallet });

  if (!wallet || !wallet === "")
    return res.status(403).send({ message: "No se ha enviado el Wallet" });
  if (userExistente) return res.status(200).send({ usuario: userExistente });
  try {
    let user = new User({
      wallet: wallet,
      cmsBalance: 0,
      cmsRetiro: 0,
      token: 500,
      gas: 0,
      contract: 0,
      nftTemporales: [],
      nftPermanentes: [],
    });

    const savedUser = await user.save();

    return res.status(200).json({ usuario: user });
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
    const { wallet, type, state,rarity, name, score, progressBarMAx, price } =
      req.body; //pide el id de la cuenta en vez de la wallet, ese id se consigue en la base de datos!

    const usuario = await User.findOne({ wallet });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    if (type === "gas") {
      usuario.gas += 1;
    } else if (type === "contract") {
      usuario.contract += 1;
    } else if (type === "byke") {
      const nuevoNFTTemporal = {
        name: `${name}`,
        type: `${type}`,
        state: "temporal",
        rarity: parseInt(rarity),
        score: 25,
        progressBar: 0,
        progressBarMax: 5,
        eventTime: 0,
      };

      usuario.nftTemporales.push(nuevoNFTTemporal);
    } else if (type === "burger") {
      const nuevoNFTTemporal = {
        name: `${name}`,
        type: `${type}`,
        state: `${state}`,
        rarity: parseInt(rarity),
        score: score,
        progressBar: 1,
        progressBarMax: progressBarMAx,
        eventTime: 0,
      };

      usuario.nftTemporales.push(nuevoNFTTemporal);
    }
    
    if (usuario.token - parseInt(price) < 0) {
      return res.status(500).json({ error: "token insuficientes." });
    }

    usuario.token -= parseFloat(price);
    await usuario.save();

    res.json({ message: usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el NFT temporal." });
  }
};

add = async (req, res) => {
  try {
    const { coin, wallet } = req.body; //pide el id de la cuenta en vez de la wallet, ese id se consigue en la base de datos!

    const usuario = await User.findOne({ wallet });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    usuario.token += parseFloat(coin);
    await usuario.save();

    res.json({ message: usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el NFT temporal." });
  }
};

deliveryStar = async (req, res) => {
  try {
    const { wallet, burgerBag, progressLess, bykeSelect, farOrNear } = req.body; //pide el id de la cuenta en vez de la wallet, ese id se consigue en la base de datos!
    const now_utc_date = new Date().toUTCString();
    const now_timestamp = new Date(now_utc_date).getTime();
    const usuario = await User.findOne({ wallet });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }


     const byke =   usuario.nftTemporales.filter((element) => element.type === "byke" )
     const burger = usuario.nftTemporales.filter((element) => element.type === "burger") 
    console.log(burger[0]._id)

    byke.map((data) => {
      if (data._id.toString() === bykeSelect._id) {
        data.progressBar += progressLess;
        data.eventTime = now_timestamp
    
        if (data.progressBar >= data.progressBarMax) {
          const indexToRemove = byke.indexOf(data);
          if (indexToRemove !== -1) {
            byke.splice(indexToRemove, 1);
          }
        }
      }
      return data;
    })


    burger.map((data) => {
      console.log(data)
      if (data._id.toString() === burgerBag[0]?._id || data._id.toString() === burgerBag[1]?._id || data._id.toString() === burgerBag[2]?._id ) {
        
        data.eventTime = now_timestamp
        if (data.progressBar >= data.progressBarMax && data.state === 'temporal') {
          data.progressBar += progressLess;
          const indexToRemove = burger.indexOf(data);
          if (indexToRemove !== -1) {
            burger.splice(indexToRemove, 1);
          }
        }
      }
      return data;
    })
    
    const nftNew = burger.concat(byke)
    usuario.nftTemporales = nftNew  

    const userGasCost = farOrNear === "near" ? 1 : 2;
    const userContractCost = farOrNear === "near" ? 1 : 2;

    if (usuario.gas >= userGasCost && usuario.contract >= userContractCost) {
      usuario.gas -= userGasCost;
      usuario.contract -= userContractCost;
    } else {
      return res.status(400).json({ error: "No tienes suficiente gas o contrato para esta acción." });
    }

    await usuario.save();


    

    res.json({ nft: burger });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el NFT temporal." });
  }
};


login = async (req, res) => {
  try {
    const { wallet } = req.body; // Obtiene la wallet del usuario de los parámetros de la URL.
    if (wallet.length !== 42) {
      return res
        .status(400)
        .json({ error: "La wallet debe tener 42 caracteres." });
    }

    
    const usuario = await User.findOne({ wallet });

   
    if (usuario) {
      return res.status(200).json({ usuario });
    } else {
      
      createUser(req, res);
    }

    
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
  add,
  deliveryStar,
  login,
};
