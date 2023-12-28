const editNoteServices = require('../services/editNote.js');
const APIResponseFormat = require('../../../utils/APIResponseFormat');

module.exports =  {
    editNote : async (req, res) => {
        try{
            let userId = req.user.id;
            let noteId = req.headers.noteid;
            console.log(noteId);
            let { title, description } = req.body;

            if(!noteId ){
                return APIResponseFormat._ResMissingRequiredField(res, "Note Id is required")
            }
            if(!title){
                return APIResponseFormat._ResMissingRequiredField(res, "Title is required")
            }
            if(!description){
                return APIResponseFormat._ResMissingRequiredField(res, "Description is required")
            }
            if(!userId){
                return APIResponseFormat._ResMissingRequiredField(res, "user Id is required")
            }

            // checking note exists or not
            let note = await editNoteServices.checkNoteExists(noteId);
            console.log(note);
            if(!note){
                return APIResponseFormat._ResDataNotExists(res , "Note does not exists");
            }

            // checking user belongs to this note or not
            let user = await editNoteServices.checkUserBelongsToNote({noteId, userId});
            if(!user){
                return APIResponseFormat._ResDataNotExists(res , "User does not belongs to this note");
            }


            let editNote = await editNoteServices.editNote({title, description, userId , noteId});
            console.log(editNote);
            return APIResponseFormat._ResDataCreated(res, "Note updated successfully", editNote);
        }
        catch(error){
            return APIResponseFormat._ResServerError(res, error)
        }
    }
}