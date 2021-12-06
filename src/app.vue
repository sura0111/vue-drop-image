<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-switch v-model="disabled" label="disabled" inset dense color="primary"></v-switch>
          </v-col>

          <v-col cols="12">
            <load-file :disabled="disabled" accept="image/*" @change="change">
              <template #activator="{ on, attrs }">
                <v-btn elevation="0" color="primary" v-bind="attrs" v-on="on">Read File</v-btn>
              </template>
            </load-file>
          </v-col>

          <v-col cols="12">
            <load-image :disabled="disabled" @change="change">
              <template #activator="{ on, attrs }">
                <v-btn elevation="0" color="primary" v-bind="attrs" v-on="on">Read Image</v-btn>
              </template>
            </load-image>
          </v-col>

          <v-col cols="12">
            <drop-file :disabled="disabled" @drop="change">
              <template #activator="{ dragging, attrs }">
                <v-card height="100px" :color="dragging ? 'grey lighten-2' : 'grey lighten-4'" elevation="0">
                  <v-row
                    class="fill-height text-caption text-uppercase"
                    justify="center"
                    align="center"
                    :class="{ 'grey--text': attrs.disabled }"
                  >
                    Drop Here
                  </v-row>
                </v-card>
              </template>
            </drop-file>
          </v-col>

          <v-col cols="12">
            <drop-image v-model="src" :disabled="disabled">
              <template #activator="{ dragging, attrs }">
                <v-card height="100px" :color="dragging ? 'grey lighten-2' : 'grey lighten-4'" elevation="0">
                  <v-row
                    class="fill-height text-caption text-uppercase"
                    justify="center"
                    align="center"
                    :class="{ 'grey--text': attrs.disabled }"
                  >
                    Drop Here
                  </v-row>
                </v-card>
              </template>
            </drop-image>
          </v-col>

          <v-col cols="12">
            <v-img v-if="src" :src="src" :aspect-ratio="1" contain></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import LoadFile from './components/loadFile.vue'
import { getImage } from 'html-load-image'
import LoadImage from './components/loadImage.vue'
import DropFile from './components/dropFile.vue'
import DropImage from './components/dropImage.vue'

export default defineComponent({
  name: 'App',
  components: {
    LoadFile,
    LoadImage,
    DropFile,
    DropImage,
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
<style lang="scss"></style>
