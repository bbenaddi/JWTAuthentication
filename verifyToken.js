require('dotenv/config');
const jwt = require('jsonwebtoken');


module.exports = (req,res,next) => {
    const token = req.body.token;

    if(!token) return res.status(400).send({errorno : 2,message : "Token dosen't exist!"});

    try{
        const result = jwt.verify(token, process.env.TOKEN_SECRET);
        if(result){
            req.body.id = result.id;
            next();
        }else{
            return res.status(400).send({errorno : 1,message : 'Invalid Token !'});
        }
    }catch(err){
        return res.status(400).send({errorno : 1,message : 'Invalid Token !'});
    }
};