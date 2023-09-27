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


 getNftUser = async (req, res) => {
    try {
      const { userId } = req.params; // Obtiene el ID del usuario de los parámetros de la URL.
      
      // Busca al usuario en la base de datos por su ID.
      const usuario = await User.findById(userId);
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
      
      // Obtiene la lista de NFT temporales del usuario.
      const nftTemporales = usuario.nftTemporales;
      
      res.json(nftTemporales);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los NFT temporales del usuario.' });
    }
  }


  createNftTemporal = async (req, res) => {
    try {
      const { userId } = req.params; 
      
      
      const nuevoNFTTemporal = {
        id: '1', 
        usos: 5,
        ganancia: { tipo: 'moneda', cantidad: 100 },
        porcentajeExito: '90%',
        rareza: 'Común',
      };
      
     
      const usuario = await User.findById(userId);
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
      
  
      usuario.nftTemporales.push(nuevoNFTTemporal);
      
      await usuario.save();
      
      res.json({ message: 'NFT temporal creado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el NFT temporal.' });
    }
  };






  module.exports = {
    createUser,
    getNftUser,
    createNftTemporal
  };