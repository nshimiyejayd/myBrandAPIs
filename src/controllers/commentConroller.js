import Comments from "../models/comment.js";
import Blogs from "../models/blog.js";

class AddComment{
    addComment = (async(req, res) => {
        try{
            const {user, email, comment} = req.body;
            const comm = new Comments({
                user, email, comment,
                article_id: req.params.id,
            });
            let update = await Blogs.findById(req.params.id);
            if(update){
                update.comments[0] += 1;
                update.save();
                const saveComm = await comm.save();
                return res.status(200).json(saveComm);
            } 
            return res.status(404).json({success: true, message: 'Article you are trying to add a comment does not found'});
        }catch(err){
            console.log(err)
            return res.status(404).send("Something went wrong while adding comment");
        }
    });
}

export default AddComment;