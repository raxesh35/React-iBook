const jwt = require('jsonwebtoken');
const JWT_TOKEN = "raxkareactmind";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({error : "Please authenticate a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_TOKEN);
        req.user = data.user;
        next();    
    } catch (error) {
        return res.status(401).send({error : "Please authenticate a valid token"})
    }
}
module.exports = fetchuser;