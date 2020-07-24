const express = require('express');
const app = express();

// midelwares
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Definiendo rutas del usuario
app.use(require('./routes/usuario.route'));

// Definiendo rutas del producto
app.use(require('./routes/product.route'));

app.listen(3000);
console.log('server on port 3000');
