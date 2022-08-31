const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require ('dotenv').config()

const app = express();

//cors
const cors = require('cors');
var corsOptions = {
    origin: '*', //reemplazar con dominio
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//capturar body
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Conexion a BD
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.gdfl3ln.mongodb.net/?retryWrites=true&w=majority`
const opcion = { useNewUrlParser: true, useUnifiedTopology: true, }
mongoose.connect(uri, opcion)
    .then(() => console.log('BD conectada'))
    .catch(e => console.log({e}))

//Import routes
const authRoutes = require('./routes/auth');
const validaToken = require('./routes/validate-token');
const admin = require ('./routes/admin');

//Route middlewares
app.use('/api/user', authRoutes);
app.use('/api/admin', validaToken, admin) //si el token se valida pasa al admin
app.get('/', (req, res) =>{
    res.json({
        estado: true,
        mensaje: 'funciona'
    })
});
//Iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})