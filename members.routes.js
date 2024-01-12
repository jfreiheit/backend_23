const express = require('express');
const client = require('./db')
const router = express.Router();

// CRUD
//router.METHOD(PATH, HANDLER)

// get all members - Read all
router.get('', async(req, res) => {
    const sqlStatement = `SELECT * FROM members order by lastname ASC`;

    try {
        const result = await client.query(sqlStatement)
        console.log(result)
        res.send(result.rows);
    } catch (err) {
        console.log('error - select' , err.stack)
    }
});


// post one member - Create
router.post('', async(req, res) => {
    let firstname = (req.body.firstname) ? req.body.firstname : null;
    let lastname = (req.body.lastname) ? req.body.lastname : null;
    let email = (req.body.email) ? req.body.email : null;

    let exists = await client.query('SELECT * FROM members WHERE lastname = $1', [lastname])
    console.log('rowCount : ', exists.rowCount)
    if(exists.rowCount > 0)
    {
        res.send({ message: 'lastname already exists'})
    } else {

        const sqlStatement = `INSERT INTO members(firstname, lastname, email) VALUES ($1, $2, $3) RETURNING *`;

        try {
            const result = await client.query(sqlStatement, [firstname, lastname, email])
            //console.log(result)
            res.send(result.rows[0]);
        } catch (err) {
            console.log(err.stack)
        }
    }
});


// delete one member via id
// /members/vorname/11/freiheit
router.delete('/:id', async(req, res) => {
    const query = `DELETE FROM members WHERE id=$1`;

    try {
        const idParam = req.params.id;
        console.log('id = ', idParam)
        const result = await client.query(query, [idParam])
        console.log(result)
        if (result.rowCount == 1)
            res.send({ message: "Member with id=" + idParam + " deleted" });
        else
            res.send({ message: "No member found with id=" + idParam });
    } catch (err) {
        console.log(err.stack)
    }
});


// get one member via id
router.get('/:id', async(req, res) => {
    const query = `SELECT * FROM members WHERE id=$1`;

    try {
        const id = req.params.id;
        const result = await client.query(query, [id])
        console.log(result)
        if (result.rowCount == 1)
            res.send(result.rows[0]);
        else
            res.send({ message: "No member found with id=" + id });
    } catch (err) {
        console.log("error", err.stack)
    }
});

// update one member
router.put('/:id', async(req, res) => {
    const query = `SELECT * FROM members WHERE id=$1`;

    let id = req.params.id;
    const result = await client.query(query, [id])
    if(result.rowCount > 0)
    {
        let member = result.rows[0];
        let firstname = (req.body.firstname) ? req.body.firstname : member.firstname;
        let lastname = (req.body.lastname) ? req.body.lastname : member.lastname;
        let email = (req.body.email) ? req.body.email : member.email;

        const updatequery = `UPDATE members SET 
            firstname = $1, 
            lastname = $2,
            email = $3
            WHERE id=$4;`;
        const updateresult = await client.query(updatequery, [firstname, lastname, email, id]);
        console.log(updateresult)
        res.send({ id, firstname, lastname, email });
    } else {
        res.status(404)
        res.send({
            error: "Member with id=" + id + " does not exist!"
        })
    }
});


module.exports = router;