import type { ProrateRequest, ProrateResponse } from "@/types/prorate_types"

export class ProrateService {
    public ApiUrl = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/prorate`

    // post request object to backend prorate calculator
    public async post(
        data: ProrateRequest
    ): Promise<ProrateResponse> {
        console.log(this.ApiUrl)
        const req = new Request(this.ApiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await fetch(req)
                    .then(res => {
                        // if bad status, throw error
                        if (!res.ok) {
                            throw Error(res.statusText);
                        }
                        return res.json()})
                    .catch(e => {
                        // log the error and return undefined to signal error
                        console.log(e)
                        return undefined
                    })
        return res
    }
}