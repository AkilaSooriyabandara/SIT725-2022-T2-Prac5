//require('dotenv').config()
var express = require("express")
var app = express()
var cors = require('cors')
//let dbConnect = require("./dbConnect");

const MongoClient = require('mongoDb').MongoClient;

const uri = 'mongodb+srv://akila:<0714452128>@cluster0.rumcwol.mongodb.net/test'
const client =  new MongoClient(uri,{ useNewUrlParser: true })

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const createColllection = (collectionName) => {
        client.connect((err,db) => {
            projectCollection = client.db().collection(collectionName);
            if(!err) {
                console.log('MongoDB Connected')
            }
            else {
                console.log("DB Error: ", err);
                process.exit(1);
            }
        })
    }

     app.post('/api/projects',(req,res) => {
            console.log("New Project added", req.body)
            var newProject = req.body;
            insertProjects(newProject,(err,result) => {
                if(err) {
                    res.json({statusCode: 400, message: err})
                }
                else {
                    res.json({statusCode: 200, message:"Project Successfully added", data: result})
                }
            })
        })


    // insert project...
    const insertProjects = (project,callback) => {
        projectCollection.insert(project,callback);
    
        
    app.get('/api/projects',(req,res) => {
            getProjects((err,result) => {
                if(err) {
                    res.json({statusCode: 400, message: err})
                }
                else {
                    res.json({statusCode: 200, message:"Success", data: result})
                }
            })
        })

        const getProjects = (callback) => {
                projectCollection.find({}).toArray(callback);
            }
            

// app.get('/api/projects',(req,res) => {
//     res.json({statusCode: 200, data: cardList, message:"Success"})
// })

// var port = process.env.port || 3000;

// app.listen(port,()=>{
//     console.log("App listening to: "+port)
//     createCollection("pets")
// })
