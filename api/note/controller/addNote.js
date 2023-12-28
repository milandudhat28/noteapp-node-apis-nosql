const addNoteServices = require('../services/addNote.js');
const APIResponseFormat = require('../../../utils/APIResponseFormat');


module.exports = {
    addNote : async (req, res) => {
        try{
            // console.log(req.user.id);
            let { title, description } = req.body;
            if(!title){
                return APIResponseFormat._ResMissingRequiredField(res, "Title is required")
            }
            if(!description){
                return APIResponseFormat._ResMissingRequiredField(res, "Description is required")
            }

            let noteObj = {
                title : title,
                description : description,
                user : req.user.id
            }
            let addNote = await addNoteServices.addNoteService(noteObj);
            console.log(addNote);
            return APIResponseFormat._ResDataCreated(res, "Note added successfully", addNote);
        }
        catch(error){
            return APIResponseFormat._ResServerError(res, error)
        }
    }
}