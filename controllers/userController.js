const db = require("../config/connection")
const {User, Thought} = require("../models/index")

async function getAllUsers(req, res){
    try {
        let users = await db.collection("users").find().toArray();
        res.status(200).json(users);
    } catch (err) {console.log(err)}
}

async function getUser(req, res){
    try {
        let user = await User.findById(req.params.id);
        var thought;
        var newUser = {};
        let {_id, username, email} = user;
        newUser = {_id, username, email}
        newUser.thoughts = []
        for (let i = 0; i < user.thoughts.length; i++){
            thought = await Thought.findOne(user.thoughts[i]._id);
            newUser.thoughts.push(thought)
        }
        var friend;
        newUser.friends = []
        for (let i = 0; i < user.friends.length; i++){
            friend = await User.findOne(user.friends[i]._id);
            newUser.friends.push(friend)
        }
        res.status(200).json(newUser);
    } catch (err) {console.log(err)}
}

async function postUser(req, res){
    try {
        let error; 
        await User.create(req.body).catch((err) => error = err);
        if (!error){
            res.status(200).json("Successfully created");
        } else {
            res.status(400).json(error)
        }
    } catch (err) {console.log(err)}
}

async function putUser(req, res){
    try {
        let error; 
        await User.findOneAndUpdate({_id: req.params.id}, req.body).catch((err) => error = err);
        if (!error){
            res.status(200).json("Successfully updated");
        } else {
            res.status(400).json(error)
        }
    } catch (err) {console.log(err)}
}

async function deleteUser(req, res){
    try {
        let error; 
        let user = await User.findOneAndDelete({_id: req.params.id}).catch((err) => error = err);
        await Thought.deleteMany({username: user.username});
        if (!error){
            res.status(200).json("Successfully deleted");
        } else {
            res.status(400).json(error)
        }
    } catch (err) {console.log(err)}
}

async function postFriend(req, res){
    try {
        let error; 
        let user = await User.findOne({_id: req.params.userId}).catch((err) => error = err);
        user.friends[user.friends.length] = (req.params.friendId.trim());
        user.save()
        if (!error){
            res.status(200).json("Successfully posted");
        } else {
            res.status(400).json(error)
        }
    } catch (err) {console.log(err)}
}

async function deleteFriend(req, res){
    try {
        let error; 
        let user = await User.findOneAndUpdate({_id: req.params.userId},{ $pullAll: {friends: [req.params.friendId]}});
        if (!error){
            res.status(200).json("Successfully deleted");
        } else {
            res.status(400).json(error)
        }
    } catch (err) {console.log(err)}
}

module.exports = {getAllUsers, getUser, postUser, putUser, deleteUser, postFriend, deleteFriend}