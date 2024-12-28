import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSidebar = async(req,res)=>{
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        
        res.status(200).json(filteredUsers)
    }
    catch(err){
        console.error("Error in getUsersForSideBar: ",err.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const getMessages = async(req,res)=>{
    try{
        const { id:userIdToChat } = req.params
        const myId = req.user._id;

        const message = await Message.find({
            $or:[
                {senderId:myId,receiverId:userIdToChat},
                {senderId:userIdToChat,receiverId:myId}
            ]
        })

        res.status(200).json(message);
    }
    catch(err){
        console.log("Error in Getting Message ", err.message);
        res.status(500).json({message:"Internal Server Error"})
    }
};

export const sendMessage = async(req,res)=>{
    try{
        const { text, image } = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            //uploading base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        //todo the realtime functionality with Socket.io

        res.status(201).json(newMessage);
    }
    catch(err){
        console.log("Error in sendMessage controller: ",err.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};