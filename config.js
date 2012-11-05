// Don't commit this file to your public repos
exports.creds = {
  // Your mongo auth uri goes here
  // e.g. mongodb://username:server@mongoserver:10059/somecollection
  mongoose_auth: 'process.env.MONGOHQ_URL'
}

//Define Mongoose Schema
var MsgSchema = new Schema({
    date: {type: Date, default: Date.now},
    message: String
});
//Create test model and message
var MsgModel = db.model("messages", MsgSchema);
var Msg = new MsgModel();
Msg.message = "blurgh";
Msg.save();
var Msg2 = new MsgModel();
Msg2.message = "long string message.";
Msg2.save();