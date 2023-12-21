let User = require('../../../db/models/users');


module.exports = {
    getUser : async(id) =>{
        try{
            let user = await User.findById(id);
            return user;
        }
        catch(err){
            throw err;
        }
    }
}