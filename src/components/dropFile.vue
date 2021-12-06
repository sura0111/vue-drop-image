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
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'DropFile',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    doubleClick: () => undefined,
    dragEnter: () => undefined,
    dragLeave: () => undefined,
    drop: (_event: DragEvent) => undefined,
  },
  setup(props, { emit }) {
    const dragging = ref(false)

    const dblclick = () => {
      emit('doubleClick')
    }

    const dragEnter = () => {
      if (!props.disabled) {
        dragging.value = true
        emit('dragEnter')
      }
    }

    const dragLeave = () => {
      if (!props.disabled) {
        dragging.value = false
        emit('dragLeave')
      }
    }

    const drop = (event: DragEvent) => {
      if (!props.disabled) {
        dragging.value = false
        emit('drop', event)
      }
    }

    return {
      dragging,
      dblclick,
      dragEnter,
      dragLeave,
      drop,
    }
  },
})
</script>
