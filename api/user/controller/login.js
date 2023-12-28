const APIResponseFormat = require('../../../utils/APIResponseFormat');
const userLoginServices = require('../services/login.js');  
const userRegisterServices = require('../services/register.js'); 
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;


module.exports = {
    login : async (req, res) => {
        try{
            let {email , password} = req.body;
            if(!email){
                return APIResponseFormat._ResMissingRequiredField(res, "Email is required")
            }
            if (!regexEmail.test(email)) {
                return APIResponseFormat._ResMissingRequiredField(res, "provided email is not valid")
            }
            if(!password){
                return APIResponseFormat._ResMissingRequiredField(res, "Password is required")
            }

            // checking user exists or not
            let existUser = await userRegisterServices.checkUserExists(email);
            if(!existUser){
                return APIResponseFormat._ResDataNotExists(res , "User does not exists with provided email");
            }


            let user = await userLoginServices.login({email, password});
            if(!user){
                return APIResponseFormat._ResInvalidCredentials(res);
            }
            console.log(user);
            return APIResponseFormat._ResDataFound(res, "User logged in successfully", user);
        }
        catch(error){
            return APIResponseFormat._ResServerError(res, error)
        }
    }
}
