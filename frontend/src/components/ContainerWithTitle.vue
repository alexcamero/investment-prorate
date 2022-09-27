<template>
    <div class="containerWithTitle" :style="cssOuter">
        <h2>{{ title }}</h2>
        <div class="innerDiv" :style="cssInner">
            <slot />
        </div>
    </div>
</template>


<script lang="ts">

import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: false,
      default: ""
    },
    width: {
      type: String,
      required: false,
      default: "40"
    },
    color: {
      type: String,
      required: false,
      default: "white"
    }
  },

  setup(props) {
    const title = ref<string>(props.title)
    const cssOuter = computed(() => `width: ${props.width}%;`)
    const cssInner = computed(() => `background-color: ${props.color};`)

    return {
        title,
        cssOuter,
        cssInner
    }
  }
})

</script>

<style>
.containerWithTitle {
    display: flex;
    flex-direction: column;
}

.innerDiv {
    border: 1px solid black;
    height: 100%;
    min-height: 300px;
    margin: 5px;
    border-radius: 5px;
}

h2 {
    font-size: large !important;
    font-weight: bolder !important;
}

@media only screen and (max-width: 650px) {
  .containerWithTitle {
    width: 100% !important;
  }
}
</style>