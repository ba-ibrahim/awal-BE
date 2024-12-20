

const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();

async function authCheck(req, res, next) {
    const authHeader = req.headers['authorization'];
    // console.log(authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided or malformed authorization header' });
    }


    const token = authHeader.split(' ')[1];
    console.log(token);
    

    const secretKey = process.env.JWT_SECRET; 

    try {
        // Verify and decode the token
        const decoded = await jwt.verify(token, secretKey);

        // Attach decoded data to the request object
        req.user = decoded;

        console.log(req.user);
        


        // Proceed to the next middleware
        next();
    } catch (error) {
        // Handle token verification errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = authCheck;
