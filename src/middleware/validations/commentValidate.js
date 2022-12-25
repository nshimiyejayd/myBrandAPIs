import Joi from 'joi';

const validateComment = (req, res, next) => {
    const schema = Joi.object().keys({
        user: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }),
        comment: Joi.string().required()
        })
        
    const result =  schema.validate(req.body);
    
    if(result.error){
        res.status(422).send(result.error.details[0].message);
    } else{
        next();
    }
}

export default validateComment;