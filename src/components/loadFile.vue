<template>
  <div>
    <slot name="activator" :on="{ click }" :attrs="{ disabled }" :disabled="disabled">
      <button :disabled="disabled" aria-label="Read File" @click.stop="click">Read File</button>
    </slot>
    <input
      ref="fileReader"
      :disabled="disabled"
      type="file"
      style="display: none"
      :accept="accept"
      :multiple="multiple"
      @change="change"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoadFile',
  props: {
    accept: {
      type: String,
      default: '*',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    click() {
      if (!this.disabled) (this.$refs.fileReader as HTMLElement).click()
    },
    change(event: Event) {
      this.$emit('change', event)
    },
  },
})
</script>
