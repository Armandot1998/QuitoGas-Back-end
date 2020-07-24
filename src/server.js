const express = require('express');
const app = express();
const cors = require('cors');


//cors
app.use(cors());
// midelwares
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Definiendo rutas
app.use(require('./routes/usuario.route'));
app.use(require('./routes/product.route'));

app.listen(3000);
console.log('server on port 3000');
