var jwt = require('jsonwebtoken')
const JWT_SECRET = 'KushalKha$ndhara';

const fetchuser = (req, res, next) => 
{
    // Get the user from the jwt token and id to req objcet
    const token = req.header('auth-token')

    if(!token)
    {
        res.status(401).send({error : "Please Authenticate using a valid token" })
    }
    try
    {
        const data = jwt.verify(token,JWT_SECRET);
        console.log(data)
        req.user = data;
        console.log(req.user)
        next();
    }
    catch(error) 
    {
        res.status(401).send({error : "Please Authenticate using a valid token" })
    }


} 


module.exports = fetchuser