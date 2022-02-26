const { ValidationError } = require('sequelize');

function logErrors (error, req, res, next) {
  /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
  console.error(error);
  next(error);
}

function errorHandler (error, req, res, next) {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  })
}

function boomErrorHandler (error, req, res, next) {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload)  
  } else {
    next(error);
  }
}

function ormErrorHandler(error, req, res, next){
  if (error instanceof ValidationError) {
    res.status(409).json({
      // set custom format 
      statusCode: 409,
      message: error.name,
      errors: error.errors
    })
  }
  next(error);
}


module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };