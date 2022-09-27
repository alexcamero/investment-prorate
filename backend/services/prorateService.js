function prorateCalculator(req) {
    let allocation = req.allocation
    // initialize shares everyone will get at 0
    let investorRequests = req.investorRequests.map(r => {
        r.share = 0
        return r
    })

    // Case 1: everything is great if sum of requested investments doesn't exceed allocation
    const sumOfRequests = investorRequests.reduce((sum, r) => sum + r.requested, 0)
    if (allocation >= sumOfRequests) {
        return investorRequests.map(r => {
            return {name: r.name, share: r.requested}
        })
    }

    // Case 2: over-requested
    
    // replace zero averages with default value
    const allAverages = investorRequests.map(r => r.average)
    investorRequests.forEach((r, i) => {
        r.average = 
            r.average == 0 
                ? defaultValueIfNoAverage(r.requested, allAverages)
                : r.average
        investorRequests[i] = r
    })
    // calculate prorated amounts
    while (allocation > 0) {
        // total represents amount of remaining allocation divided up each time
        let total = 0
        // get number of investors remaining with nonzero requests and the sum of their averages
        let numInvestors = investorRequests.filter(r => r.requested > 0).length
        let sumOfAverages = investorRequests
                        .filter(r => r.requested > 0)
                        .reduce((sum, r) => sum + r.average, 0)
        investorRequests = investorRequests.map(r => {
            // handle case where averages sum to zero by giving equal shares
            if (r.requested > 0) {
                const proratedShare =
                    sumOfAverages == 0
                        ? (1 / numInvestors) * allocation
                        : (r.average / sumOfAverages) * allocation
                // give investor minimum of requested and prorated amounts
                const share =
                    proratedShare > r.requested
                        ? r.requested
                        : proratedShare
                // adjust values by share amount
                r.share += share
                r.requested -= share
                total += share
            }
            return r
        })
        // reduce allocation by amount given out this time
        allocation -= total
    }

    return investorRequests.map(r => {
        return {
            name: r.name,
            share: r.share
        }
    })

}

// If this is an investors first time trying to invest, they won't have a meaningful average (unless zero investment on all fundraisers an investor didn't participate in is incorporated into every average). So in this case I think the obvious options are 
// 1. to stick with 0 (and therefore exclude them from this opportunity if the requested amounts exceed the allocation) or perhaps default to some other nonzero constant value,
// 2. to assume their requested amount is their average, or
// 3. to assume that a new investor has an average investment equal to the average of all the averages.
// I'm going to assume it should be 0 for now, but left it as a function in case different logic should be used.
function defaultValueIfNoAverage(requested, allAverages) {
    return 0
}

// Validation to run before prorate calculator
function validateRequest(req) {
    if (req.allocation == undefined 
        || req.investorRequests == undefined) {
        return {
            valid: false,
            message: "request requires fields allocation and investorRequests"
        }
    }
    if (isNaN(req.allocation) || req.allocation < 0) {
        return {
            valid: false,
            message: "allocation must be a nonnegative number"
        }
    }
    if (!Array.isArray(req.investorRequests)) {
        return {
            valid: false,
            message: "investorRequests must have an array as a value"
        }
    }
    for (let i = 0; i < req.investorRequests.length; i++) {
        if (req.investorRequests[i].name == undefined 
            || req.investorRequests[i].requested == undefined 
            || req.investorRequests[i].average == undefined) {
            return {
                valid: false,
                message: "each item of investorRequests must be an object with name, requested, and average fields"
            }
        }
        if (isNaN(req.investorRequests[i].requested) 
            || req.investorRequests[i].requested < 0 
            || isNaN(req.investorRequests[i].average) 
            || req.investorRequests[i].average < 0) {
            return {
                valid: false,
                message: "each investor request must have a nonnegative number for the requested and average fields"
            }
        }
    }

    return {
        valid: true
    }
}

module.exports = {
    prorateCalculator,
    validateRequest
}