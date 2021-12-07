<template>
  <div
    :draggable="!disabled"
    @dragover.prevent
    @dragenter.stop.prevent="dragEnter"
    @dragleave.stop.prevent="dragLeave"
    @drop.stop.prevent="drop"
    @dblclick="dblclick"
  >
    <slot name="activator" :attrs="{ dragging, disabled }" :dragging="dragging" :disabled="disabled">DROP HERE</slot>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'DropFile',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    dragging: false,
  }),
  methods: {
    dblclick() {
      this.$emit('doubleClick')
    },
    dragEnter() {
      if (!this.disabled) {
        this.dragging = true
        this.$emit('dragEnter')
      }
    },
    dragLeave() {
      if (!this.disabled) {
        this.dragging = false
        this.$emit('dragLeave')
      }
    },
    drop(event: DragEvent) {
      if (!this.disabled) {
        this.dragging = false
        this.$emit('drop', event)
      }
    },
  },
})
</script>
