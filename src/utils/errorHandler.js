import ApiError from "./ApiError.js"

// wrapper the controllers with it
function catchAsync(wrappedFn) {
  return  (req, res, next) => {
    try {
      wrappedFn(req,res,next)
    } catch (error) {
      console.log(error)
      handleError(res, error) 
    }
  }
}

function handleError(res, error) {

  let errorObj = {}

  if(!(error instanceof ApiError)) {
    errorObj = {
      message: "خطایی در ارتباط با سرور پیش آمده",
      statusCode:500,
      details: {}
    }
  } else {
    errorObj = error
  }

  const response = {
    success: false,
    message: errorObj.message,
    ...errorObj.details
  }

  return res.status(errorObj.statusCode).send(response)
}

export {
  catchAsync
}