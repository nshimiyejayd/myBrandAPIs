import Joi from 'joi';

const validateMessage = (req, res, next) => {
    const schema = Joi.object().keys({
        userName: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }),
        message: Joi.string().required()
        })
        
    const result = schema.validate(req.body);

    if(result.error){
        res.status(422).send(result.error.details[0].message);
    } else{
        next();
    }
}

export default validateMessage;