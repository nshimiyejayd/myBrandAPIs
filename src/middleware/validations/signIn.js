import Joi from 'joi';

const validateSignInSchema = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required()
        })
        
    const result = schema.validate(req.body);
    if(result.error){
        res.status(422).send(result.error.message);
    } else{
        next();
    }
}

export default validateSignInSchema;