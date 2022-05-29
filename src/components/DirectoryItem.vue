<template>
  <div class="directory-item">
    <router-link v-bind:to="`/archives/${archive.ID}/${directoryName}`">
      <span class="material-icons">folder</span>
      {{label || (directoryName.includes("/") ? directoryName.substr(directoryName.lastIndexOf("/") + 1) : directoryName) }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ArchiveDTO } from 'src/services/types'

export default defineComponent({
  name: 'DirectoryItem',
  props: {
    archive: {
      type: Object as PropType<ArchiveDTO>,
      required: true
    },
    directoryName: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    }
  }
})
</script>

<style scoped>
div.directory-item {
  margin: 4px;
  position: relative;
}

div.directory-item > a {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.20);
  border-radius: 6px;

  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  text-decoration: none;
  font-size: 0.8125rem;
  color: rgba(0, 0, 0, 0.720);
  font-weight: bold;
}

div.directory-item > a > span {
  margin-right: 8px;
  font-size: 1rem;
}
</style>
