module.exports = async function(db) {
/////////////////////////////////////

const User = db.model("User");
const users = await User.find({});
console.log(users);





/////////////////////////////////////
};