<template>
  <div id="content">
    <main>
        <ContainerWithTitle title="Inputs" color="#DDDDF0" width="74">
          <InputBox />
        </ContainerWithTitle>
        <ContainerWithTitle title="Results" color="#FFFFFF" width="24">
          <OutputBox />
        </ContainerWithTitle>
    </main>
    <div id="flash" :style="showIfError">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, computed } from 'vue'
import ContainerWithTitle from "./components/ContainerWithTitle.vue"
import InputBox from './components/InputBox.vue';
import OutputBox from './components/OutputBox.vue';
import { Status, useProrateStore } from "@/stores/prorate_store"

export default defineComponent({
  components: {
    ContainerWithTitle,
    InputBox,
    OutputBox
  },

  setup() {
    const store = useProrateStore()
    const message = computed((): string => store.flashMessage)
    const showIfError = computed((): string => {
      if (store.status == Status.ERROR) {
        return "visibility: visible;"
      }
      return "visibility: hidden;"
    })

    return {
      message,
      showIfError
    }
  }
})

</script>

<style>

#content {
  width: 100%;
  min-width: 300px;
  max-width: 900px;
}

main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

#flash {
  height: 40px;
  color: red;
  padding: 10px
}

@media only screen and (max-width: 650px) {
  main {
    flex-direction: column;
  }
}

</style>
