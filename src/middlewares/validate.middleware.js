function validateMiddleWare(schema, segment = "body") {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[segment], {
      abortEarly: false,
      stripUnknown: true,
    })
    
    if(error) {
      console.log(error);
      const details = error.details.map(detail => detail.message)
      return res.status(400).send({success: false, details})
    }

    if(segment = "body") {
      req.body = value
    }
    next()
  }
}

export default validateMiddleWare