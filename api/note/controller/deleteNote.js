const APIResponseFormat = require('../../../utils/APIResponseFormat');
const deleteNoteServices = require('../services/deleteNote.js');
const editNoteServices = require('../services/editNote.js');

module.exports =  {
    deleteNote : async (req, res) => {
        try{
            let noteId = req.headers.noteid;
            let userId = req.user.id;
            if(!noteId){
                return APIResponseFormat._ResMissingRequiredField(res, "Note Id is required")
            }
            if(!userId){
                return APIResponseFormat._ResMissingRequiredField(res, "user Id is required")
            }

            // checking user belongs to this note or not
            let user = await editNoteServices.checkUserBelongsToNote({noteId, userId});
            if(!user){
                return APIResponseFormat._ResDataNotExists(res , "User does not belongs to this note");
            }

            let note = await deleteNoteServices.deleteNote({noteId, userId});
            console.log(note);
            return APIResponseFormat._ResDataDeleted(res, "Note deleted successfully");
        }
        catch(error){
            return APIResponseFormat._ResServerError(res, error)
        }
    }
}