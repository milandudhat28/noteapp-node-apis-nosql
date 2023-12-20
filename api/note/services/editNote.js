const Note = require("../../../db/models/notes");
const User = require("../../../db/models/users");

module.exports = {
    checkNoteExists: async (noteId) => {
        try {
            let note = await Note.findById(noteId);
            console.log(note);
            return note;
        }
        catch (error) {
            return error;
        }
    },
    checkUserBelongsToNote: async ({ noteId, userId }) => {
        try {
            
            let note = await Note.findById(noteId);
            let user = await User.findById(userId);
            if (note.user.toString() === user._id.toString()) {
                return true;
            }
            return false;
        }
        catch (error) {
            return error;
        }
    },
    editNote: async (data) => {
        try {
            // check userId and noteId then update
            let { title, description, userId, noteId } = data;
            let note = await Note.findByIdAndUpdate({
                _id: noteId,
                userId: userId,
            }, { title, description }, { new: true });
            return note;
        }
        catch (err) {
            throw err;
        }
    }
}