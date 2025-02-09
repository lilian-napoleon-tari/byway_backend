const errorHandler = (err, req, res, next) => {
  console.log("Error", err);

  //The default error message and status
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  //sending response
  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;
