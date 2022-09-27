<template>
    <div>
        <div>
            <h3>Total Available Allocation</h3>
            <div>
                <TextInput 
                    placeholder="Allocation" 
                    v-model="allocation" 
                    image="dollar-sign.png" 
                />
            </div>
        </div>
        <div>
            <h3>Investor Breakdown</h3>
            <InvestorInput 
                v-for="(v, i) in investorsIn" 
                :key="v" 
                v-model="investorsIn[i]" 
            />
        </div>
        <div id="buttons">
            <button @click="prorate">Prorate</button>
            <button @click="addRow">Add Investor</button>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref } from "vue"
import InvestorInput from "./InvestorInput.vue"
import TextInput from "./TextInput.vue"
import { useProrateStore } from "@/stores/prorate_store"

export default defineComponent({

    setup() {
        const store = useProrateStore()
        const investorsIn = ref<any[]>([
            {name: "", requested: "", average: ""}, 
            {name: "", requested: "", average: ""}, 
            {name: "", requested: "", average: ""}
        ])
        const allocation = ref<string>("")

        function prorate() {
            store.prorate(allocation.value, investorsIn.value)
        }

        function addRow() {
            investorsIn.value.push({name: "", requested: "", average: ""})
        }


        return {
            investorsIn,
            allocation,
            prorate,
            addRow
        }
    },

    components: {
        InvestorInput,
        TextInput
    }
})

</script>

<style scoped>

div {
    margin: 5px;
}

#buttons {
    align-self: flex-end;
}

button {
    margin: 5px;
    background-color: #999;
    border: 1px solid black;
    border-radius: 5px;
    padding: 7px;
}

</style>