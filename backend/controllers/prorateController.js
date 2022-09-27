const { prorateCalculator, validateRequest } = require('../services/prorateService')

const prorate = async (req, res) => {
    // validate
    const validation = validateRequest(req.body)
    if (validation.valid) {
        // if formatted correctly, proceed with calculation
        const shares = prorateCalculator(req.body)
        res.send({calculatedShares: shares})
    } else {
        // log error
        console.log(req.body, validation)
        // return error with message
        res.statusCode = 400
        res.send(validation.message)
    }
}

module.exports = {
    prorate
}