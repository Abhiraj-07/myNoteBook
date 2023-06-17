var jwt = require("jsonwebtoken");
const jwt_secreat = "FEasdfasdfgsadeghdf43435d45gdsfgdf";
const auth = async (req,res,next)=>{
    // take the token and verify it

    try{

        const token = req.header('AuthToken')
        if(token){
            let verify =await jwt.verify(token,jwt_secreat)
            req.id = verify;
        }else{
            res.status(401).send("accese denied")
        }
        next();
    }catch(error){
        res.send(error)
    }
}

module.exports = auth;