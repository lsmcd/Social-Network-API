const { Schema, model } = require("mongoose");

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

module.exports = Thought;