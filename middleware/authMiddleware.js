import jwt from 'jsonwebtoken'
import User from '../model/user.js';


const verifyUser = async( req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({success: false, error: "Unauthorized"})
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({success: false, error: "Token Not Valid"})

        }

        const user  = await User.findById({_id: decoded._id}).select('-password'); 
        if(!user){
            return res.status(401).json({success: false, error: "User not found"})
        }
        req.user = user;
        next()
    } catch (error) {
        return res.status(500).json({success: false, error: "serrver error"})
    }
}

export default verifyUser