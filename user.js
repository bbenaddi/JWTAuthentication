require('dotenv/config');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const verify = require('./verifyToken.js');
const db = require('./connection.js');

router.post('/signin',(req,res) => {
    if(!req.body.username || !req.body.password)
        return res.status(400).send({errorno : 3,message : "Username or Password is missing"});

    db.column(['id','password']).select().from('user').where('username','=',req.body.username)
    .then(async (result) => {
        if(result.length != 1) return res.status(400).send({errorno : 3,message : "Username or Password is wrong"});
            
            const password = result[0].password;
            const resultat = bcrypt.compareSync(req.body.password , password);
            if(!result) return res.status(400).send({errorno : 3,message : "Username or Password is wrong"});

            const id = result[0].id            
            const token = await jwt.sign({id : id},process.env.TOKEN_SECRET);

            return res.status(200).send({token : token});
    })
    .catch(error => {
        return res.status(400).send({errorno : 5,message : "Database error"});
    });
});

router.post('/signup',(req,res) => {  
    if(!req.body.username || !req.body.password)
      return res.status(400).send({errorno : 3,message : "Username or Password is missing"});

    db.column(['id']).select().from('user').where('username','=',req.body.username)
    .then(async (result) => {
        if(result.length > 0) return res.status(400).send({errorno : 4,message : "Username already exist !"});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);

        db.insert({username: req.body.username,password : hashPassword}).into('user')
        .then(result => {
            return res.status(200).send({message : "User Registered !"});
        })
        .catch(error => {
            return res.status(400).send({errorno : 5,message : "Database error"});
        });
    })
    .catch(error => {
        return res.status(400).send({errorno : 5,message : "Database error"});
    });
});

router.post('/check',verify,(req,res) => {
    res.status(200).send({id : req.body.id});
});

module.exports = router ;