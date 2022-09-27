<template>
    <div class="investorInputContainer">
        <TextInput 
            placeholder="Name" 
            v-model="modelValue['name']" 
            @input="updateValue" 
            image="name-badge.png" 
        />
        <TextInput 
            placeholder="Requested Amount" 
            v-model="modelValue['requested']" 
            @input="updateValue" 
            image="dollar-sign.png" 
        />
        <TextInput 
            placeholder="Average Amount" 
            v-model="modelValue['average']" 
            @input="updateValue" 
            image="dollar-sign.png" 
        />
    </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'
import TextInput from './TextInput.vue'

export default defineComponent({
    props: {
    modelValue: {
        required: false,
        default: {name: "", requested: "", average: ""}
    }
    },
    setup(props, ctx) {
    function updateValue() {
        ctx.emit('update:modelValue', props.modelValue)
    }
    return {
        updateValue
    }
    },
    components: { TextInput }
})

</script>

<style scoped>

div {
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin: 5px;
}

</style>