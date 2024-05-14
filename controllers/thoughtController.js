const db = require("../config/connection")
const {User, Thought} = require("../models/index")

async function getAllThoughts(req, res){
    try {
        let thoughts = await db.collection("thoughts").find().toArray();
        res.status(200).json(thoughts);
    } catch (err) {console.log(err)}
}

async function getThought(req, res){
    try {
        let thought = await Thought.findOne({_id: req.params.id});
        res.status(200).json(thought);
    } catch (err) {console.log(err)}
}

async function postThought(req, res){
    try {
        let error; 
        let thought = await new Thought.create(req.body).catch((err) => error = err);
        let user = await User.findOne({username: req.body.username});
        user.thoughts[user.thoughts.length] = thought._id;
        user.save();
        if (!error){
            res.status(200).json("Successfully created");
        } else {
            res.status(400).json(error);
        }
    } catch (err) {console.log(err)}
}

async function putThought(req, res){
    try {
        let error; 
        await Thought.findOneAndUpdate({_id: req.params.id}, req.body).catch((err) => error = err);
        if (!error){
            res.status(200).json("Successfully updated");
        } else {
            res.status(400).json(error);
        }
    } catch (err) {console.log(err)}
}

async function deleteThought(req, res){
    try {
        let error; 
        let user = await Thought.findOneAndDelete({_id: req.params.id}).catch((err) => error = err);
        if (!error){
            res.status(200).json("Successfully deleted");
        } else {
            res.status(400).json(error);
        }
    } catch (err) {console.log(err)}
}

async function postReaction(req, res){
    try {
        let error; 
        let thought = await Thought.findOne({_id: req.params.id}).catch((err) => error = err);
        thought.reactions[thought.reactions.length] = {
            reactionBody: req.body.body,
            username: req.body.username
        };
        thought.save();
        if (!error){
            res.status(200).json("Successfully posted");
        } else {
            res.status(400).json(error);
        }
    } catch (err) {console.log(err)}
}

async function deleteReaction(req, res){
    try {
        let error; 
        let thought = await Thought.findOneAndUpdate({_id: req.params.id},{ $pullAll: {reactions: [{$with: {reactionId: req.body.reactionId}}]}});
        for (let i = 0; i < thought.reactions.length; i++){
            if (thought.reactions[i].reactionId == req.body.reactionId){
                thought.reactions = thought.reactions.slice(i, i);
            }
        }
        console.log(thought)
        thought.save()
        if (!error){
            res.status(200).json("Successfully deleted");
        } else {
            res.status(400).json(error)
        }
    } catch (err) {console.log(err)}
}
module.exports = {getAllThoughts, postThought, getThought, putThought, deleteThought, postReaction, deleteReaction};