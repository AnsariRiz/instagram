const { constants } = require('../constants');
const errorHandler = (err, req, res, next) => 
{
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Failed", message: err.message, status: statusCode });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, status: statusCode });
        break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Unathurized", message: err.message, status: statusCode });
        break;    
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, status: statusCode });
        break;
        case constants.SERVER_ERROR:
            res.json({ title: "Server Error", message: err.message, status: statusCode });
        break;    
        default:
            res.json({ message: "No Error", status: statusCode });
        break;       
    }
};

module.exports = errorHandler;