import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const users = []
/* 
{
    username: 'bobesponja', 
    avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png" 
}
*/
const tweets = []
/* 
{
    username: "bobesponja",
    avatar: "avatar"
    tweet: "Eu amo hambúrguer de siri!"
}
*/

app.post("/sing-up", (req, res) => {
    const {username, avatar} = req.body

    const newUser = {username, avatar}

    users.push(newUser)

    res.send("OK")
})

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body

    const user = users.find((u) => u.username === username)

    if(!user){
        res.send("UNAUTHORIZED")
        return
    }

    const newTweet = {username, avatar: user.avatar , tweet}

    tweets.push(newTweet)

    res.send("OK")
})

app.get("/tweets", (req, res) => {
    const lastTweets = tweets.slice(-10).reverse()

    res.send(lastTweets)
});

app.listen(5000, () => console.log(`Running server on port 5000`));