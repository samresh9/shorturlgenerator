module.exports.handleNotFoundError = async (req, res, next) => {
  const error = new Error(`Not Found ${req.method} ${req.originalUrl}`);
  error.code = "NOT_FOUND";
  res.statusCode = 404;
  next(error);
};

module.exports.handleErrors = async (err, req, res, _next) => {
  const { code, message } = err;
  console.log(err);
  res.statusCode = res.statusCode < 400 ? 500 : res.statusCode;
  let errorResponse = {
    errors: { message },
  };
  if (code) {
    errorResponse.code = code;
  }
  if (err.message.includes("User validation failed")) {
    console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      errorResponse.errors[properties.path] = properties.message;
    });
  }
  res.send(errorResponse);
};
