<template>
    <div>
        <ul>
            <li v-for="investor in investorsOut" :key="investor">
                {{ investor.name }} - ${{ displayShare(investor.share) }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

import { useProrateStore } from "@/stores/prorate_store"
import { defineComponent, computed } from "vue"
import type { InvestorShare } from "@/types/prorate_types"

export default defineComponent({
    setup() {
        const store = useProrateStore()
        const investorsOut = computed((): InvestorShare[] => store.investorShares)

        // give the numbers commas
        function displayShare(share: number): string {
            const a = share.toString().split('.')
            const n = a[0].length
            if (n > 3) {
                const c = n % 3 == 0 ? 3 : n % 3
                let s = a[0].slice(0, c)
                for (let i = 0; i < (n - c) / 3; i++) {
                    s += ','
                    s += a[0].slice(c + 3*i, c + 3 * (i+1))
                }
                a[0] = s
            }
            return a.join('.')
        }

        return {
            investorsOut,
            displayShare
        }
    }
})

</script>

<style scoped>

div {
    margin: 5px;
    overflow-x: auto;
}

li {
    margin: 10px 0 10px 5px;
}

</style>