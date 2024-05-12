const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Schema.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        validate: (val) => {
            return val.length <= 280;
        }
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date(),
        get: (date) => {
            return date.toLocaleDateString();
        }
    }
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        validate: (val) => {
            return (val.length >= 1 && val.length <= 280);
        }
    },
    createdAt: {
        type: Date,
        default: Date(),
        get: (date) => {
            return date.toLocaleDateString();
        }
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Reaction"
        }
    ]
});

thoughtSchema.virtual("reactionCount").get(() => {
    return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

const Reaction = model("reaction", reactionSchema);

module.exports = {Thought, Reaction};