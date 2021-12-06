<template>
  <div id="app">
    <input v-model="disabled" type="checkbox" />
    <load-file :disabled="disabled" accept="image/*" @change="change"></load-file>
    <load-image :disabled="disabled" @change="change"></load-image>

    <img v-if="src" :src="src" width="500px" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import loadFile from './components/loadFile.vue'
import { getImage } from 'html-load-image'
import loadImage from './components/loadImage.vue'

export default defineComponent({
  name: 'App',
  components: {
    loadFile,
    loadImage,
  },
  setup() {
    const disabled = ref(false)
    const src = ref<string | null>(null)

    const change = async (event: Event) => {
      src.value = await getImage(event)
    }

    return {
      disabled,
      src,
      change,
    }
  },
})
</script>
