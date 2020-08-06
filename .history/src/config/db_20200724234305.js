const { Pool } = require('pg');

const pool = new Pool({
    hots: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'QuitoGas', 
    port: '5432'
})

module.exports = pool