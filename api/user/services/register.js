let User = require('../../../db/models/users');
const md5 = require("md5");
const jwt = require("jsonwebtoken");

module.exports = {
    checkUserExists: (email) => {
        try {
            return User.findOne({ email: email });
        } catch (err) {
            throw err;
        }
    },
    createUser: async (dataObj) => {
        try {
            dataObj.password = md5(dataObj.password);
            // .populate('user' , '-password')

            let user = await User.create(dataObj);
            console.log(user);
        
            return user;


        } catch (err) {
            throw err;
        }
    }
}