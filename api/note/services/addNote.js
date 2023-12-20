const Note = require("../../../db/models/notes");
const User = require("../../../db/models/users");

module.exports = {
    addNoteService : async (data) => {
        try{
            return await Note.create(data);
        }
        catch(err){
            throw err;
        }
    }
};


