let Express = require("express");
let MongoClient = require("mongodb").MongoClient;
let cors = require("cors");
const multer = require("multer");
require('dotenv').config();


let app = Express();
// const corsOptions = {
//     origin: 'http://localhost:3001',
//     methods: 'GET,POST,DELETE',
//     credentials: true,
//   };
app.use(cors());

let DATABASENAME="sample";
let database;

app.listen(3001,()=>{
    MongoClient.connect(process.env.CONNECTIONSTRING,(error,client)=>{
        database=client.db(DATABASENAME);
        console.log("CONNECTED TO MONGODB");
    })
})

app.get('/api/todo_final/GetNotes',(request,response)=>{
console.log('Received a GET request to /api/todo_final/GetNotes');
  database.collection("samplecollection").find({}).toArray((error, result) => {
    if (error) {
      console.error('Error fetching data:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Sending data:', result);
      response.send(result);
    }
  });
})

app.post('/api/todo_final/AddNotes',multer().none(),(request,response)=>{
    console.log('Received a POST request to /api/todo_final/AddNotes');
    database.collection("samplecollection").count({},function(error,numOfDocs){
        if (error) {
            console.error('Error adding data:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        } else {
        database.collection("samplecollection").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
        });
        response.json("Added successfully");
    }
    })
})

app.delete('/api/todo_final/DeleteNotes',(request, response)=>{
    console.log('Received a DELETE request to /api/todo_final/DeleteNotes');
    database.collection("samplecollection").deleteOne({
        id:request.query.id
    });
    response.json("Deleted successfully");
})
