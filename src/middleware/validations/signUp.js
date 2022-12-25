import Joi from 'joi';

const validateSignUpSchema = (req, res, next) => {
    const strongPasswordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const stringPassswordError = new Error("Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length");
    const stringEmail = new Error ("email must be valid");
    const schema = Joi.object().keys({
        email: Joi.string().email({ tlds: { allow: false } }).error(stringEmail).required(),
        password: Joi.string().regex(strongPasswordRegex).error(stringPassswordError).required()
        })
        
    const result = schema.validate(req.body);

    if(result.error){
        res.status(422).send(result.error.message);
    } else{
        next();
    }
}

export default validateSignUpSchema;