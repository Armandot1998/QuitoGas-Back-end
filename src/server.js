const express = require('express');
const app = express();

// midelwares
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Definiendo rutas
app.use(require('./routes/usuarioRoute'));

app.listen(3000);
console.log('server on port 3000');
