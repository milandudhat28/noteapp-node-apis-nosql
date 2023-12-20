const APIResponseFormat = require('../../../utils/APIResponseFormat');
const getAllNoteServices = require('../services/getAllNote.js');
module.exports = {
    getAllNote : async (req, res) => {
        try{

            let allNote = await getAllNoteServices.getAllNote(req.user.id);
            return APIResponseFormat._ResDataFound(res, "All notes", allNote);
        }
        catch(error){
            return APIResponseFormat._ResServerError(res, error)
        }
    }
}