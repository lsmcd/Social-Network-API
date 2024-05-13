const db = require("../config/connection");
const { User, Thought, reactionSchema } = require("../models");

db.on("error", (err) => err);

db.once("open", async () => { 

    if ((await db.collection("users").find().toArray()).length) {
        db.dropCollection("users");
    }

    console.log("Database Connected");

    let users = []

    // Create 20 users
    for (let i = 0; i < 20; i++){
        let user = 
        {
            username: "username" + i,
            email: "email" + i + "@email.com"
        }
        users.push(user)
    }

    await User.insertMany(users);

    // Iterate all users
    for (let i = 0; i < 20; i++){
        // Add about 3 users to friends list
        for (let j = 0; j < 3; j++){
            let rand = Math.floor( Math.random() * 20 );
            if (rand !== i) {
                let friend = (await db.collection("users").findOne( {username: "username" + rand }))._id
                
                await db.collection("users").updateOne({
                    username: "username" + i
                },
                {  
                    $push: {friends: friend}
                })
            }
        }
    }

    if ((await db.collection("thoughts").find().toArray()).length) {
        db.dropCollection("thoughts");
    }

    let thoughts = []

    // Create 20 thoughts
    for (let i = 0; i < 20; i++){
        let rand = Math.floor( Math.random() * 20 );
        let thought = 
        {
            thoughtText: "so many thoughts",
            username: "username" + rand
        }
        //thoughts.push(thought)
        thought = new Thought(thought);
        console.log(thought)
        await User.findOneAndUpdate({
            username: "username" + i
        },
        {
            $push: {
                thoughts: {
                    _id: (thought._id),
                }
            }
        });
        thought.save()
    }

    //await Thought.insertMany(thoughts);

    let reactions = []

    // Create about 20 reactions
    for (let i = 0; i < 20; i++){
        let rand = Math.floor( Math.random() * 20 );
        
        if( rand !== i ) {
            await Thought.findOneAndUpdate({
                username: "username" + i
            },
            {
                $push: {
                    reactions: {
                        reactionId: (await db.collection("thoughts").findOne( {username: "username" + i })),
                        reactionBody: "this is a reactions",
                        username: "username" + rand
                    }
                }
            }
            );
        } 
    }

    console.log(await db.collection("users").find().toArray())
    console.log(await db.collection("thoughts").find().toArray())
    console.log((await db.collection("thoughts").find().toArray())[0].reactions)
});
