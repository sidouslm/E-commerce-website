import jwt from 'jsonwebtoken'


const adminAuth = (req,res,next)=> {
    try {
        const {token} = req.headers;
        if(!token) {
            return res.json({success:false,message:'not Authorized'})
        }else {
            const token_decode = jwt.verify(token,process.env.JWT_SECRET);
            if (!token_decode.isAdmin) {
                return res.json({success:false,message:'not Authorized'})
            }
        }
        next()
    } catch (error) {
        console.error(error);
        res.json({ success: false,  message : error.message })

    }
}



export default adminAuth
