<template>
  <div>
    <slot :read="read">
      <button :disabled="disabled" aria-label="Read File" @click.stop="read">Read File</button>
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
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
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
  emits: {
    change: (_e: Event) => undefined,
  },
  setup(_, { emit }) {
    const change = (event: Event) => {
      emit('change', event)
    }

    return {
      change,
    }
  },
  methods: {
    read() {
      if (!this.disabled) (this.$refs.fileReader as HTMLElement).click()
    },
  },
})
</script>
