const errorHandler = (err, req, res, next) => {

  const statusCode = err.statusCode || 500;

  const response = {
    success:false,
    message: err.message || "something went wrong",
    stack: process.env.NODE_ENV === "development" ? err.stack : null
  };
  


  res.status(statusCode).json(response);

};



export default errorHandler 