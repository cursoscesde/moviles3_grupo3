const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose")
const port = 3001
const clusterUrl = "mongodb+srv://cursoscesde:cursoscesde2020@cluster0.2wjhn.mongodb.net/cursoscesde";
app.use(cors({ origin: true }));
app.use(express.json());

app.get('/users', (req, res) => {
  res.json({response: 'Hello World!'});
});
app.get('/listTasks', (req, res) => {
    res.json({response: 'lista de tareas'});
});
app.post('/createTask', async (req,res)=>{
    const {task, date} = req.body;
    console.log(`Tarea: ${task} -- Fecha: ${date}`);
    const db = await mongoose.createConnection(clusterUrl,{ useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true });
    const collectionTasks = db.collection('tasks');
    const data = await collectionTasks.insertOne(req.body);
    console.log(data);
    res.json(req.body);
});

app.delete('/deleteTask', (req,res) => {
  const {id} = req.body;
  console.log("Id tarea a eliminar");
  res.json(req.body);
});
// const ObjectId = mongoose.Types.ObjectId;

// app.get('/users', async (req, res) => {
//     try {
//         const db = await mongoose.createConnection(awsClusterUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, poolSize: 10 });
//         const collectionName = db.collection('registeredUsers');
//         // const user = await collectionName.find({date: {$gte: 202010140000 } }).toArray();
//         // const user = await collectionName.find({}).toArray();
//         const users = await collectionName.aggregate([

//             {
//                 $group: {
//                     originalId: {$first: '$_id'}, // Hold onto original ID.
//                     _id: '$identification', // Set the unique identifier
//                     fullname:  {$first: '$fullname'},
//                     city: {$first: '$city'},
                   
//                 }
        
//             }, {
//                 // this receives the output from the first aggregation.
//                 // So the (originally) non-unique 'id' field is now
//                 // present as the _id field. We want to rename it.
//                 $project:{
//                     _id : '$originalId', // Restore original ID.
        
//                     identification  : '$_id', // 
//                     fullname : '$fullname',
//                     city: '$city',
                    
//                 }
//             }
//         ]).toArray();
//         console.log(users);
//         // const awsDb = await mongoose.createConnection(awsClusterUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, poolSize: 10 });
//         // const collectionRegisteredUsers = awsDb.collection('churches');
//         // const users = await collectionRegisteredUsers.insertMany(user);
//         res.json({
//             res: {
//                 success: true,
//                 data: users.length,
//                 error: {
//                     title: "",
//                     message: ""
//                 }
//             }
//         });
//     } catch (error) {
//         res.json({
//             res: {
//                 success: false,
//                 data: [],
//                 error: {
//                     title: "Bad request",
//                     message: "" + error
//                 }
//             }
//         });
//     }
// });
// npm i cors --save
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
// npm i nodemon --save-dev