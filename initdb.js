const express = require('express');
const client = require('./db');
const initdb = express.Router();
const format = require('pg-format');


initdb.get('/', async(req, res) => {

    // Anlegen der Tabelle members
    let query1 = `
            DROP TABLE IF EXISTS members;
            CREATE TABLE members(id serial PRIMARY KEY, firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50));
            `;

    try {
        await client.query(query1)
        console.log("Table members created successfully ...")
    } catch (err) {
        console.log(err)
    }


    // Anlegen der Tabelle members
    let query2 = `
            DROP TABLE IF EXISTS users;
            CREATE TABLE users(id serial PRIMARY KEY, username VARCHAR(50), password VARCHAR(255), email VARCHAR(50), role VARCHAR(50));
            `;

    try {
        await client.query(query2)
        console.log("Table users created successfully ...")
    } catch (err) {
        console.log(err)
    }

    // Befüllen der Tabelle members mit 50 Einträgen
    const values = [
        ["Catherine", "Williams", "cwilliamsl@360.cn"],
        ["Adam", "Anderson", "aanderson8@google.fr"],
        ["Susan", "Andrews", "sandrewsn@google.co.jp"],
        ["Catherine", "Andrews", "candrewsp@noaa.gov"],
        ["Alan", "Bradley", "abradley1c@globo.com"],
        ["Anne", "Brooks", "abrooks16@bravesites.com"],
        ["Russell", "Brown", "rbrownq@nifty.com"],
        ["Ryan", "Burton", "rburton18@foxnews.com"],
        ["Roy", "Campbell", "rcampbell1@geocities.com"],
        ["Russell", "Campbell", "rcampbell17@eventbrite.com"],
        ["Bonnie", "Coleman", "bcoleman11@fc2.com"],
        ["Ernest", "Coleman", "ecoleman15@businessweek.com"],
        ["Richard", "Cruz", "rcruz7@unc.edu"],
        ["Sean", "Cruz", "scruz10@answers.com"],
        ["Rebecca", "Cunningham", "rcunninghamd@mac.com"],
        ["Margaret", "Evans", "mevansh@pcworld.com"],
        ["Jeffrey", "Ford", "jford14@cnet.com"],
        ["Andrea", "Gardner", "agardnerv@woothemes.com"],
        ["Deborah", "George", "dgeorge6@furl.net"],
        ["Sean", "Gibson", "sgibsony@alexa.com"],
        ["Virginia", "Graham", "vgrahamk@aol.com"],
        ["Steven", "Hamilton", "shamiltonu@state.tx.us"],
        ["Virginia", "Hawkins", "vhawkinsf@ehow.com"],
        ["Edward", "Hicks", "ehicksc@pcworld.com"],
        ["Mark", "Johnson", "mjohnsonj@hostgator.com"],
        ["Ruth", "Jordan", "rjordan1a@smugmug.com"],
        ["Antonio", "Kim", "akim4@odnoklassniki.ru"],
        ["Jennifer", "Marshall", "jmarshallt@gnu.org"],
        ["Eric", "Matthews", "ematthews5@independent.co.uk"],
        ["Raymond", "Mcdonald", "rmcdonald2@ihg.com"],
        ["Eric", "Miller", "emillere@creativecommons.org"],
        ["Jonathan", "Morales", "jmoralesa@ovh.net"],
        ["Marie", "Morgan", "mmorganb@cloudflare.com"],
        ["Amanda", "Nelson", "anelson13@indiatimes.com"],
        ["Lisa", "Olson", "lolsonr@telegraph.co.uk"],
        ["Alice", "Ortiz", "aortizw@histats.com"],
        ["Peter", "Phillips", "pphillipss@1688.com"],
        ["Matthew", "Porter", "mporter9@europa.eu"],
        ["Tammy", "Ray", "trayx@weather.com"],
        ["Mark", "Richardson", "mrichardson1d@ihg.com"],
        ["Joan", "Roberts", "jroberts12@alibaba.com"],
        ["Kathleen", "Rose", "kroseg@pinterest.com"],
        ["Steve", "Sanders", "ssanders1b@wikispaces.com"],
        ["Shirley", "Scott", "sscottm@macromedia.com"],
        ["Lillian", "Stephens", "lstephens19@hugedomains.com"],
        ["Nicole", "Thompson", "nthompson3@admin.ch"],
        ["Marie", "Thompson", "mthompsonz@yelp.com"],
        ["Alan", "Vasquez", "avasquezo@miibeian.gov.cn"],
        ["Mildred", "Watkins", "mwatkins0@miibeian.gov.cn"],
        ["Eugene", "Williams", "ewilliamsi@deliciousdays.com"]
    ];
    // hierfuer muss pg-format installiert werden (wegen %L):
    const paramquery = format('INSERT INTO members(firstname, lastname, email) VALUES %L RETURNING *', values);


    try {
        const result = await client.query(paramquery)
        console.log(`${result.rowCount} members inserted ...`)
        res.status(200)
        res.send(result.rows)
    } catch (err) {
        console.log(err)
    }

});

module.exports = initdb;