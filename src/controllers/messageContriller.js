import Message from "../models/message.js";

class MessageController{
    sendMessage = ( async(req, res) => {
        try{
            const {userName, email, message} = req.body;
            const msg = new Message({
                userName, email, message,
                article_id: req.params.id,
            });
            const saveMessage = await msg.save();
            return res.status(200).json({message: "Message sent successful", data: saveMessage});
        } catch(err){
            console.log(err)
            return res.status(404).send("Something went wrong while sending message");
        }
    });

    readMessage = ( async (req, res) => {
        try {
            const msg = await Message.find();
            if(msg){
                return res.status(200).send(msg);
            }
            return res.status(404).send("no message available");
        } catch(error){
            return res.status(500).send("Something went wrong while retieving messages")
        }
    });
}


export default MessageController;
