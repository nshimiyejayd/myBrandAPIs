import Admin from '../models/admin.js';

const isUserExist = ( async(req, res, next) =>{
    const user_email = req.body.email
    const user = await Admin.findOne({email: user_email});
    if(user){
        return res.status(200).json({message: `User with email ${user.email} is already exist`});
    }
    next();
});

export default isUserExist;
