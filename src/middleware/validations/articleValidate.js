import Joi from 'joi';

const validateArticle = (req, res, next) => {
    const schema = Joi.object().keys({
        title: Joi.string().required().min(5),
        content: Joi.string().required().min(5)
        });
    const result =  schema.validate(req.body);
    if(result.error){
        res.status(422).send(result.error.details[0].message);
    } else{
        next();
    }
}

export default validateArticle