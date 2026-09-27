function validateMiddleWare(schema, segment = "body") {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[segment], {
      abortEarly: false,
      stripUnknown: true,
    })
    
    if(error) {
      const details = error.details.map(detail => detail.message)
      return res.status(400).send({success: false, details})
    }

    req[segment] = value
    next()
  }
}

export default validateMiddleWare