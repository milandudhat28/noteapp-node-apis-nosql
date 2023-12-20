const APIResponseFormat = require('../../../utils/APIResponseFormat');
const userRegisterServices = require('../services/register.js');   
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;


module.exports = {
    register: async (req, res, next) => {
        try {
            let {name , email , password} = req.body;
            if(!name){
                return APIResponseFormat._ResMissingRequiredField(res, "Name is required")
            }
            if(!email){
                return APIResponseFormat._ResMissingRequiredField(res, "Email is required")
            }
            if (!regexEmail.test(email)) {
                return APIResponseFormat._ResMissingRequiredField(res, "provided email is not valid")
            }
            if(!password){
                return APIResponseFormat._ResMissingRequiredField(res, "Password is required")
            }

            // checking email exists or not
            let existUser = await userRegisterServices.checkUserExists(email);
            if(existUser){
                return APIResponseFormat._ResDuplicateEntry(res, "User already exists with provided email")
            }

            // create user
            let user = await userRegisterServices.createUser({name , email , password});
            console.log("user" , user);
            if(user){
                return APIResponseFormat._ResDataCreated(res, "User created successfully" , user)
            }
            return APIResponseFormat._ResError(res, "User creation failed")
        } catch (error) {
            // next(error);
            return APIResponseFormat._ResServerError(res, error)
        }
    }
}