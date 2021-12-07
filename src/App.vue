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
            <v-card>
              <v-card-title>Load Multiple Image</v-card-title>
              <v-card-actions>
                <load-image v-model="images" :disabled="disabled" multiple @change="change">
                  <template #activator="{ on, attrs }">
                    <v-btn elevation="0" color="primary" v-bind="attrs" v-on="on">Read Images</v-btn>
                  </template>
                </load-image>
              </v-card-actions>
              <v-card-text>
                <v-row dense>
                  <v-col v-for="(image, id) in images" :key="id">
                    <v-img width="100px" aspect-ratio="1" :src="image"></v-img>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card>
              <v-card-title>Drop File</v-card-title>
              <v-card-text>
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
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card>
              <v-card-title>Drop Image</v-card-title>
              <v-card-text>
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
              </v-card-text>
            </v-card>
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
import Vue from 'vue'
import LoadFile from './components/loadFile.vue'
import { getImage } from 'html-load-image'
import LoadImage from './components/loadImage.vue'
import DropFile from './components/dropFile.vue'
import DropImage from './components/dropImage.vue'

export default Vue.extend({
  name: 'App',
  components: {
    LoadFile,
    LoadImage,
    DropFile,
    DropImage,
  },
  data: () => ({
    disabled: false,
    src: null as string | null,
    images: [] as string[],
  }),
  methods: {
    async change(event: Event) {
      this.src = await getImage(event)
    },
  },
})
</script>
<style lang="scss"></style>
