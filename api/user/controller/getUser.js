const APIResponseFormat = require('../../../utils/APIResponseFormat');
const getUserServices = require('../services/getUser.js');

module.exports = {
    getUser: async (req, res) => {
        try {
            let userId = req.user.id
            if (!userId) {
                return APIResponseFormat._ResMissingRequiredField(res, "User Id is required")
            }
            let user = await getUserServices.getUser(userId);
            return APIResponseFormat._ResDataFound(res, "User found", user);
        }
        catch (err) {
            return APIResponseFormat._ResServerError(res, err);
        }
    }
}