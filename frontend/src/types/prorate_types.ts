export interface InvestorInformation {
    name: string
    requested: number
    average: number
}

export interface ProrateRequest {
    allocation: number
    investorRequests: InvestorInformation[]
}

export interface InvestorShare {
    name: string
    share: number
}

export interface ProrateResponse {
    calculatedShares: InvestorShare[]
}