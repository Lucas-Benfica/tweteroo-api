import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const users = [
    {
        username: 'bobesponja',
        avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png"
    }, 
    {
        username: 'bobesponja',
        avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png"
    }]
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

    res.status(201).send("OK")
})

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body

    const user = users.find((u) => u.username === username)

    if(!user){
        console.log("o usuario não existe")
        res.status(401).send("UNAUTHORIZED")
        return
    }

    const newTweet = {username, avatar: user.avatar , tweet}

    tweets.push(newTweet)

    res.status(201).send(newTweet)
})

app.get("/", (req, res) => {

    res.send(users);
});

const nomes = [{ nome: "lucas", sobrenome: "soares" }, { nome: "jéssica", sobrenome: "soares" }]

app.post("/", (req, res) => {
    //const {nome} = req.body
    //console.log(req.body)
    console.log(nomes)
    const localizar = nomes.find(pessoa => pessoa.nome === "lucas")
    localizar.nome = "OLALUCAS"
    console.log("Alterações")
    console.log(nomes)
    //ALTEROU O ARRAY ORIGINAL

    res.send(`estamos ssssss aqui`)
})


app.listen(5000, () => console.log(`Running server on port 5000`));