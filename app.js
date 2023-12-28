require('dotenv').config();
global.setup = {};
// // const umzug = require('./core/migration');
const mongoose = require("./db/models")
const APIResponseFormat = require("./utils/APIResponseFormat");
const express = require('express');
const app = express();
const chalk = require('chalk');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./core/routes');
const fp = require('find-free-port');
const morgan = require('morgan');
const config = require('./config/config.json');
const path = require('path');
const cors = require('cors');
const session = require('express-session');

app.get('/favico.ico', (req, res) => {
    res.sendStatus(404);
})



// //Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb", extended: true }))
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cookieParser());
app.use('/docs', express.static(path.join(__dirname, 'docs', 'dest')));
app.use('/uploads', express.static('public/uploads'));
app.use('/assets', express.static('public/assets'));
app.use(session({
    secret: 'cybercomhrmsproject',
    resave: false,
    saveUninitialized: true
}));








//For getting the the morgan Body according to the config.json allowBody and allowHeaders on  the endpoint
let morganBody = '';
morgan.token('header', function (req) {
    return JSON.stringify(req.headers);
});
morgan.token('body', function (req) {
        return Object.keys(req.body).length == 0 ? '' : JSON.stringify(req.body);
});
const { allowBody, allowHeaders } = config;
if (allowBody && allowHeaders) {
    morganBody =
        ':remote-addr - ":method :url HTTP/:http-version" :status :res[content-length] [:date[clf]] :body :header ';
} else if (allowBody || allowHeaders) {
        morganBody = `:remote-addr - ":method :url HTTP/:http-version" :status :res[content-length] [:date[clf]] ${allowBody ? ':body' : ':header'
            } `;
} else {
    morganBody =
        ':remote-addr - ":method :url HTTP/:http-version" :status :res[content-length] [:date[clf]]';
}

//logging the details of endpoint
app.use(morgan(morganBody));

//Running the crons
app.use((req, res, next) => {
	// crons.forEach((func) => {
    // 		func();
	// });
	next();
});

//Routes
for (let route of routes) {
    app[route.method](route.path, route.middlewares, route.action);
}



app.get('/', (req, res) => {
    return APIResponseFormat._ResModifiedMessage(res, 200 , "Welcome to Note App Apis");
})

app.get('*', (req, res) => {
    return APIResponseFormat._ResRouteNotFound(res, "Route Not Found");
})

//If no routes was matched show 404 not found error
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.statusCode = 404;
    next(error);
});



//Logging the error
app.use((err, req, res, next) => {
    let caller_line = err.stack.split('\n')[1];
    let index = caller_line?.indexOf('at ');
    let clean = caller_line?.slice(index + 2, caller_line.length);
    let lineNumber = clean.substr(-6, 2);
    console.log('Error:' + chalk.red(err.message));
    console.log(chalk.yellow(`Error occured at:`) + clean);
    console.log(chalk.yellow('Line Number in which error occured :') + lineNumber);
    return res.status(400).send({ message: err.message });
});



let PORT = parseInt(process.env.PORT);
//function to listen to server
app.listen(PORT , ()=>{
    console.log(`http://localhost:${PORT}`);
    console.log(chalk.green(`server is listenining on port ${PORT}`));
})






