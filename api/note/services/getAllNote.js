

const Note = require("../../../db/models/notes");
const User = require("../../../db/models/users");

module.exports = {
    getAllNote: async (data) => {
        try{
            return await Note.find({user : data});
        }
        catch(err){
            throw err;
        }
    }
};


