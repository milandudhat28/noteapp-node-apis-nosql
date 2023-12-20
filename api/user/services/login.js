let User = require('../../../db/models/users');
const md5 = require("md5");
const jwt = require("jsonwebtoken");

module.exports = {
    login: async (data) => {
        try {
            console.log(data);
            let password = md5(data.password);
            let email = data.email;

            let user = await User.findOne({ email: email , password: password });

            console.log(user);

            if (user) {
                const payload = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }

                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: process.env.ACCESS_TOKEN_LIFE,
                    algorithm: "HS256",
                  });

                return {
                    token: accessToken,
                    user: user
                };
            }
            return false;
        } catch (error) {
            return error;
        }
    }
}