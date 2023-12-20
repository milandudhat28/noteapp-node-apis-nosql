const Note = require("../../../db/models/notes");


module.exports = {
    deleteNote : async (data) => {
        let { noteId, userId } = data;
        try {
            console.log(noteId, userId);
            let note = await Note.findOneAndDelete({ _id: noteId , user: userId });
            console.log(note);
            return note;
        
        }
        catch (err) {
            throw err;
        }
    }
};



