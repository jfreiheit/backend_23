const pg = require('pg')
require('dotenv').config();

const client = new pg.Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})

client.connect( (err) => {
    if(err) {
        console.log('database NOT connected', err)
    } else {
        console.log('database connected ...')
    }
})

module.exports = client;