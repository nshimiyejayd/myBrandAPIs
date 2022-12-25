//Send response to the user after acount has created
const signUp = (req, res, next) => {
    res.status(200).json({
    message: 'Signup successful',
    user: req.user
    });
};
export default signUp