<template>
  <div id="app">
    <drop-file :disabled="disabled" @drop="change">
      <template #activator="{ attrs, dragging }">
        <slot
          name="activator"
          :attrs="{ ...attrs, disabled: uploading || loading || disabled, loading: uploading || loading }"
          :dragging="dragging"
          :disabled="uploading || loading || disabled"
          :loading="uploading || loading"
        >
          DROP HERE
        </slot>
      </template>
    </drop-file>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/composition-api'
import { getImage, getImages } from 'html-load-image'
import DropFile from './dropFile.vue'

export default defineComponent({
  name: 'DropImage',
  components: {
    DropFile,
  },
  props: {
    value: {
      type: [String, Array] as PropType<string | string[]>,
      default: null,
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

    const change = async (event: DragEvent) => {
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
