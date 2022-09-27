<template>
    <input 
      type="text" 
      :placeholder="placeholder" 
      :value="modelValue" 
      @input="updateValue" 
      :style="addIcon" 
    />
</template>

<script lang="ts">

import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
        type: String,
        required: false,
        default: ""
    },
    placeholder: {
      type: String,
      required: false,
      default: ""
    },
    image: {
      type: String,
      required: false,
      default: 'angellist.ico'
    }
  },

  setup(props, ctx) {
    const placeholder = ref<string>(props.placeholder)

    function updateValue(e) {
        ctx.emit('update:modelValue', e.target.value)
    }

    const addIcon = computed((): string => `background-image: url('${props.image}');`)

    return {
        placeholder,
        updateValue,
        addIcon
    }
  }
})
</script>

<style scoped>

input {
    width: 30%;
    border: 1px solid black;
    border-radius: 1px;
    margin: 5px;
    background-position: 10px 10px; 
    background-repeat: no-repeat;
    padding: 12px 20px 12px 40px;
}

</style>