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
import Vue, { PropType } from 'vue'
import { getImage, getImages } from 'html-load-image'
import DropFile from './dropFile.vue'

export default Vue.extend({
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
  data: () => ({
    loading: false,
  }),
  methods: {
    async change(event: DragEvent) {
      this.loading = true
      const input = this.multiple ? await getImages(event) : await getImage(event)
      this.$emit('input', input)
      this.$emit('change', event)
      this.loading = false
    },
  },
})
</script>
