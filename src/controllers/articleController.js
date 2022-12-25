import Blogs from "../models/blog.js"
import Comments from "../models/comment.js"

class CreateArticle {
    CreateArticle = (async (req, res) =>{
        try{
            const {title, content} = req.body;
            const blog = new Blogs({
                title, content,
                comments: 0,
                likes: 0 
             });

             if(req.file){
                blog.image = req.file.filename;
             }
           const saveBlog = await blog.save();
           return res.status(200).json({message: 'Article has added successful', data: saveBlog});
        }catch(err){
            console.log(err);
            return res.status(500).json({message: 'Somthing went wrong during article creation, try again'});
        }
    });

    getArticles = ( async(req, res) => {
        try{
            const blgs = await Blogs.find()
            if(blgs.length > 0){
            for(let i = 0; i < blgs.length; i++){
                const allComm = await Comments.find();
                const relatedComm = allComm.filter(obj => obj.article_id._id.toHexString() === blgs[i]._id.toHexString());
                blgs[i].comments[0] = relatedComm.length;
            }
                return res.status(200).json(blgs);
            } else{
                return res.status(404).json({message:'No records found'});
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({message:'Something went wrong while trying to retieve articles'});
        }
    });


    getSingleArticle = ( async(req, res) => {
        try{
            const blg = await Blogs.findById(req.params.id);
            if(blg){
                const allComm = await Comments.find();
                const relatedComm = allComm.filter(obj => obj.article_id._id.toHexString() === req.params.id);
                blg.comments = relatedComm;
                return res.status(200).json({success: true, data:blg});
            } else{
                return res.status(404).json({success: true, data: []});
            }
        }catch(err){
            console.log(err)
            return res.status(500).send({message:'Something went wrong while finding an article, Please try again'});
        }
    });


    // Add like
    addLike = ( async(req, res) =>{
        try{
            const like = await Blogs.findById(req.params.id);
            if(like){
                like.likes += 1;
                like.save();
                return res.status(200).json({message:`Thank you! like has added to ${like.title}`});
            }

            return res.status(404).json({success: true, message: 'Article to like does not found'})
            
            } catch(err){
            return res.status(500).send('Something went wrong while liking an article, try again');
        }
    })
    getLikesPerBlog = (async(req, res)=>{
        try{
            const like = await Blogs.findById(req.params.id);
            if(like){
                return res.status(200).json({message:`This blog has ${like.likes} likes`});
            }
            return res.status(404).json({success: true, message: 'Article does not found'});
            } catch(err){
            return res.status(500).send('Something went wrong while getting article likes, try again');
        }
    });

    deleteArticle = ( async(req, res) =>{
        try{
            const blg = await Blogs.findById(req.params.id);
            if(blg){
                await blg.delete();
                return res.status(200).json({success: true, message: 'Article has deleted'});
            } else{
                return res.status(404).json({success: true, message: 'Article does not found'});
            }
        }catch(err){
        return res.status(500).json({meaage: 'Error occured while deleting an article, try again'});
        }
    })

    updateArticle = (async(req, res) => {
        try{
            const blg = await Blogs.findById(req.params.id);
            if(blg){
                blg.title = req.body.title;
                blg.content = req.body.content;
                if(req.file){
                    blg.image = req.file.filename;
                }
                const up = await blg.save();
                return res.status(200).json({success: true, message: "article has updated", data: [up]});
            } 
            return res.status(404).json({success: true, meaagse:'Article does not found'});
            
        }catch(err){
            console.log(err);
            return res.status(500).send('Error occured while updating article, try again');
        }
    });

}
export default CreateArticle;



