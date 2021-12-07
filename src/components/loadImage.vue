<template>
  <div id="app">
    <load-file :disabled="disabled" :accept="accept" :multiple="multiple" @change="change">
      <template #activator="{ on, attrs }">
        <slot
          name="activator"
          :on="on"
          :attrs="{ ...attrs, disabled: uploading || loading || disabled, loading: uploading || loading }"
          :disabled="uploading || loading || disabled"
          :loading="uploading || loading"
        >
          <button v-bind="attrs" :disabled="uploading || loading || disabled" v-on="on">Read Image</button>
        </slot>
      </template>
    </load-file>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import LoadFile from './loadFile.vue'
import { getImage, getImages } from 'html-load-image'

export default Vue.extend({
  name: 'LoadImage',
  components: {
    LoadFile,
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
  data: () => ({
    loading: false,
  }),
  methods: {
    async change(event: Event) {
      this.loading = true
      const input = this.multiple ? await getImages(event) : await getImage(event)
      this.$emit('input', input)
      this.$emit('change', event)
      this.loading = false
    },
  },
})
</script>
