import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));

const users = [];

const tweets = [];

app.post("/sing-up", (req, res) => {

    const { username, avatar } = req.body;

    if(!username || typeof username !== 'string' || !avatar || typeof avatar !== 'string'){
        res.status(400).send('Error');
        return;
    }
    
    const newUser = {username, avatar};
    
    if (!users.find((u) => u.username === username)){
        users.push(newUser);
    }

    res.status(201).send('Ok');  
})

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;

    const user = users.find((u) => u.username === username);

    if(!user){
        res.send("UNAUTHORIZED");
        return;
    }

    const newTweet = {username, avatar: user.avatar , tweet};

    tweets.push(newTweet);

    res.send("OK");
})

app.get("/tweets", (req, res) => {
    const lastTweets = tweets.slice(-10).reverse();

    res.send(lastTweets);
});

