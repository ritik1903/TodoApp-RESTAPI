// var mongoose = require("mongoose");

// mongoose.Promise = global.Promise;
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost:27017/TodoAPI"
// );

// module.exports = { mongoose };

const mongoose = require("mongoose");


const DB = "mongodb+srv://pawarsubham438:jLgK5chO6nmugBqS@cluster5.mhgtdck.mongodb.net/todoapp-RESTAPI?retryWrites=true&w=majority";


mongoose.connect(DB).then(() => {
 
    useMongoClient:true

  console.log('Connection Successful');
}).catch((err) => console.log("No Connection" + err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error Connecting to MongoDB"));

db.once('open',function(){
  console.log('Connected to Database :: MongoDB');
});

module.exports = db;