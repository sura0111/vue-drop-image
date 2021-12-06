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
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
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
    click() {
      if (!this.disabled) (this.$refs.fileReader as HTMLElement).click()
    },
  },
})
</script>
