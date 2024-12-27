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