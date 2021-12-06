<template>
  <div id="app">
    <load-file :disabled="disabled" :accept="accept" :multiple="multiple" @change="change">
      <template #default="{ read }">
        <slot :loading="uploading || loading" :read="read">
          <button :disabled="uploading || loading || disabled" @click.stop="read">Read Image</button>
        </slot>
      </template>
    </load-file>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/composition-api'
import loadFile from './loadFile.vue'
import { getImage, getImages } from 'html-load-image'

export default defineComponent({
  name: 'LoadImage',
  components: {
    loadFile,
  },
  props: {
    value: {
      type: [String, Array] as PropType<string | string[]>,
      default: null,
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    uploading: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    input: (_v: string | string[]) => undefined,
    change: (_e: Event) => undefined,
  },
  setup(props, { emit }) {
    const loading = ref(false)

    const change = async (event: Event) => {
      loading.value = true
      const input = props.multiple ? await getImages(event) : await getImage(event)
      emit('input', input)
      emit('change', event)
      loading.value = false
    }

    return {
      loading,
      change,
    }
  },
})
</script>
