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
        await Thought.create(req.body).catch((err) => error = err);
        if (!error){
            res.status(200).json("Successfully created");
        } else {
            res.status(400).json(error)
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
            res.status(400).json(error)
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
            res.status(400).json(error)
        }
    } catch (err) {console.log(err)}
}

module.exports = {getAllThoughts, postThought, getThought, putThought, deleteThought};