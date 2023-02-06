class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  if (err.statusCode === undefined) {
    err.statusCode = 400;
  }
  const { statusCode, message } = err;

  res.status(statusCode).json({
    status: "Error",
    statusCode,
    message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
