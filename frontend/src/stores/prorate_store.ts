import { defineStore } from 'pinia'
import type { ProrateRequest } from '@/types/prorate_types'
import { ProrateService } from '@/services/prorate_service'

export enum Status {
  NORMAL = 'NORMAL',
  PROCESSING = 'PROCESSING',
  ERROR = 'ERROR'
}

export const useProrateStore = defineStore('prorate', {
  state: () => {
    return { 
      investorShares:  [],
      status: Status.NORMAL,
      flashMessage: ""
    }
  },
  actions: {
    prorate(allocation: string, investorRequests: {string: string}[]) {
      this.status = Status.PROCESSING

      // validate allocation
      // assumes 0 is left blank
      const x = Number(allocation)
      if (isNaN(x) || x < 0) {
        // exit with flash message if allocation not a number or negative
        this.flashMessage = "Allocation amount must be a nonnegative number."
        this.status = Status.ERROR
        this.investorShares = []
        return
      }

      // initialize request for backend
      const request: ProrateRequest = {
        allocation: Number(allocation),
        investorRequests: []
      }

      for (let i = 0; i < investorRequests.length; i++) {
        // ignore if whole row is empty
        if (investorRequests[i].name == "" 
            && investorRequests[i].requested == "" 
            && investorRequests[i].average == "") {
          continue
        }
        // validate requested and average amounts
        // assumes 0 is left blank
        let requested = Number(investorRequests[i].requested)
        let average = Number(investorRequests[i].average)
        if (isNaN(requested) || isNaN(average) || requested < 0 || average < 0) {
          // exit with flash message if allocation not a number or negative
          this.flashMessage = "All requested and average amounts must be a nonnegative numbers."
          this.status = Status.ERROR
          this.investorShares = []
          return
        }
        // if valid add to list in request
        request.investorRequests.push({
          name: investorRequests[i].name,
          requested: requested,
          average: average
        })
      }

      // send request to backend
      const ps = new ProrateService()
      ps.post(request)
      .then((res) => {
        // throw error if no response
        if (res == undefined) {
          throw Error("")
        }
        // set results list and go back to normal
        this.investorShares = res.calculatedShares
        this.status = Status.NORMAL
      })
      .catch(() => {
        // flash error at user
        this.flashMessage = "Error processing the request."
        this.status = Status.ERROR
        this.investorShares = []
      })
    },
  },
})