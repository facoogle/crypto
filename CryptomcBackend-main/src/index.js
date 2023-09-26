const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const app = express();
require('./database');

//configuraciones
app.set('port', process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(cors())
app.use(helmet());

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

//rutas
app.use('/api/user', require('./rutas/user'));
app.use('/api/juego', require('./rutas/juego'));

app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});