//Send response to the user after signup hass succeeded
const signUp = (req, res, next) => {
    res.status(200).json({
    message: 'Signup successful',
    user: req.user
    });
};
export default signUp