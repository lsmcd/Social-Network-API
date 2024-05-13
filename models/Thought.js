const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
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
    reactions: [reactionSchema]
});

thoughtSchema.virtual("reactionCount").get(() => {
    return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = {Thought};