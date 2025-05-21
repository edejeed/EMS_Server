import User from '../model/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success: false, error: "User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success: false, error: "Invalid credentials"})
        }
        const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: '10d'}) 
        res.status(200).json({success: true, token, user: {_userId: user._id, name: user.name, isAdmin: user.isAdmin}})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
    
}

const verify = async (req, res) => {
    return res.status(200).json({success: true, user: req.user})
}

export {login, verify}