import Blogs from '../models/blog.js';

const isArticleExist = (async (req, res, next) => {
    const title = req.body.title;
    const blog =  await Blogs.findOne({title});
    if(blog){
        return res.status(200).json({success: true, message:"Article title is already exists"});
    }
    next();
})

export default isArticleExist;