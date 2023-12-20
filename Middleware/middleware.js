const jwt = require("jsonwebtoken");
const APIResponseFormat = require("../utils/APIResponseFormat");

module.exports = {
  isSignedIn: (req, res, next) => {
    const token = req.headers["authorization"]
      ? req.headers["authorization"].trim().split(" ")[1]
      : null;

    if (!token) {
      return res.status(400).json({
        success: false,
        status: 401,
        message: "User is not authorized for this operation",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;
    } catch (error) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "User is not authorized for this operation",
      });
    }
    return next();
  },

  thirdPartyCheck: (req, res, next) => {
    const token = req.headers["authorization"]
      ? req.headers["authorization"].trim().split(" ")[1]
      : null;

    if (!token) {
      return res.status(400).json({
        success: false,
        status: 401,
        message: "User is not authorized for  try this operation",
      });
    }

    const auth = new Buffer.from(token, "base64").toString().split(":");

    const username = auth[0];
    const password = auth[1];

    if (username === "TMSAPI" && password == "TMSAPICCC@123") {
      // If Authorized user
      req.user = { username, password };
    } else {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "User is not authorized for this Catch operation",
      });
    }

    return next();
  },

  appMiddleWare: (req, res, next) => {
    const token = req.headers["authorization"]
      ? req.headers["authorization"].trim().split(" ")[1]
      : null;
      

    if (!token) {
      return res.status(400).json({
        status: 401,
        success: false,
        message: "User is not authorized for this operation",
        data: {},
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.APP_ACCESS_TOKEN_SECRET);
      req.user = decoded;
    } catch (error) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "User is not authorized for this operation",
        data: {},
      });
    }
    return next();
  },

  isSsoSignedIn: async (req, res, next) => {
    // check session_id and token is valid or not
    try {
      const { session_id, token } = req.headers;

      // check session_id and token is passed or not
      if (!session_id || !token) {
        return APIResponseFormat._ResMissingRequiredField(res, "session_id and token is required");
      }

      const response = await fetch("http://sso-server/validate-token", {
      // const response = await fetch("http://localhost:5000/validate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "session_id": session_id,
          "token": token,
        },
      });

      const data = await response.json();
      console.log(data);
      if (data.status !== 200) {
        return APIResponseFormat._ResModifiedMessage(res, data.status , data.message);
      }

      return next();
    }
    catch (error) {
      return APIResponseFormat._ResServerError(res, error)
    }
  }
};
