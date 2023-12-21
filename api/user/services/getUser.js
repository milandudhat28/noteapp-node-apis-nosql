let User = require('../../../db/models/users');


module.exports = {
    getUser : async(id) =>{
        try{
            let user = await User.find({ _id : id });
            return user;
        }
        catch(err){
            throw err;
        }
    }
}