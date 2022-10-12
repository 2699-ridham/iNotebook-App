const express = require("express");
const connection = require("./db");
const  cors = require("cors")
connection();

const app = express();
const port = 5000

app.use(cors());
//used for request in json format -> data
app.use(express.json());

//routs the api's
app.use('/api/auth', require("./routes/auth"));
app.use('/api/notes', require('./routes/notes'));

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.get('/login', (req,res)=>{
    res.send("hello login is this side");
})
app.listen(port,()=>{
    console.log(`Listening from the port http://localhost:${port}`);
})