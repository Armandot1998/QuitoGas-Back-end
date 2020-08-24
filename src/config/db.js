const { Pool } = require('pg');

const pool = new Pool({
    hots: 'localhost',
    user: 'postgres',
<<<<<<< HEAD
    password: 'admin',
    database: 'QuitoGas', 
=======
    password: '1234',
    database: 'gas', 
>>>>>>> 60500c271e95696ec67c40d2bf4981ffe2b60836
    port: '5432'
})

module.exports = pool